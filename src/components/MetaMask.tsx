'use client'

// components/ConnectWallet.js
import { useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {setAccount } from '@/features/MetaMaskSlice';
const MetaMask = () => {
  const dispatch = useDispatch()
  
    const { data: session, status } = useSession();
    const router = useRouter()

  async function verifyAddressWithBackend(walletAddress, signature) {
    try {
      const response = await axios.post('http://localhost:3000/wallet/connect-wallet', {
        address: walletAddress,
        signature: signature,
        message: "Please sign this message to confirm your identity."
      });
      if(response.data.success) {
        console.log('Address verified!', response.data);
        // Handle successful verification
      } else {
        console.error('Address verification failed:', response.data.message);
        // Handle failed verification
      }
    } catch (error) {
      console.error('Error verifying address:', error);
      // Handle error
    }
  }

  
  async function connectToMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const tempAccount = accounts[0]; 
        const signer = await provider.getSigner();
        const message = "Please sign this message to confirm your identity."
        try{
        // Sign message after setting the account
        const signature = await signer.signMessage(message);
        console.log('signature verified!', signature);

        // Verify address with backend if signature is obtained
        if (signature) {
          await verifyAddressWithBackend(tempAccount, signature);
          dispatch(setAccount(tempAccount));
        }
      } catch (signError) {
        console.error('Error signing message with MetaMask:', signError);
      }
      } catch (error) {
        console.error('Error connecting to MetaMask', error);
      }
    } else {
      alert('MetaMask is not installed!');
    }
  }
  const handleConnect = () => {
    session?connectToMetaMask():router.push("/signin")
  }
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg card-gradient p-4 m-10">
    <div className="flex flex-col items-center">
      <div className="bg-blue-600 text-white p-3 rounded-full">
      <img src="/metamask-icon.svg" alt="Metamask Logo" width={16} height={16} /> 
  
      </div>
      <div className="text-center mt-4">
        <div className="font-bold text-xl mb-2">Metamask Wallet</div>
        <p className="text-gray-700 text-base">
          Connect to your Metamask wallet to proceed.
        </p>
      </div>
      <button onClick={handleConnect} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mt-4">
        Connect Wallet 
      </button>
    </div>

  </div>
  )
}

export default MetaMask