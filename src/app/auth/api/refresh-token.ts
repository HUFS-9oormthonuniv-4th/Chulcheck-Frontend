// import {
//   TokenRefreshRequest,
//   TokenRefreshResponse,
//   AuthError,
// } from '@/app/auth/_lib/types/api';
// import { getApiBaseUrl } from '@/lib/config/api';

// const TIMEOUT_DURATION = 10000;

// export async function refreshTokenApi(
//   refreshToken: string
// ): Promise<TokenRefreshResponse> {
//   const apiUrl = getApiBaseUrl();
//   const fullUrl = `${apiUrl}/api/auth/refresh`;

//   const controller = new AbortController();
//   const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_DURATION);

//   try {
//     const response = await fetch(fullUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//         Authorization: `Bearer ${refreshToken}`,
//       },
//       body: JSON.stringify({ refreshToken }),
//       signal: controller.signal,
//     });

//     clearTimeout(timeoutId);

//     if (!response.ok) {
//       const errorText = await response.text();
//       let errorData;
//       try {
//         errorData = JSON.parse(errorText);
//       } catch {
//         errorData = {
//           message: `HTTP ${response.status}: ${response.statusText}`,
//         };
//       }

//       // 토큰 만료나 무효한 리프레시 토큰인 경우
//       if (response.status === 401 || response.status === 403) {
//         throw new Error(AuthError.REFRESH_TOKEN_INVALID);
//       }

//       throw new Error(errorData.message || '토큰 갱신 실패');
//     }

//     const responseData = await response.json();

//     return responseData as TokenRefreshResponse;
//   } catch (error) {
//     clearTimeout(timeoutId);

//     if (error instanceof Error) {
//       if (error.name === 'AbortError') {
//         throw new Error('토큰 갱신 요청이 시간 초과되었습니다.');
//       }
//       throw error;
//     }

//     throw new Error('토큰 갱신 중 네트워크 오류가 발생했습니다.');
//   }
// }
