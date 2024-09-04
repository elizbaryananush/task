'use client'

import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { authService } from "@/services/auth.service";
import { AuthForm } from "@/types/auth.types";
import { Button, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Auth() {
    const { register, handleSubmit, reset } = useForm<AuthForm>({
        mode: 'onChange'
    })

    const [isLoginForm, setIsLoginForm] = useState(false)

    const { push } = useRouter()

    const { mutate } = useMutation({
        mutationKey: ['auth'],
        mutationFn: (data: AuthForm) => authService.main(isLoginForm ? 'login' : 'register', data),
        onSuccess() {
            toast.success('Successfully login'),
                reset()
            push(DASHBOARD_PAGES.HOME)
        }
    })

    const onSubmit: SubmitHandler<AuthForm> = (data) => {
        mutate(data)
    }

    return (
        <div className="h-screen bg-white flex justify-center items-center ">
            <form
                className="w-1/4 flex flex-col p-6 gap-5 shadow-s items-center"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="text-2xl">{isLoginForm ? 'Login' : 'Sign Up'}</h1>
                {
                    !isLoginForm && <TextField
                        className="w-full"
                        id="outlined-password-input"
                        label="Name"
                        type="name"
                        {...register('name', {
                            required: 'Name is required'
                        })}
                    />
                }

                <TextField
                    className="w-full"
                    id="outlined-password-input"
                    label="Username"
                    type="username"
                    {...register('username', {
                        required: 'Username is required'
                    })}
                />

                <TextField
                    className="w-full"
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    {...register('password', {
                        required: 'Password is required'
                    })}
                />

                <Button
                    variant="contained"
                    className="capitalize"
                    type="submit"
                >Submit</Button>
                {
                    isLoginForm ?
                        <p>Don't have an account ?
                            <span
                                className="text-indigo-600 cursor-pointer"
                                onClick={() => setIsLoginForm(!isLoginForm)}>Sign Up !</span>
                        </p> :
                        <p>Already have an account ?
                            <span
                                className="text-indigo-600 cursor-pointer"
                                onClick={() => setIsLoginForm(!isLoginForm)}>Sign in !</span>
                        </p>
                }
            </form>
        </div>
    );
}