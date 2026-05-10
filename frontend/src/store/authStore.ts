import { create } from "zustand";

// store가 가질 상태(state)와 액션(action)의 타입을 정의
// 상태: token, isAuthenticated
// 액션: login, logout (상태를 변경하는 함수)
interface AuthState {
        token: string | null;        // JWT 토큰. 로그인 전에는 null
        isAuthenticated: boolean;    // 로그인 여부. 컴포넌트에서 인증 확인 시 사용
        login: (token: string) => void;
        logout: () => void;
}

// create<AuthState>()((set) => ...) — ()가 두 번 오는 이유:
// TypeScript에서 제네릭 타입을 올바르게 추론하기 위한 Zustand v4의 커링(currying) 문법
// set: 상태를 변경하는 함수. set({ 바꿀 필드 }) 형태로 사용하면 해당 필드만 덮어씀
const useAuthStore = create<AuthState>()((set) => ({
        // 초기값: 앱 시작 시 로그인되지 않은 상태
        token: null,
        isAuthenticated: false,

        // 로그인 성공 시 호출 — 백엔드에서 받은 JWT 토큰을 저장
        // { token }은 { token: token }의 단축 표현 (ES6 shorthand property)
        login: (token) => set({ token, isAuthenticated: true }),

        // 로그아웃 시 호출 — 토큰 제거 및 인증 상태 초기화
        logout: () => set({ token: null, isAuthenticated: false }),
}));

// useAuthStore는 React 훅으로 사용됨
// 컴포넌트에서: const { token, login, logout } = useAuthStore();
export default useAuthStore;