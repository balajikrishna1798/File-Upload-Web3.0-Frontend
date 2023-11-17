"use client";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    // Call your registration endpoint
    const response = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName,lastName, email, password }),
    });
    console.log(response.json());

    if (response.ok) {
      // If registration was successful, sign in to establish a session
      signIn("credentials", { redirect: false, email, password });
    } else {
      // Handle registration error
    }
  };
  return (
    <form>
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Username
        </label>
        <input
          onChange={(e) => setFirstname(e.target.value)}
          type="text"
          id="username"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="lastName"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Lastname
        </label>
        <input
          onChange={(e) => setLastname(e.target.value)}
          type="text"
          id="username"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          id="email"
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
        />
      </div>
      <div className="flex items-center justify-between">
        <button
        onClick={handleRegister} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          type="button"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default SignUp;
