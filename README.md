# Solana Near Me Merchant Program

**Solana Near Me** is the first Seeker mobile app that helps you find Solana merchants and ATMs near you. Built 100% for the Solana ecosystem, with Solana Pay, Seeker Wallets, Proof-of-Location, Token rewards and NFTs all integrated. It's an **On-Chain Local Commerce**; now possible on Solana Seeker Devices.

## What This Contract Does

The Solana Near Me Merchant Program manages Merchant Registration, Location Verification, and Token Reward System for local businesses accepting SOL payments.

**Check the Contract in Action on Solana Devnet**
🔍 **[View Live Contract on Solana Explorer](https://explorer.solana.com/address/G8Vy1ppsevujQDmQfif2PnUTDj6nMvcDoqqZsK9Qz3L?cluster=devnet)**

## NFT Badges
Merchants can earn exclusive NFT badges:

| **Verified Merchants** | **OG Merchants** |
|------------------------|------------------|
| <img src="assets/verified-merchant.png" alt="Verified Merchant Badge" width="150"> | <img src="assets/og-merchant.png" alt="OG Merchant Badge" width="150"> |
| Legitimate businesses with confirmed locations | Legendary status merchants with high transactions and volume |

## Token Rewards For App Activity

The contract implements a comprehensive Synthetic Token rewards that are redeemable when we launch on Mainnet:

- **Registration Reward**: 100 tokens for signing up
- **Verification Reward**: 150 tokens for location verification
- **Transaction Reward**: 10 tokens per transaction
- **OG Badge Reward**: 500 tokens for achieving OG status

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

### `initialize`
Initialize the contract with an owner account.

### `register_merchant`
Register a new merchant with location and metadata. If coordinates are provided, the merchant is automatically verified.

### `verify_merchant`
Verify an existing merchant's location and award verification badge.

### `increment_tx_count`
Increment transaction count for a merchant (only callable by contract owner). Awards OG badge after 10 transactions.

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
