import React from 'react';
import logoText from '../assets/logo-text.png';
import logo from '../assets/logo.png';


function SplashPage() {
    return (
        <div className='max-w-[393px] mx-auto min-h-screen bg-secondary relative'>
            <div className='absolute top-[280px] left-0 right-0 flex flex-col items-center gap-4'>
                <img src={logo} alt="Logo" />
                <img src={logoText} alt="Logo Text" />
            </div>
        </div>


    );
}

export default SplashPage;