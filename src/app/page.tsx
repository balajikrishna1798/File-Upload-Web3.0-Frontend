"use client";
import Header from "@/components/Header";
import MetaMask from "@/components/MetaMask";
import WalletConnect from "@/components/WalletConnect";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { createConfig, configureChains, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { mainnet, polygon } from "wagmi/chains";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignIn = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result.error) {
      // Display the error message to the user
      alert(result.error);
    } else {
      // The user is signed in, handle accordingly
    }
  };

  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [mainnet, polygon],
    [alchemyProvider({ apiKey: "bLLtGgauy0CV5QsFILBzCcVU2o5mNq4S" })]
  );

  const config = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
    connectors: [
      new WalletConnectConnector({
        chains,
        options: { projectId: "e5c941add349ff5d1923adedfcc61197" },
      }),
    ],
  });


  return (
    <div className="bg-white">
      <Header />
    <div className="min-h-screen max-w-7xl mx-auto">
      {/* Navbar */}
    
          <div className="flex">
            <MetaMask />
            
            <WagmiConfig config={config}>
              <WalletConnect />
            </WagmiConfig>
          </div>
          </div>
    </div>
  );
}
