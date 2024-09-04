'use client'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { useProfile } from '@/hooks/useProfile'
import { CircularProgress, IconButton, Tooltip } from '@mui/material'
import { useRouter } from 'next/navigation'
import { LuPencil } from "react-icons/lu";
import React, { useEffect, useState } from 'react'

const pages = [
    {
        name: 'Acts',
        link: 'acts'
    },
    {
        name: 'Followers',
        link: 'followers'
    },
    {
        name: 'Following',
        link: 'following'
    }
]

function Navbar() {
    const { data, isLoading } = useProfile()
    const { push } = useRouter()

    const [name, setName] = useState<string>('acts')

    const handleClick = (link: string) => {
        setName(link)
        push(`${DASHBOARD_PAGES.HOME}/myprofile/${link}`)
    }
    return (
        isLoading ? <div className="w-full h-screen flex items-center justify-center">
            <CircularProgress />
        </div> : <div className="w-full">
            <div className="top h-fit p-12 shadow-s">
                <div className="h-full w-fit flex items-center gap-10">
                    <div className="pfp w-48 h-48 rounded-full bg-violet-950 flex items-center justify-center shadow-s">
                        <div className="capitalize rounded-full bg-white w-44 h-44 flex items-center justify-center text-7xl font-bold text-violet-950">{data?.user.username?.slice(0, 1)}</div>
                    </div>
                    <div className="info">
                        <p className='text-3xl'>{data?.user.username}</p>
                        <p>{data?.user.name}</p>
                    </div>
                </div>
                <div className="">

                </div>
            </div>
            <div className="bottom p-5 flex justify-between">
                <div className="buttons flex gap-5">
                    {

                        pages.map((item, index) => (
                            <button
                                onClick={() => handleClick(item.link)}
                                className={name === item.link ?
                                    'bg-violet-950 text-white p-2 rounded-sm' :
                                    'bg-white p-2 shadow-s rounded-sm'}
                                key={index}
                            >{item.name}</button>
                        ))
                    }
                </div>
                <div className="icons">
                    <Tooltip title='Edit Account' arrow>
                        <IconButton>
                            <LuPencil className='cursor-pointer' onClick={() => handleClick('settings')} />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

export default Navbar