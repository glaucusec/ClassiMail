import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import { GoogleOAuthProvider } from "@react-oauth/google";
import MainContextProvider from "@/context/MainContext";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "ClassiMail",
  description:
    "Streamline your inbox with precision - Let AI categorize your emails effortlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const CLIENT_ID =
    process.env.CLIENT_ID == undefined ? "" : process.env.CLIENT_ID;

  return (
    <html lang="en" className="">
      <MainContextProvider>
        <body className={`${inter.className}`}>
          <div className="h-full container mx-auto max-w-4xl">
            <GoogleOAuthProvider clientId={CLIENT_ID}>
              {children}
            </GoogleOAuthProvider>
            <Toaster
              position="bottom-center"
              closeButton={true}
              richColors={true}
            />
          </div>
        </body>
      </MainContextProvider>
    </html>
  );
}
