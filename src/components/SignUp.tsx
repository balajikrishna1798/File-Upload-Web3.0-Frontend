"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  console.log(passwordError);

  const validatePasswords = (currentPassword, currentRepeatPassword) => {
    if (currentPassword !== currentRepeatPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (attemptedSubmit) {
      validatePasswords(newPassword, repeatPassword);
    }
  };

  const handleRepeatPasswordChange = (e) => {
    const newRepeatPassword = e.target.value;
    setRepeatPassword(newRepeatPassword);
    if (attemptedSubmit) {
      validatePasswords(password, newRepeatPassword);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setAttemptedSubmit(true);
    validatePasswords(password, repeatPassword);

    if (password !== repeatPassword) {
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
        tenantId: "e74cce10-48ed-4483-82fb-ff2b6e0dfbd8",
        firstName,
        lastName,
        email,
        password,
      });

      if (response) {
        // If registration was successful, sign in to establish a session
        signIn("credentials", { redirect: false, email, password });
      } else {
        // Handle registration error
      }
    } catch (error) {
      // Handle error in registration process
    }
  };
  return (
    <>
      <form autoComplete="off">
        <div className="flex gap-4">
          <div className="mb-3">
            <label
              htmlFor="firstname"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              First Name
            </label>
            <input
              onChange={(e) => setFirstname(e.target.value)}
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="lastName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Last Name
            </label>
            <input
              onChange={(e) => setLastname(e.target.value)}
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className="mb-3">
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
        <div className="flex gap-4">
          <div className="mb-3">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              onChange={handlePasswordChange}
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Repeat Password
            </label>
            <input
              onChange={handleRepeatPasswordChange}
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            {passwordError && (
              <p className="text-red-500 text-xs italic">{passwordError}</p>
            )}
          </div>
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
    </>
  );
};

export default SignUp;
