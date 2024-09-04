'use client'

import { useProfile } from '@/hooks/useProfile'
import { CircularProgress } from '@mui/material'
import React from 'react'

function Profile() {
    const { data, isLoading } = useProfile()
    return isLoading ? <div className="loader w-16 h-16 rounded-full bg-white flex items-center justify-center">
        <CircularProgress />
    </div> : (
        <div className="pfp w-16 h-16 rounded-full bg-white capitalize flex items-center justify-center text-3xl font-medium text-indigo-900">{data?.user.username.slice(0, 1)}</div>
    )
}

export default Profile