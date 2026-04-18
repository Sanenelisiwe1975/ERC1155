import { Swords, Github, ExternalLink } from "lucide-react";
import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

const LINKS: Record<string, FooterLink[]> = {
  Protocol: [
    { label: "Collection", href: "#collection" },
    { label: "Mint", href: "#mint" },
    { label: "Contract", href: "#" },
    { label: "Metadata", href: "#" },
  ],
  Developers: [
    { label: "GitHub", href: "#", external: true },
    { label: "Hardhat Docs", href: "#", external: true },
    { label: "OpenZeppelin", href: "#", external: true },
    { label: "ERC-1155 Spec", href: "#", external: true },
  ],
  Community: [
    { label: "Discord", href: "#" },
    { label: "Twitter", href: "#" },
    { label: "Etherscan", href: "#", external: true },
  ],
};

export function Footer() {
  return (
    <footer
      className="relative mt-auto border-t border-white/[0.06]"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/20">
                <Swords className="w-4 h-4 text-white" strokeWidth={2.5} aria-hidden />
              </div>
              <span className="text-[15px] font-semibold text-foreground">
                Game<span className="text-gradient-gold">Items</span>
              </span>
            </div>
            <p className="text-sm text-subtle leading-relaxed max-w-[200px]">
              A multi-token gaming economy built on the ERC-1155 standard.
            </p>

            {/* Contract address */}
            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-subtle hover:text-muted transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" aria-hidden />
              <span>0x4f3c…8a2d</span>
              <ExternalLink className="w-3 h-3" aria-hidden />
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(LINKS).map(([group, links]) => (
            <div key={group}>
              <p className="text-xs uppercase tracking-[0.15em] text-subtle font-medium mb-4">
                {group}
              </p>
              <ul className="flex flex-col gap-2.5" role="list">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors group outline-none focus-visible:ring-2 focus-visible:ring-legendary rounded"
                      {...(link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.label}
                      {link.external && (
                        <ExternalLink
                          className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity"
                          aria-label="(opens in new tab)"
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-14 pt-6 border-t border-white/[0.06]">
          <p className="text-xs text-subtle">
            © {new Date().getFullYear()} GameItems · ERC-1155 Multi-Token Contract
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-subtle hover:text-muted transition-colors"
              aria-label="GitHub repository"
            >
              <Github className="w-4 h-4" aria-hidden />
            </a>
            <span className="text-xs text-subtle font-mono">
              Hardhat 3 · Solidity ^0.8.20
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
