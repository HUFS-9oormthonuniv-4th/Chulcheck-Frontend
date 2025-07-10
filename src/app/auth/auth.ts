import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { LoginRequestSchema } from "@/app/auth/_lib";
import { loginApi } from "@/app/auth/api/login";

import type { DefaultSession } from "next-auth";
import type { JWT } from "next-auth/jwt";

if (!process.env.AUTH_SECRET) {
  throw new Error("AUTH_SECRET is required");
}

const SESSION_MAX_AGE = 60 * 60 * 8; // 8시간
const SESSION_UPDATE_AGE = 30 * 60; // 30분
const PROVIDER_NAME = "credentials";

declare module "next-auth" {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: string;
    accessToken: string;
    refreshToken?: string;
    tokenExpiry?: number;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    } & DefaultSession["user"];
    accessToken: string;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    accessToken?: string;
    refreshToken?: string;
    tokenExpiry?: number;
    error?: string;
  }
}

export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update,
} = NextAuth({
  providers: [
    Credentials({
      credentials: {
        userId: { type: "text" },
        password: { type: "password" },
      },

      async authorize(credentials) {
        try {
          const validatedCredentials = LoginRequestSchema.parse(credentials);
          const user = await loginApi(validatedCredentials);

          console.log("user", user);

          // 필수 필드 검증
          if (!user.userId || !user.nickname || !user.role || !user.token) {
            console.error("Invalid user data from API:", {
              userId: !!user.userId,
              nickname: !!user.nickname,
              role: !!user.role,
              hasToken: !!user.token,
            });
            return null;
          }

          return {
            id: user.userId,
            name: user.nickname,
            email: user.userId,
            role: user.role,
            accessToken: user.token,
            refreshToken: user.refreshToken,
            tokenExpiry:
              user.tokenExpiry ?? Date.now() / 1000 + SESSION_MAX_AGE,
          };
        } catch (error) {
          if (error instanceof Error) {
            console.error("Authentication failed:", error.message);
            if (error.message.includes("유효한 이메일")) {
              console.error("Invalid email format");
            }
          } else {
            console.error("Authentication failed:", String(error));
          }
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: SESSION_MAX_AGE,
    updateAge: SESSION_UPDATE_AGE,
  },

  callbacks: {
    jwt({ token, user }) {
      // 최초 로그인 시 user 객체를 JWT token에 저장
      if (user) {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          tokenExpiry: user.tokenExpiry,
        };
      }
      return token;
    },

    session({ session, token }) {
      // JWT 토큰의 정보를 세션에 전달
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.role = token.role as string;
      session.accessToken = token.accessToken as string;

      if (token.error) {
        session.error = token.error;
      }

      return session;
    },

    signIn({ user, account }) {
      // Credentials 제공자에서만 추가 검증
      if (account?.provider === PROVIDER_NAME) {
        const hasRequiredFields = !!(user?.id && user?.email && user?.role);
        if (!hasRequiredFields) {
          console.error("필수 사용자 정보가 누락되었습니다:", {
            id: !!user?.id,
            email: !!user?.email,
            role: !!user?.role,
          });
        }
        return hasRequiredFields;
      }
      return true;
    },

    redirect: ({ url, baseUrl }) => {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (url) {
        const { search, origin } = new URL(url);
        const callbackUrl = new URLSearchParams(search).get("callbackUrl");
        if (callbackUrl)
          return callbackUrl.startsWith("/")
            ? `${baseUrl}${callbackUrl}`
            : callbackUrl;
        if (origin === baseUrl) return url;
      }
      return baseUrl;
    },
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  cookies: {
    sessionToken: {
      name: "Authorization",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
});
