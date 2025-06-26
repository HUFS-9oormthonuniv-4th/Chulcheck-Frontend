import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { LoginRequestSchema } from "@/app/auth/_lib";
import { loginApi } from "@/app/auth/api/login";

// TODO: refresh API 구현 후 활성화
// import { refreshTokenApi } from './api/refresh-token';

import type { DefaultSession } from "next-auth";
import type { JWT } from "next-auth/jwt";

if (!process.env.AUTH_SECRET) {
  throw new Error("AUTH_SECRET is required");
}

const SESSION_MAX_AGE = 60 * 60 * 8;
const SESSION_UPDATE_AGE = 30 * 60;
const PROVIDER_NAME = "credentials";
// TODO: refresh API 구현 후 활성화
// const TOKEN_REFRESH_THRESHOLD = 2 * 60 * 60;

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

// TODO: refresh API 구현 후 활성화
// 토큰 갱신 함수
/*
async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    if (!token.refreshToken) {
      throw new Error('No refresh token available');
    }
    const refreshedTokens = await refreshTokenApi(token.refreshToken);

    return {
      ...token,
      accessToken: refreshedTokens.token,
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken,
      tokenExpiry:
        refreshedTokens.tokenExpiry ?? Date.now() / 1000 + SESSION_MAX_AGE,
      error: undefined,
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
*/

export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update,
} = NextAuth({
  debug: process.env.NODE_ENV === "development",

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userId: { label: "이메일", type: "email" },
        password: { label: "비밀번호", type: "password" },
      },

      async authorize(credentials) {
        // 입력값 검증 강화 - Zod 사용
        try {
          const validatedCredentials = LoginRequestSchema.parse(credentials);

          const user = await loginApi(validatedCredentials);

          // 필수 필드 검증 강화
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
          // Zod 검증 에러나 API 에러 처리
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
    // JWT 콜백 - 토큰 갱신 로직 비활성화
    jwt({ token, user, trigger }) {
      // 새 로그인 시에만 user 정보 업데이트
      if (user && (trigger === "signIn" || trigger === "signUp")) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.tokenExpiry = user.tokenExpiry;
        token.error = undefined;
      }

      // TODO: refresh API 구현 후 활성화
      /*
      // 토큰 만료 체크 및 갱신
      if (token.tokenExpiry && token.refreshToken) {
        const nowTimestamp = Math.floor(Date.now() / 1000);
        const shouldRefreshTime = token.tokenExpiry - TOKEN_REFRESH_THRESHOLD;

        // 토큰이 곧 만료되거나 이미 만료된 경우 갱신 시도
        if (nowTimestamp >= shouldRefreshTime) {
          console.log(
            '🕒 토큰 갱신 필요 - 현재:',
            nowTimestamp,
            '만료:',
            token.tokenExpiry
          );
          return await refreshAccessToken(token);
        }
      }
      */

      return token;
    },

    // 세션 콜백 - 타입 안전성 개선 및 에러 처리
    session({ session, token }) {
      // 토큰 갱신 에러가 있는 경우 세션에 포함
      if (token.error) {
        session.error = token.error;
      }

      // 모든 필수 필드가 있는지 확인 후 할당
      if (
        token.id &&
        token.name &&
        token.email &&
        token.role &&
        token.accessToken &&
        !token.error
      ) {
        session.user = {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          role: token.role,
        };
        session.accessToken = token.accessToken;
      }

      return session;
    },

    // signIn 콜백 - 검증 강화
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
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  // 보안 설정 강화
  cookies: {
    sessionToken: {
      name: `authjs.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax" as const,
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
});
