"use client";
import React, { Fragment, useEffect, useState } from "react";
import ConnectWallet from "./ConnectWallet";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Menu, Transition } from "@headlessui/react"; // If using Headless UI

const Header = ({ isSidebarOpen,bgColor }: any) => {
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);

  const Logo = useSelector(
    (state: RootState) => state.organisationSettings.logo
  );
  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      // Check if the user has scrolled down a certain amount (e.g., 100 pixels)
      if (window.scrollY > 100) {
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
    <nav className={`fixed top-0 left-0 right-0 z-50 ${isScrolled ? "bg-white border-b border-gray-300" : ""} text-black py-3`}>
      <div
        className={`${
          isSidebarOpen ? "max-w-6xl" : "max-w-7xl"
        } transform transition-all duration-200 ease-in-out container mx-auto flex justify-between items-center px-6`}
      >
        <div className="flex items-center space-x-4">
          <Link href={"/"}>
            {" "}
            <div className="text-2xl font-bold">{Logo}</div>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {session && (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-red-400 ease-in-up shadow-btn hover:shadow-btn-hover hidden rounded-md bg-primary px-8 py-2 text-base font-medium text-white transition duration-300 hover:bg-opacity-90 md:block md:px-9 lg:px-6 xl:px-9"
            >
              Sign Out
            </button>
          )}
          <ConnectWallet />
          <Menu as={"div"} className={"relative"}>
            <Menu.Button>
              <Image
                src={"/metamask-icon.svg"} // Replace with your image path
                alt="Profile"
                height={40}
                width={40}
                className="h-10 w-10 rounded-full border-2 border-gray-300"
              />
            </Menu.Button>
            <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
                {({ active }) => (
                  <Link
                    href={"/profile"}
                    className={`${
                      active ? "bg-gray-100" : ""
                    } block px-2 py-2 text-sm text-gray-700`}
                  >
                    <div className="flex gap-2 items-center">
                      <Image
                        src="/profile-icon.png"
                        height={2}
                        width={20}
                        alt=""
                        className="h-[20px] ml-2"
                      />
                      Profile
                    </div>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={"/admin/adminpage"}
                    className={`${
                      active ? "bg-gray-100" : ""
                    } block px-2 py-2 text-sm text-gray-700`}
                  >
                    <div className="flex gap-2 items-center">
                      <Image
                        src="/permission-icon.jpg"
                        height={2}
                        width={20}
                        alt=""
                        className="h-[20px] ml-2"
                      />
                      Permissions and Access
                    </div>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={"/admin/adminprofile"}
                    className={`${
                      active ? "bg-gray-100" : ""
                    } block px-2 py-2 text-sm text-gray-700`}
                  >
                    <div className="flex gap-2 items-center">
                      <Image
                        src="/settings-icon.svg"
                        height={2}
                        width={20}
                        alt=""
                        className="h-[20px] ml-2"
                      />
                      Settings
                    </div>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={"/admin/sharepage"}
                    className={`${
                      active ? "bg-gray-100" : ""
                    } block px-2 py-2 text-sm text-gray-700`}
                  >
                    <div className="flex gap-2 items-center">
                      <Image
                        src="/mail-icon.png"
                        height={2}
                        width={20}
                        alt=""
                        className="h-[20px] ml-2"
                      />
                      Share Invite
                    </div>
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Header;
