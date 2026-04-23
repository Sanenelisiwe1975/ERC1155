"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Sparkles, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MintModal } from "@/components/mint-modal";
import { cn } from "@/lib/utils";

export interface TokenData {
  id: number;
  name: string;
  description: string;
  rarity: "Common" | "Legendary";
  type: "Currency" | "Weapon" | "Armor";
  Icon: LucideIcon;
  color: string;
  gradientFrom: string;
  gradientVia: string;
  borderColor: string;
  glowColor: string;
  supply: string;
  decimals?: number;
  attributes: { label: string; value: string }[];
}

interface TokenCardProps {
  token: TokenData;
  index: number;
}

const rarityBadgeVariant: Record<string, "common" | "legendary"> = {
  Common: "common",
  Legendary: "legendary",
};

const typeBadgeVariant: Record<string, "currency" | "weapon" | "armor"> = {
  Currency: "currency",
  Weapon: "weapon",
  Armor: "armor",
};

export function TokenCard({ token, index }: TokenCardProps) {
  const isLegendary = token.rarity === "Legendary";
  const [mintOpen, setMintOpen] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6, scale: 1.015 }}
      className={cn(
        "group relative rounded-2xl border overflow-hidden cursor-pointer",
        "transition-shadow duration-300",
        token.borderColor,
        isLegendary
          ? "shadow-lg shadow-violet-500/15 hover:shadow-2xl hover:shadow-violet-500/25"
          : "shadow-md hover:shadow-xl",
        token.glowColor,
      )}
      aria-label={`${token.name} — ${token.rarity} ${token.type}`}
      tabIndex={0}
    >

      {/* ── Legendary outer ring ── */}
      {isLegendary && (
        <div
          className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-violet-500/40 via-amber-500/20 to-violet-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
          aria-hidden
        />
      )}

      {/* ── Top visual area ── */}
      <div
        className={cn(
          "relative flex items-center justify-center h-44 overflow-hidden",
          `bg-gradient-to-br ${token.gradientFrom} ${token.gradientVia} to-transparent`,
          isLegendary && "legendary-shimmer"
        )}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />

        {/* Glow halo */}
        <div
          className="absolute w-28 h-28 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 animate-glow-pulse"
          style={{ backgroundColor: token.color }}
          aria-hidden
        />

        {/* Rotating ring for legendary */}
        {isLegendary && (
          <div
            className="absolute w-32 h-32 rounded-full border-2 border-dashed border-violet-500/20 animate-rotate-ring"
            aria-hidden
          />
        )}

        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: isLegendary ? 5 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={cn(
            "relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center",
            "border shadow-lg",
            `bg-gradient-to-br ${token.gradientFrom} ${token.gradientVia} to-card`,
            token.borderColor
          )}
          aria-hidden
        >
          <token.Icon
            className="w-8 h-8"
            style={{ color: token.color }}
            strokeWidth={1.6}
          />
        </motion.div>

        {/* Token ID chip */}
        <div className="absolute top-3 right-3 font-mono text-[11px] text-subtle bg-black/30 rounded-lg px-2 py-1">
          #{token.id}
        </div>

        {/* Supply pill */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/40 rounded-full px-2.5 py-1 text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden />
          <span className="text-foreground/70">{token.supply} supply</span>
        </div>
      </div>

      {/* ── Content area ── */}
      <div className="p-5 bg-card/80">
        {/* Badges */}
        <div className="flex items-center gap-2 mb-3">
          <Badge variant={rarityBadgeVariant[token.rarity]}>{token.rarity}</Badge>
          <Badge variant={typeBadgeVariant[token.type]}>{token.type}</Badge>
        </div>

        {/* Name + description */}
        <h3 className="text-base font-semibold text-foreground leading-snug mb-1">
          {token.name}
        </h3>
        <p className="text-sm text-subtle leading-relaxed line-clamp-2 mb-4">
          {token.description}
        </p>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-white/[0.06] via-white/[0.1] to-white/[0.06] mb-4" aria-hidden />

        {/* Attributes grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {token.attributes.map((attr) => (
            <div
              key={attr.label}
              className="bg-white/[0.03] rounded-lg px-3 py-2 border border-white/[0.05]"
            >
              <p className="text-[10px] uppercase tracking-wider text-subtle mb-0.5">
                {attr.label}
              </p>
              <p className="text-sm font-semibold text-foreground tabular-nums">
                {attr.value}
              </p>
            </div>
          ))}
        </div>

        {/* Mint button */}
        <Button
          className="w-full"
          variant={isLegendary ? "legendary" : "default"}
          onClick={(e) => { e.stopPropagation(); setMintOpen(true); }}
          aria-label={`Mint ${token.name}`}
        >
          <Sparkles className="w-3.5 h-3.5" aria-hidden />
          Mint {token.name}
        </Button>
      </div>

      {mintOpen && createPortal(
        <MintModal token={token} onClose={() => setMintOpen(false)} />,
        document.body
      )}
    </motion.article>
  );
}
