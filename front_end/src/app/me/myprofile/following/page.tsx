'use client'

import Account from '@/components/Account'
import { useFollowings } from '@/hooks/useFollowings'
import { CircularProgress } from '@mui/material'
import React, { useEffect } from 'react'

function page() {
  const { followingData, followingIsLoading } = useFollowings()

  useEffect(() => {
    console.log(followingData?.includes({username : 'test1'}));
  }, [followingData])

  return followingIsLoading ? <div className="loader w-full h-screen flex items-center justify-center">
    <CircularProgress />
  </div> : <div className="flex flex-col gap-6">
    {
      followingData ? followingData?.map((item, index) => (
        <Account username={item.username} key={index} />
      )) : <p>No Followings</p>
    }
  </div>
}

export default page