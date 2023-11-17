'use client'
import { useAccount, useConnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { createConfig, configureChains, WagmiConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { mainnet, polygon } from 'wagmi/chains'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { ethers } from 'ethers'
import Image from 'next/image'

declare global {
  interface Window {
    ethereum?: any; // Using `any` for simplicity, but you should define the proper type.
  }
}

const WalletConnect = () => {
  const { address, isConnected } = useAccount()
  const { chains,publicClient,webSocketPublicClient } = configureChains([mainnet,polygon],  [alchemyProvider({ apiKey: 'bLLtGgauy0CV5QsFILBzCcVU2o5mNq4S' })],)
  const { data: ensName } = useEnsName({ address })
  const { connect } = useConnect({
    connector: new WalletConnectConnector({chains,options:{"projectId":"e5c941add349ff5d1923adedfcc61197"}}),
  })


  const handleVerify = async () => {

    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const tempAccount = accounts[0]; 
        const signer = await provider.getSigner();
   

    try {
      const message = 'Please sign this message to verify your wallet.';
      const signature = await signer.signMessage(message );
      console.log("conn",signature);

      // Send signature and address to backend for verification
      const response = await fetch('http://localhost:3001/wallet/connect-wallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address:tempAccount, signature, message }),
      });
      const verificationResult = await response.json();

      if (verificationResult.verified) {
        console.log('Wallet verified:', verificationResult);
        // Handle successful verification
      } else {
        console.error('Verification failed:', verificationResult);
        // Handle verification failure
      }
    } catch (error) {
      console.error('Signing failed:', error);
      // Handle error during signing
    }
  };

  
  if (isConnected) return <div>Connected to {ensName ?? address}</div>
  
  return <>
  <div className="max-w-sm rounded overflow-hidden shadow-lg card-gradient p-4 m-10">
  <div className="flex flex-col items-center">

    <div className="bg-blue-600 text-white p-3 rounded-full">
    <Image src="/WalletConnect.svg" alt="Metamask Logo" width={46} height={46} /> 

    </div>
    <div className="text-center mt-4">
      <div className="font-bold text-xl mb-2">Wallet Connect</div>
      <p className="text-gray-700 text-base">
        Connect to your wallet connect to proceed.
      </p>
    </div>
    <button suppressHydrationWarning onClick={() => connect()} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mt-4">
      Connect Wallet
    </button>
  </div>
  </div>
  {/* <button onClick={handleVerify}>Verify Wallet</button><button suppressHydrationWarning onClick={() => connect()}>Connect Wallet</button> */}
  </>
}
export default WalletConnect
