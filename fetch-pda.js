const { PublicKey } = require('@solana/web3.js');

async function fetchContractOwnerPDA() {
  try {
    // Program ID for the Solana Near Me Programs
    const programId = new PublicKey("G8Vy1ppsevujQDmQfif2PnUTDj6nMvcDoqqZsK9Qz3L");

    // Derive the PDA for contract owner
    const [contractOwnerPDA, bump] = await PublicKey.findProgramAddress(
      [Buffer.from("contract_owner")],
      programId
    );

    console.log("Contract Owner PDA Details:");
    console.log("Program ID:", programId.toString());
    console.log("Contract Owner PDA:", contractOwnerPDA.toString());
    console.log("Bump:", bump);
    
    return { contractOwnerPDA, bump };
  } catch (error) {
    console.error("Error fetching contract owner PDA:", error);
    throw error;
  }
}

async function fetchMerchantPDA(merchantWallet) {
  try {
    // Program ID for the Solana Near Me Programs
    const programId = new PublicKey("G8Vy1ppsevujQDmQfif2PnUTDj6nMvcDoqqZsK9Qz3L");
    
    // Convert merchant wallet to PublicKey if it's a string
    const merchant = typeof merchantWallet === 'string' 
      ? new PublicKey(merchantWallet) 
      : merchantWallet;

    // Derive the PDA for merchant
    const [merchantPDA, bump] = await PublicKey.findProgramAddress(
      [
        Buffer.from("merchant"),
        merchant.toBuffer()
      ],
      programId
    );

    console.log("Merchant PDA Details:");
    console.log("Program ID:", programId.toString());
    console.log("Merchant Wallet:", merchant.toString());
    console.log("Merchant PDA:", merchantPDA.toString());
    console.log("Bump:", bump);
    
    return { merchantPDA, bump };
  } catch (error) {
    console.error("Error fetching merchant PDA:", error);
    throw error;
  }
}

// Execute the functions
if (require.main === module) {
  // Example merchant wallet address
  const merchantWallet = "26DbLxVUgQPmmwwFNpoWbeTuCT7jn8f19cFZeRtzNwyW";
  
  Promise.all([
    fetchContractOwnerPDA(),
    fetchMerchantPDA(merchantWallet)
  ])
    .then(([contractOwnerResult, merchantResult]) => {
      console.log("\n=== SUMMARY ===");
      console.log(`Contract Owner PDA: ${contractOwnerResult.contractOwnerPDA.toString()}`);
      console.log(`Contract Owner Bump: ${contractOwnerResult.bump}`);
      console.log(`Merchant PDA: ${merchantResult.merchantPDA.toString()}`);
      console.log(`Merchant Bump: ${merchantResult.bump}`);
    })
    .catch(console.error);
}

module.exports = { fetchContractOwnerPDA, fetchMerchantPDA };