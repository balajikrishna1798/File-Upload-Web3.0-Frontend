// Install Tailwind CSS with Next.js as per the official documentation
// before using this code.
"use client";
import Header from "@/components/Header";
import Image from "next/image";
import { useState } from "react";

export default function ProfilePage() {
  // Dummy data for the profile
  const [profile, setProfile] = useState({
    username: "RajKumar",
    email: "rajkumar@gmail.com",
    phone: "+91 73389 65230",
    walletId: "0x123...abc",
    profileUrl: "/metamask-icon.svg",
    bannerUrl: "/background-image.png", // replace with your default avatar image path
  });

  return (
    <div className=" min-h-screen bg-white">
      <Header />
      <div className="container  max-w-screen-lg mx-auto p-4 ">
        <div className="bg-gray-900 rounded-md p-2 px-3 mb-4 w-fit text-white">
          Profile
        </div>
        <div className="flex flex-col md:flex-row md:gap-5">
          {/* Left column for input fields */}
          <form className="flex flex-col w-2/3 gap-3" autoComplete="off">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="username"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Email"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="Wallet ID"
              >
                Wallet ID
              </label>
              <input
                disabled
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Wallet ID"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="username"
              >
                Mobile Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Phone Number"
              />
            </div>
          </form>

          {/* Right column for profile image and banner */}
          <div className="flex-1">
            <div className="mb-4">
              {/* Profile image */}
              <label
                className="block text-gray-700 text-md font-bold mb-1"
                htmlFor="Wallet ID"
              >
                Profile Pic
              </label>
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300">
                <img src={profile.profileUrl} alt="Profile" />
              </div>
            </div>
            <div className="mb-4">
              {/* Profile banner */}
              <label
                className="block text-gray-700 text-md font-bold mb-1"
                htmlFor="Wallet ID"
              >
                Profile Banner
              </label>
              <div className="w-full h-32 overflow-hidden rounded-lg border-2 border-gray-300">
                <img src={profile.bannerUrl} alt="Banner" />
              </div>
            </div>
          </div>
        </div>
        <button className="bg-blue-900 rounded-md p-2 px-3 mb-4 text-white">
          Update Profile
        </button>
      </div>
    </div>
  );
}
