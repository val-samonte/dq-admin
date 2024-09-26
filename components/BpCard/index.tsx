import { Button } from "@headlessui/react"
import styles from "./style.module.css"
import Image from "next/image"

export interface BpCardProps {
  id: number
  name: string
  description: string
  imgSrc: string
}

export function BpCard({ id, name, description, imgSrc }: BpCardProps ) {
  return (<div className={styles.item}>
    <a href={`blueprints/${id}`} className="flex flex-col">
      <Image className="p-8 rounded-t-lg flex-center self-center justify-self-center max-h-lg" src={imgSrc} alt="product image" width={300} height={500} />
    </a>
    <div className="px-5 pb-5">
      <a href="#">
        <h5 className="text-md font-semibold tracking-tight text-white pb-4"> { description } </h5>
      </a>
      <div className="flex items-center justify-between gap-4">
          <a href="#">
            <span className="text-xl font-bold text-white">{ name }</span>
          </a>
          <Button className={styles.recipeButton}>Create Recipe</Button>
      </div>
    </div>
  </div>)
}