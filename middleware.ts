import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

async function getSessionToken(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET

  // Extract the token (session) from the request
  const token = await getToken({ req, secret })
  return token
}

export async function middleware(request: NextRequest) {

  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  // const cookie = request.cookies.get('walletAddress')
  const token = await getSessionToken(request)
  if (token) {
    // User is authenticated, access session data here
    const walletAddress = token.sub // Wallet PubKey (from NextAuth token)
    const { pathname } = request.nextUrl
    if (walletAddress && pathname == "/") {
      console.log('DO REDIRECT', pathname, `/${walletAddress}/blueprints`)
      return NextResponse.redirect(new URL(`/${walletAddress}/blueprints`, request.url));
    }
  }

  return NextResponse.next()
}