"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swords, Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WalletButton } from "@/components/wallet-button";

const NAV_LINKS = [
  { label: "Collection", href: "#collection" },
  { label: "Mint", href: "#mint" },
  { label: "Features", href: "#features" },
  { label: "Docs", href: "#" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={[
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "glass-heavy shadow-2xl shadow-black/50 border-b border-white/[0.06]"
            : "bg-transparent",
        ].join(" ")}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">

            {/* ── Logo ── */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group outline-none"
              aria-label="GameItems home"
            >
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/30 group-hover:shadow-amber-500/50 transition-shadow duration-200">
                <Swords className="w-4 h-4 text-white" strokeWidth={2.5} aria-hidden />
              </div>
              <span className="text-[15px] font-semibold tracking-tight text-foreground">
                Game<span className="text-gradient-gold">Items</span>
              </span>
            </Link>

            {/* ── Desktop nav ── */}
            <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-3.5 py-2 text-sm text-muted hover:text-foreground rounded-lg hover:bg-white/[0.05] transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-legendary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* ── Actions ── */}
            <div className="flex items-center gap-2.5">
              {/* Desktop wallet button */}
              <WalletButton />

              {/* Mobile hamburger */}
              <Button
                variant="ghost"
                size="icon-sm"
                className="md:hidden"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen
                  ? <X className="w-5 h-5" aria-hidden />
                  : <Menu className="w-5 h-5" aria-hidden />}
              </Button>
            </div>

          </div>
        </div>
      </motion.header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-0 top-16 z-40 glass-heavy border-b border-white/[0.06] px-4 py-3 md:hidden"
            role="dialog"
            aria-label="Navigation menu"
          >
            <nav className="flex flex-col gap-0.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-4 py-3 text-sm text-muted hover:text-foreground rounded-xl hover:bg-white/[0.05] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 mt-1 border-t border-white/[0.06]">
                <WalletButton mobile />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
