"use client";

import { Button } from "@headlessui/react"
import { useSession } from "next-auth/react"
import Image from 'next/image'
import styles from "./page.module.css";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="flex items-center justify-center min-h-screen flex-col">
      {!session && (
        <h1 className="text-4xl font-bold mb-4">Sign in your wallet</h1>
      )}
      {session?.user && (
        <>
          <div className="controls">
            <Button className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700">
              Create new blueprint
            </Button>
          </div>

          <div className={styles.bpContainer}>
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 inline-flex flex-col">
                <a href="#" className="flex flex-col">
                  <Image className="p-8 rounded-t-lg flex-center self-center justify-self-center" src="/images/Soul_Mantle_inventory_icon.png" alt="product image" width={300} height={500} />
                </a>
              <div className="px-5 pb-5">
                <a href="#">
                  <h5 className="text-md font-semibold tracking-tight text-gray-900 dark:text-white pb-4">Cleric mantle lorem ipsum.</h5>
                </a>
                <div className="flex items-center justify-between">
                    <a href="#">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">SpiderSilk Mantle</span>
                    </a>
                    <Button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-2">Create Recipe</Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}