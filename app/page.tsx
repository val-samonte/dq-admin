"use client";
import React from "react";
import { getProvider } from "@/utils";
import { AuthButton } from "@/components/AuthButton";
export default function Home() {
  const [walletAddress, setWalletAddress] = React.useState("");

    const onConnect = async () => {
    try {
      const provider = getProvider();

      if (!provider) {
        window.open("https://phantom.app/", "_blank");
      }

      const resp = await provider.connect();
      console.log("Connect", resp.publicKey.toString());

      setWalletAddress(resp.publicKey.toString());
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <AuthButton
        onClick={onConnect}
        buttonlabel="SignIn by Wallet"
        address={walletAddress}
      />
    </main>
  );
}
