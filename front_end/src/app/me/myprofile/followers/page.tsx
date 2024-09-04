'use client'

import Account from '@/components/Account'
import { useFollowers } from '@/hooks/useFollowers'
import { CircularProgress } from '@mui/material'
import React, { useEffect } from 'react'

function page() {
  const { followerData, followerIsLoading } = useFollowers()

  useEffect(() => {
    console.log(followerData?.some(item => item.username === 'test'));
  }, [followerData])

  return followerIsLoading ? <div className="loader w-full h-screen flex items-center justify-center">
    <CircularProgress />
  </div> : <div className="flex flex-col gap-6">
    {
      followerData ? followerData?.map((item, index) => (
        <Account username={item.username} key={index} />
      )) : <p>No Followings</p>
    }
  </div>
}

export default page