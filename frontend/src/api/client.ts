import axios from "axios";
import useAuthStore from "../store/authStore";
// authStore에서 토큰을 읽어와야 하므로 import

// 1. axios 인스턴스 생성
const client = axios.create({
    baseURL: "http://localhost:8080",
    headers: { "Content-Type": "application/json" }, // JSON 형식으로 요청
});

// 2. 요청 interceptor - 모든 요청이 나가기 전에 실행됨
client.interceptors.request.use((config) => {
    // authStore에서 토큰을 읽어옴
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`; // Authorization 헤더에 토큰 추가
    }
    return config; // 수정된 config 반환
}, (error) => {
    return Promise.reject(error); // 요청 에러는 그대로 전달
});

// 3. 응답 interceptor - 모든 응답이 도착했을 때 실행됨
client.interceptors.response.use((response) => {
    return response; // 정상 응답은 그대로 반환
}, (error) => {
    if (error.response && error.response.status === 401) {
        // 401 Unauthorized 에러 처리 - 예: 로그인 페이지로 리다이렉트
        window.location.href = "/login"; // 로그인 페이지로 이동
    }
    return Promise.reject(error); // 에러는 그대로 전달
});

export default client; // 생성한 axios 인스턴스를 내보냄