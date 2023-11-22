import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { AuthOptions } from "next-auth";
import axios from "axios";

export const dynamic = "force-dynamic";

export const authOptions: AuthOptions = {
  secret: "secret",

  pages: {
    signIn: "/signin",
    signOut: "/wallet",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      
      
      async authorize(credentials: any) {
        console.log(credentials,"credentials");
        if (credentials.password == null) return null;
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
          email:credentials.email,password:credentials.password
        });
        console.log(res.data, "res");

        if (res) {
          return res.data;
        }
        // If credentials are invalid, throw an error
        throw new Error("Invalid username or password");
      },
    }),
    GoogleProvider({
      clientId:
        "205061424218-08uogm1rqah0jsn9ulmbaqr3iskh7q4g.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account && account.provider === "google") {
        const { email, name, picture, username }: any = profile;
      }
      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.email = user.email;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.email = token.email;
      session.user.id = token.sub as string;

      return session;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as POST, handler as GET };
