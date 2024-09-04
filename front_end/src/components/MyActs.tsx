import React from 'react'
import { useProfile } from '@/hooks/useProfile'
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import Act from '@/components/Act';

function Acts() {
    const { data, isLoading } = useProfile()
    const { push } = useRouter()

    return isLoading ? <div className="loader w-full h-screen flex items-center justify-center">
        <CircularProgress />
    </div> : <div className="grid grid-cols-3 gap-6 mt-6">
        {
            data?.user?.acts.length ? data.user.acts.map((item, index) => (
                <Act
                    header={item.header}
                    description={item.description}
                    username={data.user.username}
                    created_at={item.created_at}
                    id={item.id}
                    isMine={true}
                />
            )) : <p>No Acts</p>
        }
    </div>
}

export default Acts