"use client";

import { motion } from "framer-motion";
import { Wallet, ArrowRight, Swords } from "lucide-react";
import { useAccount, useConnect } from "wagmi";
import { Button } from "@/components/ui/button";

export function CallToAction() {
  const { isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const metamaskConnector = connectors.find((c) => c.name === "MetaMask") ?? connectors[0];

  return (
    <section
      aria-label="Call to action"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/20 to-background" />
        <div className="absolute inset-0 bg-grid opacity-50" />
        {/* Glow orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold/[0.06] blur-[100px] rounded-full animate-glow-pulse" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-legendary/[0.05] blur-[80px] rounded-full animate-glow-pulse"
          style={{ animationDelay: "1.3s" }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Icon */}
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-2xl shadow-amber-500/30 mb-8"
            aria-hidden
          >
            <Swords className="w-7 h-7 text-white" strokeWidth={2} />
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-5">
            Ready to{" "}
            <span className="text-gradient-gold">Start Playing?</span>
          </h2>

          <p className="text-lg text-muted leading-relaxed mb-10 max-w-xl mx-auto">
            Connect your wallet to check your inventory, mint new items, or
            transfer tokens to other players. Your items are yours — forever
            on-chain.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="xl"
              className="w-full sm:w-auto shadow-2xl shadow-gold/25"
              aria-label="Connect wallet to start"
            >
              <Wallet className="w-5 h-5" aria-hidden />
              Connect Wallet
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="w-full sm:w-auto"
              aria-label="View contract source code"
            >
              View Source
              <ArrowRight className="w-4 h-4" aria-hidden />
            </Button>
          </div>

          {/* Trust note */}
          <p className="mt-8 text-xs text-subtle">
            Non-custodial · No account required · ERC-1155 standard
          </p>
        </motion.div>
      </div>
    </section>
  );
}
