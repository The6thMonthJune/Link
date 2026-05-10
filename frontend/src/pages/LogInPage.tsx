import React, { useEffect, useState } from 'react';
import logoText from '../assets/logo-text.png';
import logo from '../assets/logo.png';
import Google from '../assets/google.png';

function LogInPage() {
    const handleGoogleLogin = () => {
        // 백엔드 OAuth 엔드포인트로 리디렉션
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    }

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1000); // 1초 후에 버튼이 나타나도록 설정

        return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
    }, []);

    return (
    <div className='max-w-[393px] mx-auto min-h-screen bg-secondary flex flex-col items-center'>
        <div className='flex-1 flex flex-col items-center justify-center gap-4'>
            <img src={logo} alt="Logo" />
            <img src={logoText} alt="Logo Text" />
        </div>
        <div className={`pb-10 w-full px-6 flex justify-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <button onClick={handleGoogleLogin} className='w-[353px] bg-white text-text font-regular py-3 px-6 rounded-lg mt-10 hover:bg-gray-200 transition-colors duration-300'>
                <img src={Google} alt="Google" className='max-w-[36px] max-h-[37px] inline-block mr-2' />
                Google로 계속하기
            </button>
        </div>
        </div>
    );
}

export default LogInPage;