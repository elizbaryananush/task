'use client'

import { DASHBOARD_PAGES } from '@/config/pages-url.config';
import { useAct } from '@/hooks/useAct';
import { actService } from '@/services/act.service';
import { Act } from '@/types/act.types';
import { TextField, Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

function page() {
    const { id } = useParams();

    const actId = Array.isArray(id) ? id[0] : id;

    const { register, handleSubmit, reset, setValue } = useForm<Act>({
        mode: 'onChange'
    });

    const { data, isLoading } = useAct(actId)

    const { push } = useRouter();

    const { mutate } = useMutation({
        mutationKey: ['updateProfile'],
        mutationFn: (data: Act) => actService.update(actId, data),
        onSuccess() {
            toast.success('Act updated successfully');
            reset();
            push(`${DASHBOARD_PAGES.HOME}`);
        },
        onError(error) {
            toast.error(`Error: ${error.message}`);
        }
    });

    const onSubmit: SubmitHandler<Act> = (data) => {
        mutate(data);
    };

    useEffect(() => {
        console.log(data);
        
        if (data) {
            setValue('header', data.header || ''); // Set default header value
            setValue('description', data.description || ''); // Set default description value
        }
    }, [data, setValue]);

    return (
        <div className='p-6'>
            <form className='flex flex-col gap-5 my-10' onSubmit={handleSubmit(onSubmit)}>
                <label>Header</label>
                <TextField
                    {...register('header', {
                        required: 'Header is required'
                    })}
                    id="standard-basic"
                    variant="standard"
                />
                <label>Description</label>
                <textarea
                    {...register('description', {
                        required: 'Description is required'
                    })}
                    className='resize-none border border-gray-400 h-64 p-2'
                ></textarea>
                <Button
                    type='submit'
                    variant="outlined"
                    className='w-fit'
                >Save</Button>
            </form>
        </div>
    );
}

export default page