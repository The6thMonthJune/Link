import React from 'react';
import SeeMoreBtn from '../components/home/SeeMoreBtn';
import { useNavigate } from 'react-router-dom';
import HamburgerMenuBtn from '../components/home/HamburgerMenuBtn';
import BottomNav from '../components/nav/BottomNav';

function HomePage() {
    return (
    <div className='w-full px-1 py-2'>
        <div className='flex flex-row justify-between items-center'>
            <div> <HamburgerMenuBtn /> </div>
            <div className='flex flex-col items-center gap-1'>
                <h3 className='text-sm font-light'>12월</h3>
                <h1 className='text-xl font-bold'>오늘</h1>
            </div>
            <div> <SeeMoreBtn /> </div>
        </div>
        <div>캘린더</div>
        <div></div>
    </div>
    );
}

export default HomePage;