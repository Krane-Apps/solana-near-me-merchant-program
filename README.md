# Solana Near Me Merchant Program

**Solana Near Me** is the first Solana-native Seeker mobile app that helps you find Solana merchants and ATMs near you. Built 100% for the Solana ecosystem, with Solana Pay, Seeker Wallet, and token rewards baked in — it makes spending SOL in the real world as easy as opening your phone.

This is not a browser app. This is **Solana-first, Solana-only, and Solana-mobile-native**. 

**Problem We Solve**
Solana is fast, cheap, and scalable — but without local visibility, it's underused in the real world. Solana Near Me gives every Seeker holder a way to earn by turning the phone into both a wallet and a proof-of-location device. This is not Web2 Maps with pins — this is **on-chain local commerce**.

## What This Contract Does

The Solana Near Me Merchant Program is a smart contract that manages merchant registration, verification, and rewards system for local businesses accepting SOL payments. It enables:

- **Merchant Registration**: Businesses can register themselves on the platform
- **Location Verification**: Merchants can verify their physical location to gain trust
- **Transaction Tracking**: Count and reward successful transactions
- **Points & Rewards System**: Earn synthetic tokens for various activities
- **NFT Badges**: Special badges for verified merchants and OG status

## Point System & Rewards

The contract implements a comprehensive point-based reward system:

### Point Rewards
- **Registration Reward**: 100 points for signing up
- **Verification Reward**: 150 points for location verification
- **Transaction Reward**: 10 points per transaction
- **OG Badge Reward**: 500 points for achieving OG status

### NFT Badges
Merchants can earn exclusive NFT badges:

1. **Verification Badge**: 
   - Earned when a merchant verifies their location (lat/lon)
   - Shows customers this is a legitimate, verified business
   - Automatically awarded during registration if location is provided

2. **OG Badge**: 
   - Exclusive badge for early adopters and active merchants
   - Earned after completing 10 transactions
   - Includes a 500-point bonus reward
   - Represents established, trusted merchants in the ecosystem

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
