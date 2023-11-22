"use client";
import React, { useState } from "react";
import ConnectWallet from "./ConnectWallet";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Menu, Transition } from "@headlessui/react"; // If using Headless UI
import { TruncatedWalletAddress } from "./TruncateFunction";
import { cn } from "@/lib/utils";

const Header = ({ className }: any) => {
  const { data: session, status } = useSession();
  const MetaMaskAccount = useSelector(
    (state: RootState) => state.metaMask.account
  );
  const Logo = useSelector(
    (state: RootState) => state.organisationSettings.logo
  );
  const [showCopied, setShowCopied] = useState(false);
  console.log(status, session);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(MetaMaskAccount);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 3000); // Hide message after 3 seconds
  };
  return (
    <nav
      className={cn(
        `fixed top-0 left-0 right-0 z-10 text-black py-3 mx-auto transition-all duration-200 ease-in-out`,
        className
      )}
    >
      <div
        className={` transform max-w-screen-xl mx-auto  container  flex justify-between items-center px-6`}
      >
        <div className="flex items-center space-x-4">
          <Link href={"/"}>
            {" "}
            <div className="text-2xl font-bold">{Logo}</div>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <ConnectWallet />
          {status === "authenticated" && (
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
                        <div className="flex justify-center gap-2 items-center">
                          Username
                        </div>
                      </Link>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={`${
                          active ? "bg-gray-100" : ""
                        } block px-2 py-2 text-sm text-gray-700`}
                      >
                        <div className="flex flex-col gap-1 items-start">
                          <div className="flex gap-2 items-center">
                            <svg
                              className="ml-2"
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M19 7h-1V6a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-8a3 3 0 0 0-3-3ZM5 5h10a1 1 0 0 1 1 1v1H5a1 1 0 0 1 0-2Zm15 10h-1a1 1 0 0 1 0-2h1Zm0-4h-1a3 3 0 0 0 0 6h1v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8.83A3 3 0 0 0 5 9h14a1 1 0 0 1 1 1Z"
                              />
                            </svg>
                            Wallet Address
                          </div>
                          <div
                            className={`flex justify-center ${
                              !showCopied ? "space-x-10" : "space-x-4"
                            } w-full items-center`}
                          >
                            <div className="font-semibold">
                              {TruncatedWalletAddress(MetaMaskAccount)}
                            </div>
                            {!showCopied ? (
                              <button onClick={handleCopy}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 256 256"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M216 32H88a8 8 0 0 0-8 8v40H40a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8v-40h40a8 8 0 0 0 8-8V40a8 8 0 0 0-8-8Zm-56 176H48V96h112Zm48-48h-32V88a8 8 0 0 0-8-8H96V48h112Z"
                                  />
                                </svg>
                              </button>
                            ) : (
                              <span className="copied-message font-bold text-green-500">
                                Copied
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </Menu.Item>

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
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className={`w-full mt-1 ${
                          active ? "bg-red-400" : "bg-red-500"
                        } block px-2 py-2 text-sm text-white`}
                      >
                        SignOut
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
