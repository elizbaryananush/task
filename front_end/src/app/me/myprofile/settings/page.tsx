'use client'

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import { toast } from "sonner";
import { userService } from "@/services/user.service";
import { User } from "@/types/user.types";
import { useProfile } from "@/hooks/useProfile";

export default function Page() {
  const { register, handleSubmit, reset } = useForm<User>({
    mode: 'onChange'
  });
  const { data, isLoading } = useProfile()

  const { push } = useRouter();

  const { mutate } = useMutation({
    mutationKey: ['updateProfile'],
    mutationFn: (data: User) => userService.update(data),
    onSuccess() {
      toast.success('Profile updated successfully');
      reset();
      push('/me/myprofile/acts');
    },
    onError(error) {
      toast.error(`Error: ${error.message}`);
    }
  });

  const onSubmit: SubmitHandler<User> = (data) => {
    mutate(data);
  };

  return (
    <div className="bg-white ">
      <form
        className="w-1/4 flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >

        <TextField
          className="w-full"
          id="outlined-name-input"
          label={data?.user.name}
          type="text"
          {...register('name')}
        />

        <TextField
          className="w-full"
          id="outlined-username-input"
          label={data?.user.username}
          type="text"
          {...register('username')}
        />

        <TextField
          className="w-full"
          id="outlined-password-input"
          label="**********"
          type="password"
          {...register('password')}
        />

        <Button
          variant="contained"
          className="capitalize"
          type="submit"
        >Update</Button>
      </form>
    </div>
  );
}

