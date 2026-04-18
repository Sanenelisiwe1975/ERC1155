"use client";

import { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { sepolia } from "@/lib/wagmi";
import { Wallet, ChevronDown, LogOut, AlertTriangle, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

function shortAddress(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export function WalletButton({ mobile = false }: { mobile?: boolean }) {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Must match server-rendered HTML — render neutral state until client hydrates
  useEffect(() => setMounted(true), []);

  const isWrongNetwork = isConnected && chain?.id !== sepolia.id;

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size={mobile ? "md" : "sm"}
        className={mobile ? "w-full flex items-center gap-2" : "hidden md:flex items-center gap-2"}
        disabled
        aria-label="Connect wallet"
      >
        <Wallet className="w-3.5 h-3.5" aria-hidden />
        Connect Wallet
      </Button>
    );
  }

  // ── Copy address ──────────────────────────────────────────
  function copyAddress() {
    if (!address) return;
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  // ── Wrong network banner ──────────────────────────────────
  if (isWrongNetwork) {
    return (
      <Button
        variant="destructive"
        size={mobile ? "md" : "sm"}
        className={mobile ? "w-full" : ""}
        onClick={() => switchChain({ chainId: sepolia.id })}
        aria-label="Wrong network — click to switch to Sepolia"
      >
        <AlertTriangle className="w-3.5 h-3.5" aria-hidden />
        Switch to Sepolia
      </Button>
    );
  }

  // ── Connected ─────────────────────────────────────────────
  if (isConnected && address) {
    return (
      <div className="relative">
        <Button
          variant="outline"
          size={mobile ? "md" : "sm"}
          className={[
            "items-center gap-2",
            mobile ? "w-full flex" : "hidden md:flex",
          ].join(" ")}
          onClick={() => setDropdownOpen((v) => !v)}
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
          aria-label="Wallet options"
        >
          {/* Green connected dot */}
          <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" aria-hidden />
          <span className="font-mono text-xs">{shortAddress(address)}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/25">
            Sepolia
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
            aria-hidden
          />
        </Button>

        {/* Dropdown */}
        <AnimatePresence>
          {dropdownOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setDropdownOpen(false)}
                aria-hidden
              />
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 top-full mt-2 w-56 z-50 glass-heavy rounded-xl border border-white/[0.08] shadow-2xl shadow-black/50 overflow-hidden"
                role="menu"
                aria-label="Wallet menu"
              >
                {/* Address row */}
                <div className="px-4 py-3 border-b border-white/[0.06]">
                  <p className="text-[11px] text-subtle mb-1">Connected wallet</p>
                  <p className="font-mono text-sm text-foreground truncate">{shortAddress(address)}</p>
                </div>

                {/* Copy address */}
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-muted hover:text-foreground hover:bg-white/[0.04] transition-colors"
                  onClick={copyAddress}
                  role="menuitem"
                >
                  {copied
                    ? <Check className="w-4 h-4 text-emerald-400" aria-hidden />
                    : <Copy className="w-4 h-4" aria-hidden />}
                  {copied ? "Copied!" : "Copy address"}
                </button>

                {/* Disconnect */}
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/[0.06] transition-colors"
                  onClick={() => { disconnect(); setDropdownOpen(false); }}
                  role="menuitem"
                >
                  <LogOut className="w-4 h-4" aria-hidden />
                  Disconnect
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ── Not connected ─────────────────────────────────────────
  const metamaskConnector = connectors.find((c) => c.name === "MetaMask") ?? connectors[0];

  return (
    <Button
      variant="outline"
      size={mobile ? "md" : "sm"}
      className={[
        "items-center gap-2",
        mobile ? "w-full flex" : "hidden md:flex",
      ].join(" ")}
      onClick={() => connect({ connector: metamaskConnector })}
      disabled={isPending}
      aria-label="Connect MetaMask wallet"
    >
      {isPending ? (
        <>
          <span className="w-3.5 h-3.5 rounded-full border-2 border-foreground/30 border-t-foreground animate-spin" aria-hidden />
          Connecting…
        </>
      ) : (
        <>
          <Wallet className="w-3.5 h-3.5" aria-hidden />
          Connect Wallet
        </>
      )}
    </Button>
  );
}
