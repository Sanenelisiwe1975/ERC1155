const path    = require('path');
const express = require('express');
const cors    = require('cors');
const helmet  = require('helmet');
const morgan  = require('morgan');
const { ethers } = require('ethers');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(express.json());

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc:  ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc:   ["'self'", "'unsafe-inline'"],
        imgSrc:     ["'self'", "data:", "https://ipfs.io", "https://gateway.pinata.cloud"],
        connectSrc: ["'self'", "https:", "wss:"],
      },
    },
  })
);

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const rawKey    = process.env.PRIVATE_KEY || '';
const privateKey = rawKey.startsWith('0x') ? rawKey : `0x${rawKey}`;
const wallet    = new ethers.Wallet(privateKey, provider);

const abi = [
  "function mint(address to, uint256 id, uint256 amount, bytes data) external",
  "function mintBatch(address to, uint256[] ids, uint256[] amounts, bytes data) external",
  "function balanceOf(address account, uint256 id) external view returns (uint256)",
  "function balanceOfBatch(address[] accounts, uint256[] ids) external view returns (uint256[])",
  "function uri(uint256 id) external view returns (string memory)",
];

const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet);

app.get('/api', (req, res) => {
  res.json({ message: 'ERC1155 API is running ✅', contract: process.env.CONTRACT_ADDRESS });
});

app.get('/api/metadata/:id', (req, res) => {
  const tokenId = parseInt(req.params.id, 10);
  if (isNaN(tokenId) || tokenId < 0) return res.status(400).json({ error: 'Invalid token ID' });

  res.sendFile(`metadata/${tokenId}.json`, { root: __dirname }, (err) => {
    if (err) res.status(404).json({ error: `Metadata for token ${tokenId} not found` });
  });
});

app.get('/api/images/:id', (req, res) => {
  const tokenId = parseInt(req.params.id, 10);
  if (isNaN(tokenId) || tokenId < 0) return res.status(400).json({ error: 'Invalid token ID' });

  res.sendFile(`metadata/images/${tokenId}.jpg`, { root: __dirname }, (err) => {
    if (err) res.status(404).json({ error: `Image for token ${tokenId} not found` });
  });
});

app.post('/api/mint', async (req, res) => {
  const { to, id, amount } = req.body;
  if (!to || id === undefined || !amount) {
    return res.status(400).json({ error: 'Missing parameters: to, id, amount' });
  }
  try {
    const tx = await contract.mint(to, id, ethers.parseUnits(amount.toString(), 0), '0x');
    await tx.wait();
    res.json({ success: true, txHash: tx.hash, message: `Minted ${amount} of token ${id} to ${to}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/mint-batch', async (req, res) => {
  const { to, ids, amounts } = req.body;
  if (!to || !Array.isArray(ids) || !Array.isArray(amounts)) {
    return res.status(400).json({ error: 'Missing or invalid parameters' });
  }
  try {
    const tx = await contract.mintBatch(to, ids, amounts, '0x');
    await tx.wait();
    res.json({ success: true, txHash: tx.hash, message: `Batch minted to ${to}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/balance/:address/:id', async (req, res) => {
  const { address, id } = req.params;
  try {
    const balance = await contract.balanceOf(address, id);
    res.json({ address, tokenId: id, balance: balance.toString() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const FRONTEND = path.join(__dirname, '../frontend/out');
app.use(express.static(FRONTEND));

app.get('/{*splat}', (_req, res) => {
  res.sendFile(path.join(FRONTEND, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`   Frontend  → http://localhost:${PORT}`);
  console.log(`   API       → http://localhost:${PORT}/api`);
});
