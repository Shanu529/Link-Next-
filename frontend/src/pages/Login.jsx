import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'

function Login() {

  const [loginData, setloginData] = useState({
    email: "",
    password:""

  });

  const QueryClient = useQueryClient()

  const { mutateloginMutation,  isPending, error} = useMutation({
    mutationFn: Login
  })
  return (
    <div>Login</div>
  )
}

export default Login