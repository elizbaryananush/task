'use client'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { actService } from '@/services/act.service'
import { Act } from '@/types/act.types'
import { Button, TextField } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

function page() {
  const { register, handleSubmit, reset } = useForm<Act>({
    mode: 'onChange'
  })

  const { push } = useRouter()

  const { mutate } = useMutation({
    mutationKey: ['auth'],
    mutationFn: (data: Act) => actService.create(data),
    onSuccess() {
      toast.success('Successfully created'),
        reset()
      push(DASHBOARD_PAGES.HOME)
    }
  })

  const onSubmit: SubmitHandler<Act> = (data) => {
    mutate(data)
  }

  return (
    <div className='p-6'>
      <h1 className='text-xl'>Add new act</h1>
      <form className='flex flex-col gap-5 my-10' onSubmit={handleSubmit(onSubmit)}>
        <label>Header</label>
        <TextField
          {...register('header', {
            required: 'Header is required'
          })}
          id="standard-basic"
          label="Header"
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
  )
}

export default page