"use client";

import { Dialog, Transition } from "@headlessui/react";
import { ShoppingBag, X } from "@phosphor-icons/react";
import LoadingDots from "components/loading-dots";
import Price from "components/price";
import { DEFAULT_OPTION } from "lib/constants";
import { createUrl } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { createCartAndSetCookie, redirectToCheckout } from "./actions";
import { useCart } from "./cart-context";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import OpenCart from "./open-cart";

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal() {
  const { cart, updateCartItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  useEffect(() => {
    if (
      cart?.totalQuantity &&
      cart?.totalQuantity !== quantityRef.current &&
      cart?.totalQuantity > 0
    ) {
      if (!isOpen) {
        setIsOpen(true);
      }
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef]);

  return (
    <>
      <button aria-label="Open cart" onClick={openCart} className="group">
        <OpenCart quantity={cart?.totalQuantity} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-[var(--color-ink)] shadow-2xl md:w-[420px]">
              <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-5">
                <div className="flex items-center gap-2">
                  <ShoppingBag
                    size={20}
                    className="text-[var(--color-forest)]"
                  />
                  <p className="text-lg font-semibold tracking-tight">
                    Your Cart
                  </p>
                </div>
                <button
                  aria-label="Close cart"
                  onClick={closeCart}
                  className="flex h-9 w-9 items-center justify-center   text-[var(--color-ink-muted)] transition-colors hover:bg-[var(--color-stone-dark)] hover:text-[var(--color-ink)]"
                >
                  <X size={20} />
                </button>
              </div>

              {!cart || cart.lines.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingBag
                    size={48}
                    className="text-[var(--color-ink-faint)]"
                  />
                  <p className="mt-4 text-center text-lg font-medium text-[var(--color-ink-muted)]">
                    Your cart is empty.
                  </p>
                  <button
                    onClick={closeCart}
                    className="mt-6   bg-[var(--color-forest)] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-[var(--color-forest-light)] active:scale-95"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-visible">
                  <ul className="grow overflow-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {cart.lines
                      .sort((a, b) =>
                        a.merchandise.product.title.localeCompare(
                          b.merchandise.product.title,
                        ),
                      )
                      .map((item, i) => {
                        const merchandiseSearchParams =
                          {} as MerchandiseSearchParams;

                        item.merchandise.selectedOptions.forEach(
                          ({ name, value }) => {
                            if (value !== DEFAULT_OPTION) {
                              merchandiseSearchParams[name.toLowerCase()] =
                                value;
                            }
                          },
                        );

                        const merchandiseUrl = createUrl(
                          `/product/${item.merchandise.product.handle}`,
                          new URLSearchParams(merchandiseSearchParams),
                        );

                        return (
                          <li
                            key={i}
                            className="flex w-full flex-col border-b border-[var(--color-border)] last:border-b-0"
                          >
                            <div className="relative flex w-full flex-row justify-between py-4">
                              <div className="flex flex-row flex-1">
                                <div className="relative h-20 w-20 flex-none">
                                  <div className="absolute -left-1.5 -top-1.5 z-10">
                                    <DeleteItemButton
                                      item={item}
                                      optimisticUpdate={updateCartItem}
                                    />
                                  </div>
                                  <div className="h-full w-full overflow-hidden   bg-[var(--color-stone)] border border-[var(--color-border)]">
                                    <Image
                                      className="h-full w-full object-cover"
                                      width={80}
                                      height={80}
                                      alt={
                                        item.merchandise.product.featuredImage
                                          .altText ||
                                        item.merchandise.product.title
                                      }
                                      src={
                                        item.merchandise.product.featuredImage
                                          .url
                                      }
                                    />
                                  </div>
                                </div>
                                <Link
                                  href={merchandiseUrl}
                                  onClick={closeCart}
                                  className="ml-4 flex flex-col flex-1"
                                >
                                  <span className="text-sm font-medium leading-snug text-[var(--color-ink)] hover:text-[var(--color-amber)] transition-colors line-clamp-2">
                                    {item.merchandise.product.title}
                                  </span>
                                  {item.merchandise.title !== DEFAULT_OPTION ? (
                                    <p className="mt-1 text-xs text-[var(--color-ink-faint)]">
                                      {item.merchandise.title}
                                    </p>
                                  ) : null}
                                </Link>
                              </div>
                              <div className="ml-4 flex flex-col items-end justify-between">
                                <Price
                                  className="text-sm font-semibold text-[var(--color-ink)]"
                                  amount={item.cost.totalAmount.amount}
                                  currencyCode={
                                    item.cost.totalAmount.currencyCode
                                  }
                                />
                                <div className="flex h-8 items-center   border border-[var(--color-border)] bg-[var(--color-stone)] px-1">
                                  <EditItemQuantityButton
                                    item={item}
                                    type="minus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                  <span className="w-6 text-center text-xs font-semibold">
                                    {item.quantity}
                                  </span>
                                  <EditItemQuantityButton
                                    item={item}
                                    type="plus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                  <div className="border-t border-[var(--color-border)] py-4 text-sm text-[var(--color-ink-muted)]">
                    <div className="mb-2.5 flex items-center justify-between">
                      <p className="text-xs uppercase tracking-wider">Taxes</p>
                      <Price
                        className="font-medium text-[var(--color-ink)]"
                        amount={cart.cost.totalTaxAmount.amount}
                        currencyCode={cart.cost.totalTaxAmount.currencyCode}
                      />
                    </div>
                    <div className="mb-2.5 flex items-center justify-between">
                      <p className="text-xs uppercase tracking-wider">
                        Shipping
                      </p>
                      <p className="text-xs text-[var(--color-ink-faint)]">
                        Calculated at checkout
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-[var(--color-border)] pt-4">
                      <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-ink)]">
                        Subtotal
                      </p>
                      <Price
                        className="text-base font-bold text-[var(--color-forest)]"
                        amount={cart.cost.totalAmount.amount}
                        currencyCode={cart.cost.totalAmount.currencyCode}
                      />
                    </div>
                  </div>
                  <form action={redirectToCheckout} className="pt-2">
                    <CheckoutButton />
                  </form>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

function CheckoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="block w-full   bg-[var(--color-forest)] py-3.5 text-center text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:bg-[var(--color-forest-light)] active:scale-[0.98] disabled:opacity-50"
      type="submit"
      disabled={pending}
    >
      {pending ? <LoadingDots className="bg-white" /> : "Proceed to Checkout"}
    </button>
  );
}
