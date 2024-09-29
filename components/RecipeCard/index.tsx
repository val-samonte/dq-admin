"use client"

import React from "react"
import styles from "./style.module.css"

export interface RecipeCardProps {
  id: number
  name: string
  description: string
  imgSrc: string
  owner: string
}

export function RecipeCard({ id, name, description, imgSrc, owner }: RecipeCardProps ) {
  return (<div key={id} className={styles.recipe}>
    {name}
    {description}
    {imgSrc}
    {owner}
  </div>)
}