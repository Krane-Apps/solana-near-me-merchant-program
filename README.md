# Solana Near Me Merchant Program

**Solana Near Me** is the first Seeker mobile app that helps you find Solana merchants and ATMs near you. Built 100% for the Solana ecosystem, with Solana Pay, Seeker Wallet, and Token rewards and NFTs are integrated. It's **On-Chain Local Commerce** now possible with help of Solana Sekker Devices.

# Problem We Solve**
Solana is fast, cheap, and scalable — but without local visibility, it's underused in the real world. Solana Near Me gives every Seeker holder a way to earn by turning Seeker devices into merchant wallets and a proof-of-location device.

## What This Contract Does

The Solana Near Me Merchant Program manages Merchant Registration, Location Verification, and Token Reward System for local businesses accepting SOL payments.

### NFT Badges
Merchants can earn exclusive NFT badges:

| **Verified Merchants** | **OG Merchants** |
|------------------------|------------------|
| <img src="assets/verified-merchant.png" alt="Verified Merchant Badge" width="150"> | <img src="assets/og-merchant.png" alt="OG Merchant Badge" width="150"> |
| **Verified Location Badge** | **OG Merchants** |
| Legitimate businesses with confirmed locations | Legendary status merchants with high transactions and volume |

## Point System & Rewards

The contract implements a comprehensive point-based reward system:

### Point Rewards
- **Registration Reward**: 100 points for signing up
- **Verification Reward**: 150 points for location verification
- **Transaction Reward**: 10 points per transaction
- **OG Badge Reward**: 500 points for achieving OG status

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
