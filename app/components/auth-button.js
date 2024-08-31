'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";

export default function AuthButton() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, check } = useAuth();
    

    const handleLogin = async () => {
        // await login(email);
        const sess = await check();
        console.log(sess)
    }

    return (
        <>
            {/* <input type="text" placeholder="youremail@mail.com" onChange={e => setEmail(e.target.value)} /> */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="youremail@email.com" onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Password
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="password" placeholder="********" onChange={e => setEmail(e.target.value)}/>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogin}>Login</button>
            <br />
            <br />
        </>
    );
}
