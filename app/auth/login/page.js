'use client';

import { createClient } from "@/lib/supabase/client";
import { useRouter, redirect } from "next/navigation";
import { useEffect, useState } from "react";
import AuthButton from "../../components/auth-button";
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Login() {
  const supabase = createClient();
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const [sessionData, setSessionData] = useState({})

  const router = useRouter();

const getUserData = async () => {
  const {
    data: sessionData
  } = await supabase.auth.getUser();
  setSessionData(sessionData)
}

useEffect(() => {
  getUserData();
}, [])

useEffect(() => {
  if(sessionData.user) {
    router.push('/dashboard');
  }
}, [sessionData])

  const handleLogin = async () => {
    try {
      let { data: dataUser, error } = await supabase
        .auth
        .signInWithPassword({
          email: data.email,
          password: data.password
        })

      if (dataUser) {
        // router.refresh();
        router.push('/dashboard');
      }

    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

//   return <AuthButton/>;

return (
  <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={data?.email} placeholder="youremail@email.com" onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" name="password"  required value={data?.password} placeholder="********" onChange={handleChange}/>
            </div>
            <Button type="submit" className="w-full" onClick={handleLogin}>
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="https://images.unsplash.com/photo-1506241537529-eefea1fbe44d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBob3RvZ3JhcGh5fGVufDB8fDB8fHww"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
);

// return (
//     <>
//         <h1>User Login Page</h1>
//         {/* <input type="text" placeholder="youremail@mail.com" onChange={e => setEmail(e.target.value)} /> */}
//         <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//                 Email
//             </label>
//             <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" name='email' value={data?.email} placeholder="youremail@email.com" onChange={handleChange}/>
//         </div>
//         <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//                 Password
//             </label>
//             <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="password" name='password' value={data?.password} placeholder="********" onChange={handleChange}/>
//         </div>
//         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogin}>Login</button>
//         <br />
//         <br />
//     </>
// );

//   return <div className="container mx-auto w-[400px] grid gap-4">
//     <div className='grid'>
//       <label>Email</label>
//       <input
//         type='text'
//         name='email'
//         value={data?.email}
//         onChange={handleChange}
//       />
//     </div>
//     <div className='grid'>
//       <label>Password</label>
//       <input
//         type='password'
//         name='password'
//         value={data?.password}
//         onChange={handleChange}
//       />
//     </div>
//     <div>
//       <button className="px-4 py-2 bg-blue-500 rounded cursor-pointer" onClick={login}>Login</button>
//     </div>
//   </div>;
}