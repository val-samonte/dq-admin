import { SigninMessage } from "@/utils/SigninMessage"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { getCsrfToken } from "next-auth/react"
import { cookies } from "next/headers"

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

        return {
          id: signinMessage.publicKey,
        }
      } catch (e) {
        console.log("errr", e)
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
          cookies().set("walletAddress", `${token.sub}`, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7 * 1000,
            expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
          })
          session.user.name = token.sub;
          session.user.image = `https://ui-avatars.com/api/?name=${token.sub}&background=random`;
        }
        return session;
      },
    },
  })
export { handler as GET, handler as POST }
