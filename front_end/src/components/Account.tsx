import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { usePeopleProfile } from '@/hooks/usePeopleProfile'
import { useStatus } from '@/hooks/useStatus'
import { connectionService } from '@/services/connection.service'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

interface Props {
    username: string
}

const Account: React.FC<Props> = ({ username }) => {
    const { push } = useRouter()
    const { status } = useStatus(username)

    const { data, isLoading } = usePeopleProfile(username)

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
    return (
        <div className='p-3 shadow-s rounded-lg w-full bg-white max-w-96 flex items-center justify-between cursor-pointer'>
            <div
                onClick={() => push(`${DASHBOARD_PAGES.HOME}/${username}`)}
                className="info flex items-center gap-6"
            >
                <div className="circle w-16 h-16 rounded-full bg-violet-950 flex items-center justify-center">
                    <div className="pfp bg-white w-14 h-14 rounded-full flex justify-center items-center text-2xl uppercase font-bold text-violet-950">{username.slice(0, 1)}</div>
                </div>
                <p className='text-lg'>{username}</p>
            </div>
            <button onClick={() => handlePressing()} className={status === 'follow back' || status === 'follow' ? 'shadow-s p-2 bg-violet-950 text-white rounded-md' : 'shadow-s p-2 rounded-md'}>{status}</button>
        </div>
    )
}

export default Account


