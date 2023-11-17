"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TruncatedWalletAddress } from "./TruncateFunction";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import UserAuthenticationABI from "../../blockchain/artifacts/contracts/UserAuthentication.sol/UserAuthentication.json";
import { ethers } from "ethers";
import contractConfig from "./../../public/contractAddress.json";
import { setAccount } from "@/features/MetaMaskSlice";
import { useState } from "react";

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
  )
  return contract

 
  
};

const ConnectWallet = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const dispatch = useDispatch();

  const onConnected = async (account) => {
    dispatch(setAccount(account));

    const contract = await getContract();
    console.log(contract);
    if (!contract) return;

    try {
      const registered = await contract.isRegistered(account);
      if(registered){
      setIsRegistered(registered);
    }
    else{
      await registerUser()
    }
    } catch (error) {
      console.error("Error checking registration:", error);
    }
  };
  const { data: session, status } = useSession();
  const router = useRouter();

  const MetaMaskAccount = useSelector(
    (state: RootState) => state.metaMask.account
  );

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

  const handleConnect = () => {
    session ?  router.push("/") : router.push("/signin");
  };
  return (
    <div className="flex items-center gap-4">
      <div className={`${MetaMaskAccount && "w-48"} text-white`}>
        {!MetaMaskAccount && (
          <button
            className="p-2 bg-red-700 rounded-md px-4"
            onClick={handleConnect}
          >
            Connect Wallet
          </button>
        )}
        {MetaMaskAccount && (
          <p className="text-center  p-2 w-fit rounded-md font-semibold">
            <span className="inline-block mt-1 bg-slate-300 p-1 rounded-md text-black px-4">
              {TruncatedWalletAddress(MetaMaskAccount)}
            </span>
          </p>
        )}
      </div>
      <div className="p-2 rounded-md bg-green-800 text-white">
        {!isRegistered && <button onClick={()=>onConnected(MetaMaskAccount)}>Register</button>}
        {isRegistered && <p>{TruncatedWalletAddress(contractConfig.address)}</p>}
      </div>
    </div>
  );
};

export default ConnectWallet;
