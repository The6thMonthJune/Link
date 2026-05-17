import React from 'react';
import SeeMoreBtn from '../components/home/SeeMoreBtn';
import { useNavigate } from 'react-router-dom';
import HamburgerMenuBtn from '../components/home/HamburgerMenuBtn';
import BottomNav from '../components/nav/BottomNav';
import Calendar from '../components/home/Calendar';
import EmptyTripView from '../components/home/EmptyTripView';
import { useState } from 'react';

function HomePage() {

    const [isExpanded, setIsExpanded] = useState(false);
    const [isCreateTripOpen, setIsCreateTripOpen] = useState(false);


    return (
    <div className='w-full px-1 py-2'>
        <div className='flex flex-row justify-between items-center'>
            <div> <HamburgerMenuBtn /> </div>
            <div className='flex flex-col items-center gap-[1px] select-none'>
                <p className='font-normal text-[12px]'>12월</p>
                <p className='font-normal text-[16px]'>오늘</p>
            </div>
            <div> <SeeMoreBtn /> </div>
        </div>
        <div>
            <Calendar
                onclickDate={(date) => console.log(date)}
                isExpanded={isExpanded}
                onExpandChange={setIsExpanded}
            />
            <EmptyTripView isExpanded={isExpanded} />
        </div>
        <div>
            <BottomNav onCreateTrip={() => setIsCreateTripOpen(true)} />
        </div>
    </div>
    );
}

export default HomePage;