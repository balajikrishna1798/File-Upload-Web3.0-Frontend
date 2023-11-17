"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Header from "./Header";
import { useState } from "react";
import FileUpload from "./FileUpload";
import {
  ArrowUpCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";

const Dashboard = ({ children }) => {
  const pathname = usePathname();

  // This function checks if the path is the active route
  const isActive = (path) => {
    return pathname === path;
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Initially open
  const [transitionComplete, setTransitionComplete] = useState(true);

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setTransitionComplete(false); // Reset transition state when toggling
  };

  // Handle the end of the sidebar transition
  const handleTransitionEnd = () => {
    if (isSidebarOpen) {
      setTransitionComplete(true);
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}{" "}
      <FileUpload isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <header className="w-full">
        <Header isSidebarOpen={isSidebarOpen}/>
      </header>
      {/* Sidebar and Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`flex flex-col bg-slate-100 text-slate-950 space-y-3 py-4 px-2 absolute inset-y-0 left-0 transform transition-all duration-200 ease-linear ${
            isSidebarOpen ? "w-48" : "w-16"
          }`}
          onTransitionEnd={handleTransitionEnd}
        >
          {/* Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="absolute top-0 right-5 p-2 transform translate-x-full"
          >
            {isSidebarOpen ? (
              <ChevronLeftIcon className="bg-black text-white rounded-full p-1 h-6 w-6" />
            ) : (
              <ChevronRightIcon className="bg-black text-white rounded-full p-1 h-6 w-6" />
            )}
          </button>

          {/* Navigation Links */}
          <nav className={`flex flex-col ${!isSidebarOpen&&"items-center"} pt-10 gap-5`}>
            {/* Conditional rendering based on sidebar state */}
            {isSidebarOpen && transitionComplete && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-2 w-fit  py-2 bg-blue-500 text-white rounded hover:bg-opacity-90"
              >
                <div className={`flex items-center `}>
                  <ArrowUpCircleIcon
                    className="h-5 w-5 mr-2"
                    aria-hidden="true"
                  />
                  <span className="text-sm ">Upload Files</span>
                </div>
              </button>
            )} {!isSidebarOpen && (
                <button
                onClick={() => setIsModalOpen(true)}
                className=""
              >
                <ArrowUpCircleIcon height={30} width={30} />
              </button>
            )}

            {isSidebarOpen && transitionComplete && (
              <Link
                href="/dashboard"
                className={`block p-2 mb-2 px-4 rounded transition duration-200 font-semibold  ${
                  isActive("/dashboard")
                    ? "bg-gray-300 text-blue-600"
                    : "hover:bg-gray-700 hover:text-white"
                } `}
              >
                Dashboard
              </Link>
            )}  {!isSidebarOpen && (
                <Link
                href="/dashboard">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1828/1828765.png"
                width={20}
                height={20}
                alt=""
              />
              </Link>
            )}
            {/* More links */}
          </nav>
        </div>

        {/* Content area */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Main content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 ">
            <div className={`${isSidebarOpen?"max-w-screen-lg":"max-w-screen-xl"} transition-all duration-200 ease-linear container mx-auto px-6 py-8`}>{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
