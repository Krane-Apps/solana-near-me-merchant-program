# Solana Near Me Merchant Program

**Solana Near Me** is the first Seeker mobile app that helps you find Solana merchants and ATMs near you. Built 100% for the Solana ecosystem, with Solana Pay, Seeker Wallets, Proof-of-Location, Token rewards and NFTs all integrated. It's an **On-Chain Local Commerce**; now possible on Solana Seeker Devices.

## What This Contract Does

The Solana Near Me Merchant Program manages Merchant Registration, Location Verification, NFT and Token Rewards for local businesses accepting SOL payments.

**View Live Contract on Solana Devnet**
🔍 **[GK7D1899kohN9dmtFrPybS2L3bpxpqYbTG2HP4eG6sM6](https://explorer.solana.com/address/GK7D1899kohN9dmtFrPybS2L3bpxpqYbTG2HP4eG6sM6?cluster=devnet)**

## NFT Rewards
Merchants can earn exclusive NFT badges:

| **Verified Merchants** | **OG Merchants** |
|------------------------|------------------|
| <img src="assets/verified-merchant.png" alt="Verified Merchant Badge" width="150"> | <img src="assets/og-merchant.png" alt="OG Merchant Badge" width="150"> |
| Legitimate businesses with confirmed locations | Legendary status merchants with high transactions and volume |


## Token Rewards For App Activity

The contract implements a comprehensive Synthetic Token rewards that are redeemable when we launch on Mainnet:

### Merchant Rewards
- **Registration Reward**: 100 tokens for signing up
- **Verification Reward**: 150 tokens for location verification
- **Transaction Reward**: 100 tokens per transaction
- **OG Badge Reward**: 500 tokens for achieving OG status

### User Rewards
- **User Registration Reward**: 100 tokens for signing up
- **User Transaction Reward**: 100 tokens per transaction made

## Setup & Installation

### Prerequisites
- [Rust](https://rustup.rs/) installed
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools) installed
- [Anchor Framework](https://www.anchor-lang.com/docs/installation) installed
- [Node.js](https://nodejs.org/) for testing

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd solana-near-me-merchant-program
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the program**
   ```bash
   anchor build
   ```

4. **Configure Solana CLI**
   ```bash
   solana config set --url devnet
   solana-keygen new --outfile ~/.config/solana/id.json
   ```

5. **Deploy to devnet**
   ```bash
   anchor deploy
   ```

## Running Tests

Run the test suite to ensure everything works correctly:

```bash
anchor test
```

## Program Functions

### Core Functions

#### `initialize`
Initialize the contract with an owner account. This sets up the contract owner who has special privileges.

#### `register_merchant`
Register a new merchant with location coordinates and metadata URI. If coordinates are provided (non-zero), the merchant is automatically verified and receives both registration and verification rewards.

#### `register_user`
Register a new user account in the system. Users receive registration rewards and can earn transaction rewards.

#### `verify_merchant`
Verify an existing merchant's location by updating their coordinates. This function can only be called on unverified merchants and awards verification rewards.

#### `increment_tx_count`
Increment transaction count for both merchant and user accounts (only callable by contract owner). This function:
- Rewards both merchant and user with transaction tokens
- Automatically awards OG badge to merchants after 10 transactions
- Includes bonus OG badge reward for qualifying merchants

#### `update_merchant_nft_status`
Update NFT minting status for merchants (only callable by contract owner). This tracks whether merchants have minted their verification and/or OG NFTs.

## Program ID

The deployed program ID will be displayed after running `anchor deploy`. Update your client applications to use this program ID.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## License

This project is licensed under the MIT License.
