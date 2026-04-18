import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// Base URI for token metadata.
// - Local dev:  "http://localhost:5000/metadata/"
// - Production: "https://yourdomain.com/metadata/"
// Each token resolves to: {BASE_URI}{tokenId}.json  (e.g. .../metadata/0.json)
const BASE_URI = process.env.BASE_URI ?? "http://localhost:5000/metadata/";

export default buildModule("GameItemsModule", (m) => {
  const baseURI = m.getParameter("baseURI", BASE_URI);

  const gameItems = m.contract("GameItems", [baseURI]);

  return { gameItems };
});
