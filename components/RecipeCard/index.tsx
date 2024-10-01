"use client"

import React from "react"
import styles from "./style.module.css"
import Image from "next/image"

interface RecipeCardProps {
  id: number
  name: string
  author: string
  ingredients: IngredientsProps["items"]
}

interface IngredientsProps {
  items: {
    id: number
    name: string
    qty: number
    consumeType: string
    image: string
  }[]
}

export function Ingredients({ items }: IngredientsProps) {
  return (<div className="flex flex-col gap-4 w-full">
    {items.map(item => {
      const {id, name, qty, consumeType, image} = item
      return (<div key={id} className="ingredients-container flex gap-4 w-full">
        <Image
          src={image}
          width={100}
          height={100}
          alt={name}
          objectFit="contain"
          className="thumbnail border border-white rounded-lg shadow overflow-hidden"
        />
        <div className="details flex flex-col w-full justify-between border border-white rounded-lg shadow overflow-hidden p-2">
          <h2>{name}</h2>
          <div className="more-info flex justify-between w-full">
            <span className="inline-flex">Qty: {qty}</span>
            <span className="inline-flex">{consumeType}</span>
          </div>
        </div>
      </div>)
    })}
  </div>)
}

export function RecipeCard({ id, name, author, ingredients }: RecipeCardProps ) {
  return (<div key={id} className={styles.recipe}>
    {name}
    <small className="mb-2">by: {author}</small>
    <Ingredients items={ingredients} />
  </div>)
}