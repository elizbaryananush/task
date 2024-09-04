'use client'

import { userService } from "@/services/user.service";
import Acts from "../../components/MyActs";
import { IconButton, InputBase, Paper } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuSearch } from "react-icons/lu";
import { User } from "@/types/user.types";
import { watch } from "fs";
import { useState } from "react";

export default function Dashboard() {
  const [username, setUsername] = useState<string>('')

  const { mutate } = useMutation({
    mutationKey: ['getUserByUsername'],
    mutationFn: () => userService.getByUsername({username}),
    onSuccess: (data) => {
      console.log(data);
    }
  })

  const onSubmit = (e:any) => {
    e.preventDefault()
    mutate()
  }
  return (
    <div className='h-screen w-full flex'>
      <div className="middle p-7 w-9/12 ">
        <h1 className="text-2xl font-medium mb-6">My Kind Acts</h1>
        <Acts />
      </div>
    </div>
  );
}
