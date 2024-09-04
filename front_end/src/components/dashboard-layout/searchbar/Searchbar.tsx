'use client'

import Account from '@/components/Account';
import { DASHBOARD_PAGES } from '@/config/pages-url.config';
import { Username, userService } from '@/services/user.service';
import { User } from '@/types/user.types';
import { CircularProgress, IconButton, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LuSearch } from 'react-icons/lu';
import { toast } from 'sonner';

function Searchbar() {
    const { register, handleSubmit, reset } = useForm<Username>({
        mode: 'onChange'
    });
    const { push } = useRouter();
    const [userData, setUserData] = useState<User>()

    const { mutate } = useMutation({
        mutationKey: ['search'],
        mutationFn: (data: Username) => userService.getByUsername(data),
        onSuccess(data) {
            toast.success('Successfully searched');
            reset();
            push(DASHBOARD_PAGES.HOME);
            setUserData(data)
        },
        onError(error) {
            toast.error(`Error: ${error.message}`);
        }
    });

    const onSubmit: SubmitHandler<Username> = (data) => {
        mutate(data);
    };

    return (
        <div className="right w-3/12 bg-violet-950 p-6 min-h-screen">
            <form onSubmit={handleSubmit(onSubmit)}
                className='flex bg-white justify-between items-center p-2 mb-6'>
                <TextField
                    {...register('username')}
                    className='w-full'
                    id="outlined-basic"
                    label="Search..."
                    variant="outlined">
                </TextField>
            </form>
            {
                userData?.username ? <Account username={userData.username} />
                    : <div className="bottom flex flex-col gap-3">
                        <Account username={'test1'} />
                        <Account username={'test2'} />
                        <Account username={'test3'} />
                        <Account username={'test4'} />
                    </div>
            }
        </div>
    );
}

export default Searchbar;
