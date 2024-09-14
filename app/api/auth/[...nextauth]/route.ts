import { getSessionKeypair } from "@/utils/getSessionKeypair"
import { SigninMessage } from "@/utils/SigninMessage"
import { Keypair } from "@solana/web3.js"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { getCsrfToken } from "next-auth/react"
import bs58 from 'bs58'

const providers = [
  CredentialsProvider({
    name: "web3-auth",
    credentials: {
      signature: {
        label: "Signature",
        type: "text",
      },
      message: {
        label: "Message",
        type: "text",
      },
    },
    async authorize(credentials, req) {
      try {
        const parsedMessage = JSON.parse(credentials?.message || "{}")
        console.log("post-auth", parsedMessage, credentials)
        const signinMessage = new SigninMessage(
          parsedMessage
        )
        const nextAuthUrl = new URL(process.env.NEXTAUTH_URL || "")
        if (signinMessage.domain !== nextAuthUrl.host) {
          return null
        }

        const csrfToken = await getCsrfToken({ req: { ...req, body: null } })

        if (signinMessage.nonce !== csrfToken) {
          return null
        }

        const validationResult = await signinMessage.validate(
          credentials?.signature || ""
        )

        if (!validationResult)
          throw new Error("Could not validate the signed message")

        // const walletAddress = signinMessage.publicKey
        // const sessionKeypair =
        //   getSessionKeypair(walletAddress) ?? Keypair.generate()

        // // store sessionKeypair
        // // redundant? or
        // window.localStorage.setItem(
        //   `session_keypair_${walletAddress}`,
        //   bs58.encode(sessionKeypair.secretKey)
        // )

        return {
          id: signinMessage.publicKey,
        }
      } catch (e) {
        return null
      }
    },
  }),
]

const handler = NextAuth({
    providers,
    session: {
      strategy: "jwt",
    },
    callbacks: {
      async session({ session, token }) {
        if (session.user) {
          console.log("Im saving session!", token)
          session.user.name = token.sub;
          session.user.image = `https://ui-avatars.com/api/?name=${token.sub}&background=random`;
        }
        return session;
      },
    },
  })
export { handler as GET, handler as POST }
