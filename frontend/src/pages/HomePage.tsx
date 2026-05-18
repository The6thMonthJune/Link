import React from 'react';
import SeeMoreBtn from '../components/home/SeeMoreBtn';
import { useNavigate } from 'react-router-dom';
import HamburgerMenuBtn from '../components/home/HamburgerMenuBtn';
import BottomNav from '../components/nav/BottomNav';
import Calendar from '../components/home/Calendar';
import EmptyTripView from '../components/home/EmptyTripView';
import { useState } from 'react';
import TripCreateModal from '../components/trip/TripCreateModal';

function HomePage() {

    const [isExpanded, setIsExpanded] = useState(false);
    const [isCreateTripOpen, setIsCreateTripOpen] = useState(false);


    return (
    <div className='w-full px-1 py-2'>
        <div className='flex flex-row justify-between items-center px-[18px]'>
            <HamburgerMenuBtn />
            <div className='flex flex-col items-center gap-[1px] select-none'>
                <p className='font-normal text-[12px]'>12월</p>
                <p className='font-normal text-[16px]'>오늘</p>
            </div>
            <SeeMoreBtn />
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
            <BottomNav onCreateTrip={() => setIsCreateTripOpen(true)} showBubble={true} messageCount={5} />
            <TripCreateModal isOpen={isCreateTripOpen} onClose={() => setIsCreateTripOpen(false)} />
        </div>
    </div>
    );
}

export default HomePage;