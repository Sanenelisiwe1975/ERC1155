import { createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [sepolia],
  connectors: [
    injected(), // catches MetaMask, Rabby, Coinbase Wallet — any EIP-1193 injected provider
  ],
  transports: {
    [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL),
  },
});

// Re-export for convenience
export { sepolia };
