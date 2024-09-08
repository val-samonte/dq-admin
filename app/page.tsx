"use client";
import { getCsrfToken, signIn, signOut } from "next-auth/react";
import styles from "./page.module.css";
import React from "react";
import { getProvider, Signature } from "@/utils";
import { AuthButton } from "@/components/AuthButton";
import bs58 from "bs58";
import { useSession } from "next-auth/react";
import { FaRegUserCircle } from "@react-icons/all-files/fa/FaRegUserCircle";
import { SiSociety6 } from "@react-icons/all-files/si/SiSociety6";
import { IconContext } from "@react-icons/all-files";
export default function Home() {
  const { data: session } = useSession();
  const onConnect = async () => {
    try {
      const provider = getProvider();

      if (!provider) {
        window.open("https://phantom.app/", "_blank");
      }

      const resp = await provider.connect();
      console.log("Connect", resp.publicKey.toString());
      const csrf = await getCsrfToken();
      if (resp && csrf) {
        const noneUnit8 = Signature.create(csrf);
        const { signature } = await provider.signMessage(noneUnit8);
        const serializedSignature = bs58.encode(signature);
        const message = {
          host: window.location.host,
          publicKey: resp.publicKey.toString(),
          nonce: csrf,
        };
        const response = await signIn("credentials", {
          message: JSON.stringify(message),
          signature: serializedSignature,
          redirect: false,
        });
        if (response?.error) {
          console.log("Error occured:", response.error);
          return;
        }
      } else {
        console.log("Could not connect to wallet");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <IconContext.Provider value={{ size: "4em" }}>
            <h1><SiSociety6 /></h1>
          </IconContext.Provider>
        </div>
        <AuthButton
          avatarSrc={session?.user?.image}
          onClick={onConnect}
          buttonlabel="SignIn by Wallet"
          address={session?.user?.name || ""}
        />
      </header>
      <main className={styles.main}>
        <IconContext.Provider value={{ size: "3em" }}>
          <FaRegUserCircle />
        </IconContext.Provider>
        <h4>Wallet Info</h4>
        <div>
          <h3>Address: {session?.user?.name}</h3>
          <p>Expires: {new Date(session?.expires || "").toTimeString()}</p>
        </div>

        {session !== null && (
          <button className="buttonContainer" onClick={() => signOut()}>
            SignOut
          </button>
        )}
      </main>
    </>
  );
}
