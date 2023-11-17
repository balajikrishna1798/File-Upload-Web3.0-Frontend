'use client'
import React from 'react'
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useState } from "react";
const SignIn = () => {
  const { data:session,status } = useSession()
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignIn = async (e) => {
    e.preventDefault()
    const result = await signIn('credentials',{callbackUrl:"/", email, password });
    if (result.error) {
      // Display the error message to the user
      alert(result.error);
    } else {
      // The user is signed in, handle accordingly
    }
  }
  return (
    <form>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password
                </label>
                <input
                                    onChange={(e) => setPassword(e.target.value)}

                  type="password"
                  id="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
               name="password"
               />
              </div>
              <div className="flex items-center justify-between">
                <button onClick={handleSignIn} 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Submit
                </button>
                <a
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
              
            </form>
  )
}

export default SignIn