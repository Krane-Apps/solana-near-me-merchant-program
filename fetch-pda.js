const { PublicKey } = require('@solana/web3.js');

async function fetchContractOwnerPDA() {
  try {
    // Program ID for the Solana Near Me Programs
    const programId = new PublicKey("GK7D1899kohN9dmtFrPybS2L3bpxpqYbTG2HP4eG6sM6");

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
    const programId = new PublicKey("GK7D1899kohN9dmtFrPybS2L3bpxpqYbTG2HP4eG6sM6");
    
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

async function fetchUserPDA(userWallet) {
  try {
    // Program ID for the Solana Near Me Programs
    const programId = new PublicKey("GK7D1899kohN9dmtFrPybS2L3bpxpqYbTG2HP4eG6sM6");
    
    // Convert user wallet to PublicKey if it's a string
    const user = typeof userWallet === 'string' 
      ? new PublicKey(userWallet) 
      : userWallet;

    // Derive the PDA for user
    const [userPDA, bump] = await PublicKey.findProgramAddress(
      [
        Buffer.from("user"),
        user.toBuffer()
      ],
      programId
    );

    console.log("User PDA Details:");
    console.log("Program ID:", programId.toString());
    console.log("User Wallet:", user.toString());
    console.log("User PDA:", userPDA.toString());
    console.log("Bump:", bump);
    
    return { userPDA, bump };
  } catch (error) {
    console.error("Error fetching user PDA:", error);
    throw error;
  }
}

// Execute the functions
if (require.main === module) {
  // Example merchant wallet address
  const merchantWallet = "26DbLxVUgQPmmwwFNpoWbeTuCT7jn8f19cFZeRtzNwyW";
  const userWallet = "26DbLxVUgQPmmwwFNpoWbeTuCT7jn8f19cFZeRtzNwyW";
  
  Promise.all([
    fetchContractOwnerPDA(),
    fetchMerchantPDA(merchantWallet),
    fetchUserPDA(userWallet)
  ])
    .then(([contractOwnerResult, merchantResult]) => {
      console.log("\n=== SUMMARY ===");
      console.log(`Contract Owner PDA: ${contractOwnerResult.contractOwnerPDA.toString()}`);
      console.log(`Contract Owner Bump: ${contractOwnerResult.bump}`);
      console.log(`Merchant PDA: ${merchantResult.merchantPDA.toString()}`);
      console.log(`Merchant Bump: ${merchantResult.bump}`);
      console.log(`User PDA: ${userResult.userPDA.toString()}`);
      console.log(`User Bump: ${userResult.bump}`);
    })
    .catch(console.error);
}

module.exports = { fetchContractOwnerPDA, fetchMerchantPDA, fetchUserPDA };