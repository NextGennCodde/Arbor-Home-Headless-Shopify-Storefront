import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import { WelcomeToast } from "components/welcome-toast";
import { GeistSans } from "geist/font/sans";
import { getCart } from "lib/shopify";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";
import { baseUrl } from "lib/utils";

const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
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
    <html lang="en" className={GeistSans.variable}>
      <body className="bg-[var(--color-surface)] text-[var(--color-ink)] antialiased selection:bg-[var(--color-amber)] selection:text-white">
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
