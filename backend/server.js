const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { ethers } = require('ethers');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());

// Connect to blockchain
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Load contract ABI (you can copy the full ABI from artifacts after deployment)
const abi = [
  "function mint(address to, uint256 id, uint256 amount, bytes data) external",
  "function mintBatch(address to, uint256[] ids, uint256[] amounts, bytes data) external",
  "function balanceOf(address account, uint256 id) external view returns (uint256)",
  "function balanceOfBatch(address[] accounts, uint256[] ids) external view returns (uint256[])",
  "function uri(uint256 id) external view returns (string memory)"
];

const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet);


// Health check
app.get('/', (req, res) => {
  res.json({ message: "ERC1155 Backend is running ✅" });
});

// Serve metadata (two options below)

// Option A: Static metadata files (recommended for most cases)
app.get('/metadata/:id', (req, res) => {
  const tokenId = req.params.id;
  const filePath = `./metadata/${tokenId}.json`;

  res.sendFile(filePath, { root: __dirname }, (err) => {
    if (err) {
      res.status(404).json({ error: `Metadata for token ${tokenId} not found` });
    }
  });
});

// Option B: Dynamic metadata (if you want to generate JSON on the fly)
app.get('/metadata/dynamic/:id', async (req, res) => {
  const tokenId = parseInt(req.params.id);
  
  // Example: you can query on-chain data here if needed
  const metadata = {
    name: `Game Item #${tokenId}`,
    description: `This is a dynamic description for token ${tokenId}`,
    image: `https://yourdomain.com/images/${tokenId}.png`,
    attributes: [
      { trait_type: "Rarity", value: tokenId > 100 ? "Rare" : "Common" },
      { trait_type: "Level", value: Math.floor(Math.random() * 100) }
    ]
  };

  res.json(metadata);
});

// Mint single token (secured by backend private key)
app.post('/mint', async (req, res) => {
  const { to, id, amount } = req.body;

  if (!to || !id || !amount) {
    return res.status(400).json({ error: "Missing parameters: to, id, amount" });
  }

  try {
    const tx = await contract.mint(to, id, ethers.parseUnits(amount.toString(), 0), "0x");
    await tx.wait();

    res.json({
      success: true,
      txHash: tx.hash,
      message: `Minted ${amount} of token ${id} to ${to}`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Batch mint (very useful for ERC1155)
app.post('/mint-batch', async (req, res) => {
  const { to, ids, amounts } = req.body;

  if (!to || !ids || !amounts || !Array.isArray(ids) || !Array.isArray(amounts)) {
    return res.status(400).json({ error: "Missing or invalid parameters" });
  }

  try {
    const tx = await contract.mintBatch(to, ids, amounts, "0x");
    await tx.wait();

    res.json({
      success: true,
      txHash: tx.hash,
      message: `Batch minted to ${to}`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Get balance of a user for a specific token
app.get('/balance/:address/:id', async (req, res) => {
  const { address, id } = req.params;

  try {
    const balance = await contract.balanceOf(address, id);
    res.json({ address, tokenId: id, balance: balance.toString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 ERC1155 Backend running on http://localhost:${PORT}`);
});