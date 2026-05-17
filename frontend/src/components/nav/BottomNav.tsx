import { House, Send, Plus, Bell, UserRound } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface BottomNavProps {
    onCreateTrip: () => void;
}

function BottomNav({ onCreateTrip }: BottomNavProps) {

    const navigate = useNavigate();
    const location = useLocation();

    const leftTabs = [
        { icon: House, path: '/home' },
        { icon: Send, path: '/chat' },
    ];

    const rightTabs = [
        { icon: Bell, path: '/notifications' },
        { icon: UserRound, path: '/mypage' },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className='w-full max-w-[393px] h-16 bg-white flex flex-row justify-around items-center fixed bottom-0 overflow-visible fixed bottom-0 left-1/2 -translate-x-1/2'>
            {leftTabs.map((tab) => (
                <button key={tab.path} onClick={() => navigate(tab.path)}
                    className={`flex-1 flex flex-col items-center gap-1 ${isActive(tab.path) ? 'text-primary' : 'text-icon-primary'}`}>
                    <tab.icon size={20} />
                    <span className={`w-[20px] h-[2px] ${isActive(tab.path) ? 'bg-primary' : 'bg-transparent'}`}></span>
                </button>
            ))}

            <button onClick={onCreateTrip} className='flex-1 flex flex-col items-center'>
                <div className='-mt-12 bg-white rounded-full p-[14px]'>
                    <div className='bg-primary w-[52px] h-[52px] rounded-full flex items-center justify-center'>
                        <Plus size={24} className='text-white' />
                    </div>
                </div>
            </button>

            {rightTabs.map((tab) => (
                <button key={tab.path} onClick={() => navigate(tab.path)}
                    className={`flex-1 flex flex-col items-center gap-1 ${isActive(tab.path) ? 'text-primary' : 'text-icon-primary'}`}>
                    <tab.icon size={20} />
                    <span className={`w-[20px] h-[2px] ${isActive(tab.path) ? 'bg-primary' : 'bg-transparent'}`}></span>
                </button>
            ))}
        </div>
    );
}

export default BottomNav;