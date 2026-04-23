"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAccount, useConnect } from "wagmi";
import { X, Loader2, CheckCircle2, ExternalLink, Wallet, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mintToken } from "@/lib/api";
import type { TokenData } from "@/components/token-card";

const rarityBadgeVariant: Record<string, "common" | "legendary"> = {
  Common: "common",
  Legendary: "legendary",
};

const typeBadgeVariant: Record<string, "currency" | "weapon" | "armor"> = {
  Currency: "currency",
  Weapon: "weapon",
  Armor: "armor",
};

interface MintModalProps {
  token: TokenData;
  onClose: () => void;
}

export function MintModal({ token, onClose }: MintModalProps) {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const [amount, setAmount] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [txHash, setTxHash] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const metamaskConnector = connectors.find((c) => c.name === "MetaMask") ?? connectors[0];

  async function handleMint() {
    if (!address) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const result = await mintToken(address, token.id, amount);
      setTxHash(result.txHash);
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Mint failed");
      setStatus("error");
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#0d0d12] shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-white/40 hover:text-white/80 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Colour header */}
          <div
            className={`relative h-28 flex items-center justify-center bg-gradient-to-br ${token.gradientFrom} ${token.gradientVia} to-transparent`}
          >
            <div
              className="w-16 h-16 rounded-2xl border flex items-center justify-center bg-black/30 backdrop-blur-sm"
              style={{ borderColor: `${token.color}40` }}
            >
              <token.Icon className="w-8 h-8" style={{ color: token.color }} strokeWidth={1.6} />
            </div>
            <span className="absolute top-3 left-4 font-mono text-[11px] text-white/40">
              #{token.id}
            </span>
          </div>

          <div className="p-6">
            {/* Token info */}
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={rarityBadgeVariant[token.rarity]}>{token.rarity}</Badge>
              <Badge variant={typeBadgeVariant[token.type]}>{token.type}</Badge>
            </div>
            <h2 className="text-xl font-bold text-foreground mb-1">{token.name}</h2>
            <p className="text-sm text-subtle leading-relaxed mb-6">{token.description}</p>

            {/* ── Success state ── */}
            {status === "success" && (
              <div className="text-center py-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <p className="font-semibold text-foreground mb-1">Minted successfully!</p>
                <p className="text-sm text-subtle mb-5">
                  {amount} × {token.name} is now in your wallet
                </p>
                <a
                  href={`https://sepolia.etherscan.io/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  View on Etherscan <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <Button variant="outline" className="w-full mt-5" onClick={onClose}>
                  Done
                </Button>
              </div>
            )}

            {/* ── Not connected ── */}
            {status !== "success" && !isConnected && (
              <div className="text-center py-2">
                <p className="text-sm text-subtle mb-5">
                  Connect your wallet to mint this item
                </p>
                <Button
                  className="w-full"
                  onClick={() => connect({ connector: metamaskConnector })}
                  disabled={isConnecting}
                >
                  {isConnecting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Connecting…</>
                  ) : (
                    <><Wallet className="w-4 h-4" /> Connect Wallet</>
                  )}
                </Button>
              </div>
            )}

            {/* ── Connected — mint form ── */}
            {status !== "success" && isConnected && (
              <>
                {/* Amount selector */}
                <div className="mb-5">
                  <p className="text-xs uppercase tracking-wider text-subtle mb-2">Amount</p>
                  <div className="flex items-center gap-3">
                    <button
                      className="w-9 h-9 rounded-lg border border-white/10 text-foreground hover:bg-white/5 transition-colors text-xl font-medium flex items-center justify-center disabled:opacity-40"
                      onClick={() => setAmount((a) => Math.max(1, a - 1))}
                      disabled={amount <= 1 || status === "loading"}
                      aria-label="Decrease amount"
                    >
                      −
                    </button>
                    <span className="flex-1 text-center text-xl font-semibold text-foreground tabular-nums">
                      {amount}
                    </span>
                    <button
                      className="w-9 h-9 rounded-lg border border-white/10 text-foreground hover:bg-white/5 transition-colors text-xl font-medium flex items-center justify-center disabled:opacity-40"
                      onClick={() => setAmount((a) => a + 1)}
                      disabled={status === "loading"}
                      aria-label="Increase amount"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Error */}
                {status === "error" && errorMsg && (
                  <div className="flex items-start gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5 mb-4">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <Button
                  className="w-full"
                  onClick={handleMint}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Minting…</>
                  ) : (
                    `Mint ${amount} × ${token.name}`
                  )}
                </Button>

                <p className="text-xs text-subtle text-center mt-3">
                  Sending to{" "}
                  <span className="font-mono">
                    {address?.slice(0, 6)}…{address?.slice(-4)}
                  </span>
                </p>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
