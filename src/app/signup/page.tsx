"use client";
import { useEffect, useState } from "react";
import GoogleLogin from "@/components/Authentication";
import Header from "@/components/Header";

const SignUp = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  console.log(window.location.hostname);
  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      // Check if the user has scrolled down a certain amount (e.g., 100 pixels)
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="background-url min-h-screen">
      <Header
        className={`text-white sticky z-50 py-5 ${
          isScrolled && "bg-[#403f83]"
        }`}
      />

      <div
        className={`container mx-auto flex justify-between items-center px-6 pt-10 max-w-7xl`}
      >
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
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
