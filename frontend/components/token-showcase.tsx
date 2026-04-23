"use client";

import { motion } from "framer-motion";
import { ArrowRight, Coins, Sword, Shield, Crown } from "lucide-react";
import { TokenCard, type TokenData } from "@/components/token-card";
import { Button } from "@/components/ui/button";

export const TOKENS: TokenData[] = [
  {
    id: 0,
    name: "Gold",
    description: "The primary in-game currency. Used to trade, upgrade equipment, and unlock new content.",
    rarity: "Common",
    type: "Currency",
    Icon: Coins,
    color: "#f5c842",
    gradientFrom: "from-amber-500/20",
    gradientVia: "via-amber-900/10",
    borderColor: "border-amber-500/20",
    glowColor: "hover:shadow-amber-500/10",
    supply: "10,000+",
    decimals: 18,
    attributes: [
      { label: "Type", value: "Fungible" },
      { label: "Decimals", value: "18" },
    ],
  },
  {
    id: 1,
    name: "Sword",
    description: "A finely crafted iron sword. Reliable in battle and favored by warriors across the kingdom.",
    rarity: "Common",
    type: "Weapon",
    Icon: Sword,
    color: "#60a5fa",
    gradientFrom: "from-blue-500/20",
    gradientVia: "via-blue-900/10",
    borderColor: "border-blue-500/20",
    glowColor: "hover:shadow-blue-500/10",
    supply: "500",
    attributes: [
      { label: "Damage", value: "45" },
      { label: "Speed", value: "Medium" },
    ],
  },
  {
    id: 2,
    name: "Shield",
    description: "A sturdy shield reinforced with iron bands. Blocks incoming attacks and protects the bearer.",
    rarity: "Common",
    type: "Armor",
    Icon: Shield,
    color: "#34d399",
    gradientFrom: "from-emerald-500/20",
    gradientVia: "via-emerald-900/10",
    borderColor: "border-emerald-500/20",
    glowColor: "hover:shadow-emerald-500/10",
    supply: "Unlimited",
    attributes: [
      { label: "Defense", value: "35" },
      { label: "Block", value: "25%" },
    ],
  },
  {
    id: 3,
    name: "Legendary Helm",
    description: "An ancient helmet forged by the greatest smiths of a lost civilization. Grants unmatched power.",
    rarity: "Legendary",
    type: "Armor",
    Icon: Crown,
    color: "#a78bfa",
    gradientFrom: "from-violet-500/25",
    gradientVia: "via-violet-900/10",
    borderColor: "border-violet-500/30",
    glowColor: "hover:shadow-violet-500/15",
    supply: "10 only",
    attributes: [
      { label: "Defense", value: "75" },
      { label: "INT Boost", value: "+20" },
    ],
  },
];

export function TokenShowcase() {
  return (
    <section
      id="collection"
      aria-label="Token collection showcase"
      className="relative py-24 lg:py-32"
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-legendary/[0.03] blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-gold font-medium mb-3">
              Token Registry
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              The Arsenal
            </h2>
            <p className="text-muted mt-2 max-w-md">
              Four unique token types — from abundant currency to ultra-rare
              legendary gear. All living on-chain.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button variant="outline" size="sm" aria-label="View full collection">
              View All Tokens
              <ArrowRight className="w-3.5 h-3.5" aria-hidden />
            </Button>
          </motion.div>
        </div>

        {/* ── Token grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {TOKENS.map((token, i) => (
            <TokenCard key={token.id} token={token} index={i} />
          ))}
        </div>

        {/* ── Bottom note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-xs text-subtle mt-10"
        >
          All tokens follow the{" "}
          <span className="font-mono text-muted">ERC-1155</span> multi-token
          standard · Contract verified on Etherscan
        </motion.p>
      </div>
    </section>
  );
}
