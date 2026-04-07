import type { Metadata, Viewport } from "next"; // أضفنا Viewport
import { Exo } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react"; // سنحتاج لتغليفها
import  Providers  from "@/components/Providers/Providers";
import Footer from "@/components/Footer/Footer";
import TopBar from "@/components/TopBar/TopBar";

const inter = Exo({ subsets: ['latin'], variable: '--font-exo' });


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Fresh Cart",
  description: "E-commerce store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)} suppressHydrationWarning>
      <body className="antialiased">
      
        <Providers>
          <TopBar/>
          <Navbar />
          <Toaster position="top-right" />
          {children}
          <Footer/>
        </Providers>
       
         
      </body>
    </html>
  );
}