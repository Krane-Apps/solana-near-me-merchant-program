const fs = require('fs');

const baseJson = {
  name: "OG Merchant #0",
  symbol: "OGMNFT",
  description: "OG merchant in the Solana ecosystem.",
  seller_fee_basis_points: 0,
  image: "0.png",
  attributes: [
    { trait_type: "Badge", value: "Verified" },
    { trait_type: "Type", value: "Merchant" },
    { trait_type: "ID", value: "#0" }
  ],
  properties: {
    files: [
      { uri: "0.png", type: "image/png" }
    ],
    category: "image"
  }
};

for (let i = 0; i < 20; i++) {
  const json = { ...baseJson };

  json.name = `OG Merchant #${i}`;
  json.image = `${i}.png`;
  json.attributes[2].value = `#${i}`;
  json.properties.files[0].uri = `${i}.png`;

  fs.writeFileSync(`${i}.json`, JSON.stringify(json, null, 2));
  console.log(`Created ${i}.json`);
}
