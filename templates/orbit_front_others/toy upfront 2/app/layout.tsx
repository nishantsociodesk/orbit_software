import type { Metadata } from "next";
import { Nunito, Fredoka } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartProvider } from "@/context/CartContext";
import { StoreProvider } from "@/context/StoreContext";
import { getStoreData } from "@/lib/storefront-api";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

// Generate metadata dynamically based on store data
export async function generateMetadata(): Promise<Metadata> {
  const storeData = await getStoreData();
  
  return {
    title: storeData?.customization?.metaTitle || storeData?.name || "Online Store",
    description: storeData?.customization?.metaDescription || "Welcome to our online store",
    keywords: storeData?.customization?.keywords || [],
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${nunito.variable} ${fredoka.variable} antialiased min-h-screen flex flex-col`}
      >
        <StoreProvider>
          <WishlistProvider>
            <CartProvider>
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </CartProvider>
          </WishlistProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
