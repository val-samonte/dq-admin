"use client";

import { Button } from "@headlessui/react"
import { useSession } from "next-auth/react"
import styles from "./page.module.css";
import { CreateBlueprintDialog } from "@/components/CreateBlueprintDialog"
import { useState } from "react"
import { BpCard } from "@/components/BpCard"
interface paramsType {
  params: {
    walletAddress: string
  }
}

export default function Page({ params: params }: paramsType) {
  console.log('slugs', params)
  const { data: session } = useSession();
  const [showBpForm, setShowBpForm] = useState(false)

  // replace with real data
  const items = [{
    id: 1,
    name: "SpiderSilk Robe",
    description: "Wat spider no!! kill with fire!",
    imgSrc: "/images/Soul_Mantle_inventory_icon.png"
  },
  {
    id: 2,
    name: "Another Robe",
    description: "Lorem ipsum robe!!",
    imgSrc: "/images/Soul_Mantle_inventory_icon.png"
  }]

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
            {items.map(data => {
              return (<BpCard key={data.id} {...data}/>)
            })}
          </div>
        </>
      )}
    </main>
  );
}