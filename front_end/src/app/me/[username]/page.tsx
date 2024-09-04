'use client'

import PeopleActs from '@/components/PeopleActs';
import { usePeopleProfile } from '@/hooks/usePeopleProfile';
import { useStatus } from '@/hooks/useStatus';
import { connectionService } from '@/services/connection.service';
import { CircularProgress } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { toast } from 'sonner';

function page() {
  const { username } = useParams();

  const accountUsername = Array.isArray(username) ? username[0] : username;

  const { data, isLoading } = usePeopleProfile(accountUsername)

  const { status } = useStatus(accountUsername)

  const followingMutation = useMutation({
    mutationKey: ['follow'],
    mutationFn: (data: string) => connectionService.create(data),
    onSuccess() {
      toast.success('Followed')
    }
  })

  const unfollowingMutation = useMutation({
    mutationKey: ['unfollow'],
    mutationFn: (data: string) => connectionService.delete(data),
    onSuccess() {
      toast.success('Unfollowed')
    }
  })

  const handlePressing = () => {
    if (data) {
      if (status === 'follow' || status === 'follow back') {
        return followingMutation.mutate(data.id)
      } else if (status === 'following') {
        return unfollowingMutation.mutate(data.id)
      }

      window.location.reload
    }
  }

  return isLoading ? <div className="loader w-full h-screen flex items-center justify-center">
    <CircularProgress />
  </div> : <div className=''>
    <div className="top w-full h-64 flex shadow-s p-12">
      <div className="box w-fit h-fit flex items-center gap-6">
        <div className="circle w-40 h-40 p-1 bg-violet-950 rounded-full flex items-center justify-center">
          <div className="w-full h-full bg-white rounded-full capitalize flex items-center justify-center text-5xl font-medium text-violet-950">{username.slice(0, 1)}</div>
        </div>
        <div className="info flex flex-col gap-3">
          <p className='text-xl'>{username}</p>
          <button onClick={() => handlePressing()} className={status === 'follow back' || status === 'follow' ? 'shadow-s p-2 bg-violet-950 text-white rounded-md' : 'shadow-s p-2 rounded-md'}>{status}</button>
        </div>
      </div>
    </div>
    <div className="bottom p-6">
      {
        data?.acts && <PeopleActs username={accountUsername} acts={data?.acts} />
      }
    </div>
  </div>
}

export default page