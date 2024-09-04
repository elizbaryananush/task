'use client'

import React from 'react';
import { LuUserCircle2, LuLogOut, LuSettings, LuLayoutDashboard, LuPlus } from "react-icons/lu";
import Profile from './profile/Profile';
import { useRouter } from 'next/navigation';
import { DASHBOARD_PAGES } from '@/config/pages-url.config';
import LogoutButton from './logout/LogoutButton';
import { Fab } from '@mui/material';

function Sidebar() {
    const { push } = useRouter()

    return (
        <div className='fixed flex flex-col justify-between items-center w-fit h-screen p-4 bg-violet-950'>
            <div className=' flex flex-col items-center gap-6'>
                <Profile />
                <Fab 
                color='primary' 
                className='bg-white p-3' 
                aria-label="add"
                onClick={() => push(DASHBOARD_PAGES.NEWACT)}
                >
                    <LuPlus className='w-full h-full stroke-violet-950 '/>
                </Fab>
                <LuUserCircle2
                    className='w-8 h-8 stroke-white cursor-pointer'
                    onClick={() => push(DASHBOARD_PAGES.MYPROFILE)}
                />
                <LuSettings
                    className='w-8 h-8 stroke-white cursor-pointer'
                    onClick={() => push(DASHBOARD_PAGES.SETTINGS)}
                />
                <LuLayoutDashboard
                    className='w-8 h-8 stroke-white cursor-pointer'
                    onClick={() => push(DASHBOARD_PAGES.HOME)}
                />
            </div>
            <div className="logout">
                <LogoutButton />
            </div>
        </div>
    );
}

export default Sidebar;
