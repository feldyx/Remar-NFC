
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from '../../../lib/prisma'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXT_AUTH_SECRET } from "../../../util/keys"

export default async function auth(req, res) {

  return await NextAuth(req, res, {
    adapter: PrismaAdapter(prisma),

    session: {
      strategy: "jwt",
      //maxAge: 3000,
    },

    providers: [
      CredentialsProvider({

        name: "Credentials",


        async authorize(credentials, req) {


          const response = await fetch(`https://remar360.vercel.app/api/auth/check-credentials`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            })
          });

          const res1 = await response.json()

          if (res1.status == 200 ){
            return res1.user
          }
          else{
            return null
          }

        }
      }),

      GoogleProvider({
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET
      }),
    ],
    secret: NEXT_AUTH_SECRET,
    pages: {
      signIn: '/auth/login',
      newUser: '/auth/new-user'
    },
    // debug: true,
    callbacks: {
      async session({ session, token }) {

        session.user = token.user;
        return session;
      },
      async jwt({ token, user }) {

        if (user) {
          token.user = user;
        }
        return token;
      },
    },

  })
}

