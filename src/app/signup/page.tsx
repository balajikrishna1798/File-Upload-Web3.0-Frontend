"use client";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import GoogleLogin from "@/components/GoogleLogin";

const SignUp = () => {
  return(
    <div className='background-url min-h-screen'>
    <div className={`container mx-auto flex justify-between items-center px-6 pt-10 max-w-7xl`}>
      <div className="w-1/2">
        <h1 className="text-5xl font-bold max-w-lg text-white mb-6">
          Create, sell or collect digital items.
        </h1>
        <p className="text-white max-w-lg text-lg mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.
        </p>
      </div>
      <div className="w-1/2 max-w-md">
  <GoogleLogin  />
  </div>
      </div>
    </div>
  )
};

export default SignUp;
