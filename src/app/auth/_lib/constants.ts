// Auth 관련 공통 상수들
export const PASSWORD_MIN_LENGTH = 8;
export const STUDENT_ID_MAX_LENGTH = 9;

// API spec에 맞는 userId 검증 규칙
export const USER_ID_MIN_LENGTH = 4;
export const USER_ID_MAX_LENGTH = 20;
export const USER_ID_REGEX = /^[a-zA-Z0-9]+$/;

// API spec에 맞는 비밀번호 정규식
export const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/;

// 폼 검증용 비밀번호 정규식 (특수문자 범위가 더 넓음)
export const FORM_PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/;

// 에러 메시지
export const ERROR_MESSAGES = {
  REQUIRED_EMAIL: "이메일을 입력해주세요.",
  INVALID_EMAIL: "유효한 이메일 주소를 입력해주세요.",
  REQUIRED_USER_ID: "아이디를 입력해주세요.",
  USER_ID_LENGTH: `아이디는 ${USER_ID_MIN_LENGTH}-${USER_ID_MAX_LENGTH}자 사이여야 합니다.`,
  USER_ID_PATTERN: "아이디는 영문과 숫자만 사용할 수 있습니다.",
  REQUIRED_PASSWORD: "비밀번호를 입력해주세요.",
  PASSWORD_TOO_SHORT: `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`,
  PASSWORD_PATTERN: "비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.",
  PASSWORD_MISMATCH: "비밀번호가 일치하지 않습니다.",
  REQUIRED_NAME: "이름을 입력해주세요.",
  REQUIRED_SCHOOL: "학교를 입력해주세요.",
  REQUIRED_DEPARTMENT: "학과를 입력해주세요.",
  REQUIRED_STUDENT_ID: "학번을 입력해주세요.",
  STUDENT_ID_LENGTH: `학번은 ${STUDENT_ID_MAX_LENGTH}자를 맞춰서 작성해주세요.`,
} as const;
