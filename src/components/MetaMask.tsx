"use client";

// components/ConnectWallet.js
import { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAccount } from "@/features/MetaMaskSlice";
import UserAuthenticationABI from "../../blockchain/artifacts/contracts/UserAuthentication.sol/UserAuthentication.json";
import contractConfig from "./../../public/contractAddress.json";

declare global {
  interface Window {
    ethereum?: any; // Using `any` for simplicity, but you should define the proper type.
  }
}
export const getProvider = () => {
  if (typeof window !== "undefined" && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  }
  return null;
};

export const getContract = async () => {
  const provider = await getProvider();
  if (!provider) return null;

  const signer = await provider.getSigner();
  const contractAddress = contractConfig.address;
  if (!contractAddress || !ethers.isAddress(contractAddress)) {
    throw new Error("Invalid contract address");
  }
  const contract = new ethers.Contract(
    contractAddress,
    UserAuthenticationABI.abi,
    signer
  );
  return contract;
};

const MetaMask = () => {
  const dispatch = useDispatch();
  const [isRegistered, setIsRegistered] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  const onConnected = async (account) => {
    dispatch(setAccount(account));

    const contract = await getContract();
    if (!contract) return;

    try {
      const registered = await contract.isRegistered(account);
      if (registered) {
        setIsRegistered(registered);
      } else {
        await registerUser();
      }
    } catch (error) {
      console.error("Error checking registration:", error);
    }
  };

  const registerUser = async () => {
    const contract = await getContract();

    if (!contract.target) return;

    try {
      const tx = await contract.register();
      await tx.wait();
      setIsRegistered(true);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  async function verifyAddressWithBackend(walletAddress, signature) {
    try {
      const response = await axios.post(
        "http://34.234.201.170:3001/wallet/connect-wallet",
        {
          address: walletAddress,
          signature: signature,
          message: "Please sign this message to confirm your identity.",
        }
      );
      if (response.data.success) {
        console.log("Address verified!", response.data);
        dispatch(setAccount(walletAddress));
        await onConnected(walletAddress);
      } else {
        console.error("Address verification failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error verifying address:", error);
      // Handle error
    }
  }

  async function connectToMetaMask() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const tempAccount = accounts[0];
        const signer = await provider.getSigner();
        const message = "Please sign this message to confirm your identity.";
        try {
          const signature = await signer.signMessage(message);
          console.log("signature verified!", signature);

          // Verify address with backend if signature is obtained
          if (signature) {
            await verifyAddressWithBackend(tempAccount, signature);
          }
        } catch (signError) {
          console.error("Error signing message with MetaMask:", signError);
        }
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
      }
    } else {
      alert("MetaMask is not installed!");
    }
  }
  const handleConnect = () => {
    session ? connectToMetaMask() : router.push("/signin");
  };
  return (
    <div
      onClick={handleConnect}
      className="cursor-pointer w-1/4 max-w-sm rounded-xl overflow-hidden shadow-lg border border-gray-300 p-5 m-10"
    >
      <div className="">
        <img
          src="/metamask-icon.svg"
          alt="Metamask Logo"
          width={60}
          height={60}
        />
      </div>
      <div className="mt-4">
        <div className="font-bold text-xl mb-2">Metamask</div>
        <p className="text-[#727272] text-base">
          Start exploring blockchain applications in seconds. Trusted by over 1
          million users worldwide.
        </p>
      </div>
    </div>
  );
};

export default MetaMask;
