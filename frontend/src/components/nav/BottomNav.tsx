import { Plus } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import union from '../../assets/Union.png';
import homeIcon from '../../assets/Home.png';
import homeActiveIcon from '../../assets/Home_Active.png';
import messageIcon from '../../assets/Message.png';
import messageActiveIcon from '../../assets/Message_Active.png';
import notificationIcon from '../../assets/Notification.png';
import notificationActiveIcon from '../../assets/Notification_Active.png';
import profileIcon from '../../assets/Profile.png';
import profileActiveIcon from '../../assets/Profile_Active.png';

interface BottomNavProps {
    onCreateTrip: () => void;
    showBubble?: boolean;
    messageCount?: number;
}

function BottomNav({ onCreateTrip, showBubble = true, messageCount = 0 }: BottomNavProps) {

    const navigate = useNavigate();
    const location = useLocation();

    const leftTabs = [
        { icon: homeIcon, activeIcon: homeActiveIcon, path: '/home' },
        { icon: messageIcon, activeIcon: messageActiveIcon, path: '/chat' },
    ];

    const rightTabs = [
        { icon: notificationIcon, activeIcon: notificationActiveIcon, path: '/notifications' },
        { icon: profileIcon, activeIcon: profileActiveIcon, path: '/mypage' },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className='fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[393px]'>
            <img src={union} alt="" className='w-full' />

            <button onClick={onCreateTrip}
                className='absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary w-[52px] h-[52px] rounded-full flex items-center justify-center shadow-lg z-10'>
                <Plus size={24} className='text-white' />
            </button>

            {showBubble && (
                <div className='absolute -top-6 left-[calc(50%+16px)] bg-primary text-white text-[11px] px-3 py-2 rounded-md rounded-bl-none whitespace-nowrap'>
                    새로운 여행을 생성할까요?
                </div>
            )}

            <div className='absolute inset-0 flex flex-row items-end pb-6'>
                {leftTabs.map((tab) => (
                    <button key={tab.path} onClick={() => navigate(tab.path)}
                        className='flex-1 flex flex-col items-center gap-1'>
                        <img src={isActive(tab.path) ? tab.activeIcon : tab.icon} alt="" className='w-[20px] h-[20px]' />
                        {tab.path === '/chat' && isActive('/chat') && messageCount > 0 && (
                            <div className ='absolute -top-1 -right-2 bg-primary text-white text-[10px] rounded-lg items-center justify-center'>
                                {messageCount}
                            </div>
                        )}
                        <span className={`w-[20px] h-[2px] ${isActive(tab.path) ? 'bg-primary' : 'bg-transparent'}`} />
                    </button>
                ))}
                <div className='flex-1' />
                {rightTabs.map((tab) => (
                    <button key={tab.path} onClick={() => navigate(tab.path)}
                        className='flex-1 flex flex-col items-center gap-1'>
                        <img src={isActive(tab.path) ? tab.activeIcon : tab.icon} alt="" className='w-[20px] h-[20px]' />
                        <span className={`w-[20px] h-[2px] ${isActive(tab.path) ? 'bg-primary' : 'bg-transparent'}`} />
                    </button>
                ))}
            </div>
        </div>
    );
}

export default BottomNav;
