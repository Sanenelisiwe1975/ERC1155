"use client";

import { motion } from "framer-motion";
import { Layers, Coins, Zap, ShieldCheck } from "lucide-react";

const STATS = [
  { Icon: Layers,     value: "4",        label: "Token Types",     color: "text-legendary" },
  { Icon: Coins,      value: "10,510",   label: "Items Minted",    color: "text-gold"      },
  { Icon: Zap,        value: "Instant",  label: "Batch Transfers", color: "text-sword"     },
  { Icon: ShieldCheck,value: "OpenZeppelin", label: "Audited Base", color: "text-shield"   },
];

export function StatsBar() {
  return (
    <section aria-label="Key stats" className="relative py-0">
      {/* Top/bottom separators */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden />

      <div className="glass border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-center gap-3 px-6 py-5"
              >
                <div className={`flex-shrink-0 p-2 rounded-lg bg-white/[0.04] ${stat.color}`}>
                  <stat.Icon className="w-4 h-4" aria-hidden />
                </div>
                <div>
                  <p className="text-base font-bold text-foreground tabular-nums leading-none">
                    {stat.value}
                  </p>
                  <p className="text-xs text-subtle mt-1 leading-none">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
