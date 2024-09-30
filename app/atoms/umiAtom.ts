import { atom } from 'jotai'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters'
import { mplCore } from '@metaplex-foundation/mpl-core'
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys'
import { useWallet } from '@solana/wallet-adapter-react'

export const umiAtom = atom(() => {
  const wallet = useWallet()
  const umi = createUmi('https://api.devnet.solana.com')
  umi.use(mplCore())
  umi.use(irysUploader({address: "https://devnet.irys.xyz"}))
  if (wallet) {
    umi.use(walletAdapterIdentity(wallet))
  }

  return umi
})
