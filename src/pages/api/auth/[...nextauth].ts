import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    })
  ],

  secret: process.env.AUTH_SECRET,

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'github' && user.id === process.env.GITHUB_MY_ID) {
        return true
      } else {
        return false
      }
    }
  }
}

export default NextAuth(authOptions)
