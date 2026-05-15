import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div className='max-w-[393px] mx-auto min-h-screen bg-background flex flex-col items-center'>
            <Outlet />
        </div>
    );
}

export default Layout;