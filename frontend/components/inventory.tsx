"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { RefreshCw, PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getBalance } from "@/lib/api";
import { TOKENS } from "@/components/token-showcase";

function shortAddress(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

function formatBalance(raw: string, decimals = 0): string {
  if (decimals === 0) return Number(raw).toLocaleString();
  const divisor = BigInt(10) ** BigInt(decimals);
  const whole = BigInt(raw) / divisor;
  const frac = BigInt(raw) % divisor;
  if (frac === 0n) return whole.toLocaleString();
  const fracStr = frac.toString().padStart(decimals, "0").replace(/0+$/, "").slice(0, 4);
  return `${whole.toLocaleString()}.${fracStr}`;
}

export function Inventory() {
  const { address, isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { data: balances, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["balances", address],
    queryFn: () =>
      Promise.all(TOKENS.map((t) => getBalance(address!, t.id))).then((res) =>
        res.map((r) => r.balance)
      ),
    enabled: !!address && mounted,
    refetchInterval: 20_000,
    staleTime: 10_000,
  });

  if (!mounted || !isConnected) return null;

  const hasAny = balances?.some((b) => b !== "0");

  return (
    <section
      id="inventory"
      aria-label="Your inventory"
      className="relative py-20 lg:py-28"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="absolute inset-0 bg-surface/30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-gold font-medium mb-2">
              Wallet · {shortAddress(address!)}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              Your Inventory
            </h2>
            <p className="text-muted mt-1.5 text-sm">
              {hasAny ? "Items you currently own on Sepolia." : "You don't own any items yet — mint some below."}
            </p>
          </motion.div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            aria-label="Refresh balances"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`} aria-hidden />
            {isFetching ? "Refreshing…" : "Refresh"}
          </Button>
        </div>

        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {TOKENS.map((t) => (
              <div
                key={t.id}
                className="h-36 rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !hasAny && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-14 text-center"
          >
            <PackageOpen className="w-12 h-12 text-subtle mb-4" />
            <p className="text-muted text-sm">No items yet. Scroll down and mint your first one.</p>
          </motion.div>
        )}

        {/* Balance grid */}
        {!isLoading && balances && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {TOKENS.map((token, i) => {
              const balance = balances[i] ?? "0";
              const owned = balance !== "0";

              return (
                <motion.div
                  key={token.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className={[
                    "relative rounded-2xl border p-5 flex flex-col gap-4 transition-shadow duration-300",
                    owned
                      ? `${token.borderColor} shadow-md ${token.glowColor}`
                      : "border-white/[0.05] opacity-50",
                  ].join(" ")}
                >
                  {/* Token icon */}
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${token.gradientFrom} ${token.gradientVia} to-transparent border ${token.borderColor}`}
                  >
                    <token.Icon
                      className="w-5 h-5"
                      style={{ color: token.color }}
                      strokeWidth={1.6}
                    />
                  </div>

                  {/* Info */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <Badge
                        variant={
                          token.rarity === "Legendary" ? "legendary" : "common"
                        }
                      >
                        {token.rarity}
                      </Badge>
                    </div>
                    <p className="text-sm font-semibold text-foreground leading-snug">
                      {token.name}
                    </p>
                  </div>

                  {/* Balance */}
                  <div className="mt-auto">
                    <p className="text-[11px] uppercase tracking-wider text-subtle mb-0.5">
                      Balance
                    </p>
                    <p
                      className="text-lg font-bold tabular-nums break-all"
                      style={{ color: owned ? token.color : undefined }}
                    >
                      {formatBalance(balance, token.decimals)}
                    </p>
                  </div>

                  {/* Token ID chip */}
                  <span className="absolute top-3 right-3 font-mono text-[10px] text-subtle">
                    #{token.id}
                  </span>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
