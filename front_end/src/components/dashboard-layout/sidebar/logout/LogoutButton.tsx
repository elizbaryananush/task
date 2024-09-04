import { authService } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React from 'react'
import { LuLogOut } from 'react-icons/lu'
import { toast } from 'sonner'

function LogoutButton() {
  const { push } = useRouter()

  const { mutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      push('/auth'),
      toast.success('Successfully loged out!')
    }
  })

  return (
    <button onClick={() => mutate()}>
      <LuLogOut
        className='w-8 h-8 stroke-white cursor-pointer rotate-180'
      />
    </button>
  )
}

export default LogoutButton