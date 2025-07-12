const fs = require('fs');
const path = require('path');

const imageUrl = "https://gateway.irys.xyz/F4nkrsrbfgu7QW9DRBecV7oVufZvNbHcfmxB3rowPECk?ext=png";
const numberOfNFTs = 20;
const outputDir = path.join(__dirname, 'assets');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

for (let i = 0; i < numberOfNFTs; i++) {
  const metadata = {
    name: `Verified Merchant #${i}`,
    symbol: "VMNFT",
    description: "Verified merchant in the Solana ecosystem.",
    seller_fee_basis_points: 0,
    image: imageUrl,
    attributes: [
      { trait_type: "Badge", value: "Verified" },
      { trait_type: "Type", value: "Merchant" },
      { trait_type: "ID", value: `#${i}` }
    ],
    properties: {
      files: [
        {
          uri: imageUrl,
          type: "image/png"
        }
      ],
      category: "image"
    }
  };

  fs.writeFileSync(
    path.join(outputDir, `${i}.json`),
    JSON.stringify(metadata, null, 2)
  );
}

console.log(`✅ Generated ${numberOfNFTs} NFT metadata files in ./assets/`);
