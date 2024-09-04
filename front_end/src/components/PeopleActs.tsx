import React from 'react'
import { useProfile } from '@/hooks/useProfile'
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Act as ActType } from '@/types/act.types';
import Act from './Act';

interface Props {
    username: string,
    acts: ActType[]
}

const PeopleActs: React.FC<Props> = ({ acts, username }) => {
    const { push } = useRouter()

    return <div className="grid grid-cols-3 gap-6 mt-6">
        {
            acts.length ? acts.map((item, index) => (
                <Act
                    header={item.header}
                    description={item.description}
                    username={username}
                    created_at={item.created_at}
                    id={item.id}
                    isMine={true}
                />
            )) : <p>No Acts</p>
        }
    </div>
}

export default PeopleActs