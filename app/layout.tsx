import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import { WelcomeToast } from "components/welcome-toast";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { getCart } from "lib/shopify";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";
import { baseUrl } from "lib/utils";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME || "Arbor Home",
    template: `%s | ${SITE_NAME || "Arbor Home"}`,
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cart = getCart();

  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="bg-[var(--color-surface)] text-[var(--color-ink)] font-sans antialiased selection:bg-[var(--color-amber)] selection:text-white">
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main>{children}</main>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--color-forest)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.15)",
              },
            }}
            closeButton
          />
          <WelcomeToast />
        </CartProvider>
      </body>
    </html>
  );
}
