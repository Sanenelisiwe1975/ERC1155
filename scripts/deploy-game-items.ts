/**
 * Standalone deploy script for GameItems (ERC-1155).
 *
 * Usage (local):
 *   npx hardhat run scripts/deploy-game-items.ts
 *
 * Usage (Sepolia):
 *   npx hardhat run scripts/deploy-game-items.ts --network sepolia
 */

import { network } from "hardhat";

const BASE_URI = process.env.BASE_URI ?? "http://localhost:5000/metadata/";

async function main() {
  const { viem } = await network.create();
  const [deployer] = await viem.getWalletClients();
  const publicClient = await viem.getPublicClient();

  console.log("─────────────────────────────────────────");
  console.log("Deploying GameItems (ERC-1155)");
  console.log("Network :", network.name);
  console.log("Deployer:", deployer.account.address);
  console.log("Base URI:", BASE_URI);
  console.log("─────────────────────────────────────────");

  const hash = await deployer.deployContract({
    abi: [
      {
        type: "constructor",
        inputs: [{ name: "_baseURI", type: "string" }],
        stateMutability: "nonpayable",
      },
    ],
    bytecode: await getBytecode(),
    args: [BASE_URI],
  });

  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  const address = receipt.contractAddress;

  if (!address) throw new Error("Deployment failed — no contract address in receipt");

  console.log("\n✅ GameItems deployed!");
  console.log("Contract address:", address);
  console.log("Transaction hash:", hash);
  console.log("\nNext steps:");
  console.log("  1. Copy the contract address into your .env → CONTRACT_ADDRESS");
  console.log("  2. Update BASE_URI in .env if deploying to production");
  console.log("  3. Verify on Etherscan (Sepolia):");
  console.log(`     npx hardhat verify --network sepolia ${address} "${BASE_URI}"`);
}

async function getBytecode(): Promise<`0x${string}`> {
  const { default: hre } = await import("hardhat");
  const artifact = await hre.artifacts.readArtifact("GameItems");
  return artifact.bytecode as `0x${string}`;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
