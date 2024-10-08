"use client"

import Link from "next/link"
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react"
import styles from "./style.module.css"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"

import bs58 from "bs58";
import { useEffect } from "react";
import { SigninMessage } from "@/utils/SigninMessage"
import { getSessionKeypair } from "@/utils/getSessionKeypair"
import { Keypair } from "@solana/web3.js"
import { Button } from "@headlessui/react"

export default function Header() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const wallet = useWallet();
  const walletModal = useWalletModal()

  const handleSignIn = async () => {
    try {
      if (!wallet.connected) {
        walletModal.setVisible(true);
      }

      const csrf = await getCsrfToken();
      if (!wallet.publicKey || !csrf || !wallet.signMessage) return;

      const message = new SigninMessage({
        domain: window.location.host,
        publicKey: wallet.publicKey?.toBase58(),
        statement: `Sign this message to sign in to the app.`,
        nonce: csrf,
      });

      console.log("pre-msg", message, message.prepare())

      const data = new TextEncoder().encode(message.prepare());
      const signature = await wallet.signMessage(data);
      const serializedSignature = bs58.encode(signature);

      signIn("credentials", {
        message: JSON.stringify(message),
        redirect: false,
        signature: serializedSignature,
      }).then((res) => {

        if (wallet.publicKey && res?.ok) {
          const walletAddress = wallet.publicKey.toBase58()
          const sessionKeypair =
            getSessionKeypair(walletAddress) ?? Keypair.generate()
          // store sessionKeypair
          // dunno where to use this? overkill kasi may cookies pa?
          window.localStorage.setItem(
            `session_keypair_${walletAddress}`,
            bs58.encode(sessionKeypair.secretKey)
          )
        }

      })

    } catch (error) {
      console.log("it error", error);
    }
  };

  useEffect(() => {
    console.log("the sess", session)
    if (wallet.connected && status === "unauthenticated") {
      handleSignIn();
    }
  }, [wallet.connected]);

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <p
          className={`nojs-show ${
            !session && loading ? styles.loading : styles.loaded
          }`}
        >
          {!session && (
            <>
              <span className={styles.notSignedInText}>
                You are not signed in
              </span>
              <Button className={styles.button} onClick={handleSignIn}>
                Sign in
              </Button>
            </>
          )}
          {session?.user && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url('${session.user.image}')` }}
                  className={styles.avatar}
                />
              )}
              <nav className={styles.navContainer}>
                <ul className={styles.navItems}>
                  <li className={styles.navItem}>
                    <Link legacyBehavior href="/">
                      <a>Home</a>
                    </Link>
                  </li>
                </ul>
              </nav>
              <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </div>
    </header>
  );
}