"use client";

import { motion } from "framer-motion";
import { PackageCheck, Layers2, Zap, Lock, Coins, Globe } from "lucide-react";

const FEATURES = [
  {
    Icon: Layers2,
    title: "Multi-Token Standard",
    description:
      "One contract manages fungible, semi-fungible, and non-fungible tokens simultaneously — no deployment sprawl.",
    color: "text-legendary",
    bg: "bg-legendary/10",
    border: "border-legendary/20",
  },
  {
    Icon: Zap,
    title: "Batch Operations",
    description:
      "Mint, transfer, or burn multiple token types in a single transaction. Dramatically lower gas costs for players.",
    color: "text-gold",
    bg: "bg-gold/10",
    border: "border-gold/20",
  },
  {
    Icon: PackageCheck,
    title: "OpenZeppelin Audited",
    description:
      "Built on battle-tested OpenZeppelin contracts. Ownable access control protects minting privileges.",
    color: "text-shield",
    bg: "bg-shield/10",
    border: "border-shield/20",
  },
  {
    Icon: Globe,
    title: "On-chain Metadata",
    description:
      "Each token resolves to a JSON metadata URI via the ERC-1155 URI standard — readable by any marketplace.",
    color: "text-sword",
    bg: "bg-sword/10",
    border: "border-sword/20",
  },
  {
    Icon: Coins,
    title: "Fungible + Rare",
    description:
      "GOLD is a fungible currency with 18 decimals, while Legendary Helm is capped at 10 — all in one contract.",
    color: "text-gold",
    bg: "bg-gold/10",
    border: "border-gold/20",
  },
  {
    Icon: Lock,
    title: "Owner-Gated Minting",
    description:
      "Only the contract owner can mint new tokens. Backend API secures the private key — no unauthorized inflation.",
    color: "text-shield",
    bg: "bg-shield/10",
    border: "border-shield/20",
  },
];

export function Features() {
  return (
    <section
      id="features"
      aria-label="Protocol features"
      className="relative py-24 lg:py-32"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        <div className="absolute inset-0 bg-surface/30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-gold font-medium mb-3">
            Why ERC-1155
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Built Different
          </h2>
          <p className="text-muted leading-relaxed">
            ERC-1155 is the gold standard for gaming economies — enabling
            fungible currency, rare collectibles, and semi-fungible gear in a
            single, gas-efficient contract.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.55,
                delay: i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -3 }}
              className={[
                "group p-6 rounded-2xl glass border transition-all duration-300",
                feature.border,
                "hover:border-opacity-40 hover:shadow-lg",
              ].join(" ")}
              aria-label={feature.title}
            >
              <div
                className={[
                  "inline-flex items-center justify-center w-10 h-10 rounded-xl mb-5",
                  "border transition-colors duration-200",
                  feature.bg,
                  feature.border,
                  "group-hover:scale-110",
                ].join(" ")}
                aria-hidden
                style={{ transition: "transform 0.2s ease" }}
              >
                <feature.Icon className={`w-5 h-5 ${feature.color}`} strokeWidth={1.8} />
              </div>

              <h3 className="text-base font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-subtle leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
