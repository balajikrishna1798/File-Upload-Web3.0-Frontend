// pages/api/auth/[...nextauth].js

import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import type { AuthOptions } from "next-auth"

export const dynamic = 'force-dynamic'

export const authOptions: AuthOptions = {
    secret : "secret",
    
    pages:{
      signIn:"/signin",
      signOut:"/"
    },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials:any) {
        if(credentials.password==null) return null
        const res = await fetch("http://localhost:3001/auth/login", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        })

        const user = await res.json()
        if (user && res.ok) {
          return user;
        } 
        // If credentials are invalid, throw an error
        throw new Error("Invalid username or password");
      
      }
    }),
    GoogleProvider({
      clientId: "205061424218-08uogm1rqah0jsn9ulmbaqr3iskh7q4g.apps.googleusercontent.com",
      clientSecret: "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",
      
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      
        if (account&&account.provider === 'google') {
          const { email, name, picture,username }:any = profile;
         }
        return true;
      },
      async jwt( {token, user, account, profile}) {
    
        if (user) {
          token.email = user.email
          };
        
        return token;
      },
     
    async session({session, token}) {
      session.user.email = token.email;
      session.user.id = token.sub as string;;
      
      return session
    },
  },
}
const handler = NextAuth(authOptions)
export {handler as POST,handler as GET}
