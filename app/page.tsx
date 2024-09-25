"use client";

import { Button } from "@headlessui/react"
import { useSession } from "next-auth/react"
import Image from 'next/image'
import styles from "./page.module.css";
import { CreateBlueprintDialog } from "@/components/CreateBlueprintDialog"
import { useState } from "react"

export default function Home() {
  const { data: session } = useSession();
  const [showBpForm, setShowBpForm] = useState(false)

  return (
    <main className="flex items-center justify-center min-h-screen flex-col">
      {!session && (
        <h1 className="text-4xl font-bold mb-4">Sign in your wallet</h1>
      )}
      {session?.user && (
        <>
          {<CreateBlueprintDialog showDialog={showBpForm} setShowDialog={setShowBpForm} />}
          <div className={styles.action}>
            <Button className={styles.bpButton} onClick={() => setShowBpForm(true)}>
              Create new blueprint
            </Button>
          </div>

          <div className={styles.bpContainer}>
            <div className={styles.item}>
                <a href="#" className="flex flex-col">
                  <Image className="p-8 rounded-t-lg flex-center self-center justify-self-center max-h-lg" src="/images/Soul_Mantle_inventory_icon.png" alt="product image" width={300} height={500} />
                </a>
              <div className="px-5 pb-5">
                <a href="#">
                  <h5 className="text-md font-semibold tracking-tight text-gray-900 dark:text-white pb-4">Cleric mantle lorem ipsum.</h5>
                </a>
                <div className="flex items-center justify-between">
                    <a href="#">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">SpiderSilk Mantle</span>
                    </a>
                    <Button className={styles.recipeButton}>Create Recipe</Button>
                </div>
              </div>
            </div>

            <div className={styles.item}>
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
                    <Button className={styles.recipeButton}>Create Recipe</Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}