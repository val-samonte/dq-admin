"use client";

import { Button } from "@headlessui/react"
import { useSession } from "next-auth/react"
import Image from "next/image"

export default function Page({ params: params }) {
  console.log('slugs', params)
  const { data: session } = useSession();

  return (
    <main className="flex items-center justify-start min-h-screen flex-col">
      {!session && (
        <h1 className="text-4xl font-bold mb-4">Sign in your wallet</h1>
      )}
      {session && (
        <section>
          <div className="flex flex-col mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 gap-8">
            <div className="blueprint-details gap-8 flex">
              <div className="max-w-sm bg-stone-800 border border-none rounded-lg shadow text-white inline-flex flex-col p-16">
                <Image
                  alt=""
                  src="/images/Soul_Mantle_inventory_icon.png"
                  width={300}
                  height={500}
                />
              </div>

              <div className="item-defails flex flex-col">
                <h2 className="text-3xl font-bold sm:text-4xl">Spider SilkRobe</h2>

                <p className="my-4 text-gray-600">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut qui hic atque tenetur quis
                  eius quos ea neque sunt, accusantium soluta minus veniam tempora deserunt? Molestiae eius
                  quidem quam repellat.
                </p>
                <small>Blueprint: 03a34ef7ed69fcbe47c8ae5e0eaf9a46b89eb21b28f71e06e7e39e3b4b46c0225b</small>
                <small>Author: 0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798</small>

                <div className="actions flex gap-8 h-full items-end">
                  <Button
                    className="flex-inline h-fit rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
                  >
                    Add Recipe
                  </Button>
                  <Button
                    className="flex-inline h-fit rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
                  >
                    Mint
                  </Button>
                </div>
              </div>
            </div>

            <div className="recipe-container flex gap-8 context-start flex-wrap">
              <div className="max-w-sm bg-stone-800 border border-none rounded-lg shadow text-white inline-flex flex-col p-16">
                Recipe 1
              </div>

              <div className="max-w-sm bg-stone-800 border border-none rounded-lg shadow text-white inline-flex flex-col p-16">
                Recipe 2
              </div>

              <div className="max-w-sm bg-stone-800 border border-none rounded-lg shadow text-white inline-flex flex-col p-16">
                Recipe 3
              </div>

              <div className="max-w-sm bg-stone-800 border border-none rounded-lg shadow text-white inline-flex flex-col p-16">
                Recipe 4
              </div>

              <div className="max-w-sm bg-stone-800 border border-none rounded-lg shadow text-white inline-flex flex-col p-16">
                Recipe 5
              </div>

              <div className="max-w-sm bg-stone-800 border border-none rounded-lg shadow text-white inline-flex flex-col p-16">
                Recipe 6
              </div>

              <div className="max-w-sm bg-stone-800 border border-none rounded-lg shadow text-white inline-flex flex-col p-16">
                Recipe 7
              </div>

              <div className="max-w-sm bg-stone-800 border border-none rounded-lg shadow text-white inline-flex flex-col p-16">
                Recipe 8
              </div>
            </div>
          </div>
        </section>)}
    </main>
  );
}