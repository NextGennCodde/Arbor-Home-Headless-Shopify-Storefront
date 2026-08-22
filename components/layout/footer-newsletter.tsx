"use client";

export function FooterNewsletter() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // In a real app we would subscribe the user
        alert("Thank you for subscribing!");
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="email"
        required
        placeholder="your@email.com"
        className="w-full   border border-white/15 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[var(--color-amber)] focus:outline-none focus:ring-1 focus:ring-[var(--color-amber)]"
      />
      <button
        type="submit"
        className="w-full   bg-[var(--color-amber)] py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-85 active:scale-[0.98]"
      >
        Subscribe
      </button>
    </form>
  );
}
