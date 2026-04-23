"use client";

import { motion, type Transition } from "framer-motion";
import { ArrowRight, Coins, Sword, Shield, Crown, ChevronDown } from "lucide-react";
import { useAccount, useConnect } from "wagmi";
import { Button } from "@/components/ui/button";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const FLOATING_TOKENS = [
  {
    id: 0,
    name: "Gold",
    rarity: "Currency",
    Icon: Coins,
    color: "#f5c842",
    bg: "from-amber-500/25 to-amber-900/10",
    border: "border-amber-500/25",
    glow: "shadow-amber-500/20",
    delay: 0,
    offset: "top-[8%] right-[5%]",
    rotate: "rotate-[4deg]",
    animDelay: "0s",
  },
  {
    id: 1,
    name: "Sword",
    rarity: "Weapon",
    Icon: Sword,
    color: "#60a5fa",
    bg: "from-blue-500/25 to-blue-900/10",
    border: "border-blue-500/25",
    glow: "shadow-blue-500/20",
    delay: 0.15,
    offset: "top-[32%] right-[12%]",
    rotate: "rotate-[-2deg]",
    animDelay: "0.8s",
  },
  {
    id: 2,
    name: "Shield",
    rarity: "Armor",
    Icon: Shield,
    color: "#34d399",
    bg: "from-emerald-500/25 to-emerald-900/10",
    border: "border-emerald-500/25",
    glow: "shadow-emerald-500/20",
    delay: 0.3,
    offset: "top-[56%] right-[4%]",
    rotate: "rotate-[3deg]",
    animDelay: "1.6s",
  },
  {
    id: 3,
    name: "Legendary Helm",
    rarity: "Legendary",
    Icon: Crown,
    color: "#a78bfa",
    bg: "from-violet-500/30 to-violet-900/10",
    border: "border-violet-500/35",
    glow: "shadow-violet-500/30",
    delay: 0.45,
    offset: "top-[76%] right-[14%]",
    rotate: "rotate-[-4deg]",
    animDelay: "2.4s",
  },
];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: EASE } satisfies Transition,
  }),
};

export function Hero() {
  const { isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const metamaskConnector = connectors.find((c) => c.name === "MetaMask") ?? connectors[0];

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20"
      aria-label="Hero section"
    >
      {/* ── Background orbs ── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {/* Grid */}
        <div className="absolute inset-0 bg-grid opacity-100" />

        {/* Radial ambient glows */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-violet-600/[0.06] blur-[120px] animate-glow-pulse" />
        <div
          className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-amber-500/[0.07] blur-[100px] animate-glow-pulse"
          style={{ animationDelay: "1.2s" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/[0.05] blur-[110px] animate-glow-pulse"
          style={{ animationDelay: "2.1s" }}
        />

        {/* Top fade */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-background to-transparent" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* ── Main layout ── */}
      <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8 py-16 lg:py-24">

          {/* ── Left: Copy ── */}
          <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">

            {/* Eyebrow */}
            <motion.div
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/10 text-xs font-medium text-muted mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
              Live on Sepolia Testnet · ERC-1155
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={1}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
            >
              <span className="text-foreground">Forge</span>
              <br />
              <span className="text-gradient-gold">Your Legend</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              custom={2}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="text-lg text-muted leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10"
            >
              A multi-token gaming economy built on{" "}
              <span className="text-foreground font-medium">ERC-1155</span>.
              Trade Gold, wield legendary weapons, and collect rare armor — all
              owned on-chain, forever.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={3}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto shadow-xl shadow-gold/20"
                aria-label="Explore the item collection"
                onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}
              >
                Explore Collection
                <ArrowRight className="w-4 h-4" aria-hidden />
              </Button>
              {!isConnected && (
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  aria-label="Connect wallet"
                  onClick={() => connect({ connector: metamaskConnector })}
                  disabled={isPending}
                >
                  {isPending ? "Connecting…" : "Connect Wallet"}
                </Button>
              )}
              <a
                href="https://sepolia.etherscan.io/address/0x4fe1a696F3d826B9bcb7E616a81762c709DD5C47"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View smart contract on Etherscan"
              >
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  View Contract
                </Button>
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.div
              custom={4}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center justify-center lg:justify-start gap-6 mt-10"
            >
              {[
                { label: "Token Types", value: "4" },
                { label: "Items Minted", value: "10,510" },
                { label: "On-chain", value: "100%" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="text-2xl font-bold text-foreground tabular-nums">{stat.value}</p>
                  <p className="text-xs text-subtle mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Floating token cards ── */}
          <div
            className="relative hidden lg:block flex-shrink-0 w-[340px] h-[500px]"
            aria-hidden
          >
            {FLOATING_TOKENS.map((token, i) => (
              <motion.div
                key={token.id}
                initial={{ opacity: 0, x: 40, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 0.5 + token.delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`absolute ${token.offset} ${token.rotate}`}
                style={{
                  animation: `float ${3.5 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: token.animDelay,
                }}
              >
                <div
                  className={[
                    "w-44 glass rounded-2xl p-4 border",
                    token.border,
                    `shadow-xl ${token.glow}`,
                    token.id === 3 ? "legendary-shimmer" : "",
                  ].join(" ")}
                >
                  {/* Token icon */}
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${token.bg} flex items-center justify-center mb-3 border ${token.border}`}
                  >
                    <token.Icon
                      className="w-5 h-5"
                      style={{ color: token.color }}
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* Info */}
                  <p className="text-xs text-subtle font-medium mb-0.5">{token.rarity}</p>
                  <p className="text-sm font-semibold text-foreground">{token.name}</p>

                  {/* ID chip */}
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="text-xs font-mono text-subtle">#{token.id}</span>
                    <span
                      className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${token.color}18`,
                        color: token.color,
                        border: `1px solid ${token.color}30`,
                      }}
                    >
                      ERC-1155
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Central glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-32 h-32 rounded-full bg-legendary/10 blur-3xl animate-glow-pulse" />
            </div>
          </div>

        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-subtle"
        aria-hidden
      >
        <span className="text-[11px] tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
}
