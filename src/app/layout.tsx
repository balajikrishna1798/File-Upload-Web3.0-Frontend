import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./context/client-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Header from "@/components/Header";
import { ReduxProvider } from "./context/ReduxToolkitProvider";

const inter = Inter({ subsets: ["latin"] });
export const metadata:Metadata = {
  title: "Inov",
  description: "Inov Web 3.0 file transfering",
};
export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
      <ReduxProvider>
        <Provider session={session}>
        
          {children}
         
          </Provider>
          </ReduxProvider>
      </body>
    </html>
  );
}
