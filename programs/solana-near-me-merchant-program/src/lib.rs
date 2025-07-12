const REGISTRATION_REWARD: u64 = 100;
const VERIFICATION_REWARD: u64 = 150;
const OG_BADGE_REWARD: u64 = 500;
const OG_BADGE_TX_THRESHOLD: u64 = 10;
const TX_REWARD: u64 = 10;
use anchor_lang::prelude::*;

// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("G8Vy1ppsevujQDmQfif2PnUTDj6nMvcDoqqZsK9Qz3L");

#[event]
pub struct MerchantRegistered {
    pub owner: Pubkey,
    pub lat: f64,
    pub lon: f64,
    pub metadata_uri: String,
    pub og_badge_minted: bool,
    pub verified_badge_minted: bool,
    pub tx_count: u64,
    pub points: u64,
}

#[event]
pub struct MerchantVerified {
    pub owner: Pubkey,
    pub lat: f64,
    pub lon: f64,
    pub verified_badge_minted: bool,
    pub points: u64,
}

#[event]
pub struct TxCountIncremented {
    pub owner: Pubkey,
    pub tx_count: u64,
    pub points: u64,
}

#[event]
pub struct OgBadgeAwarded {
    pub owner: Pubkey,
}

#[account]
pub struct MerchantAccount {
    pub owner: Pubkey,
    pub lat: f64,
    pub lon: f64,
    pub metadata_uri: String,
    pub og_badge_minted: bool,
    pub verified_badge_minted: bool,
    pub tx_count: u64,
    pub points: u64,
}

#[account]
pub struct ContractOwner {
    pub owner: Pubkey,
}

#[program]
pub mod solana_near_me_merchant_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let contract_owner_account = &mut ctx.accounts.contract_owner_account;
        contract_owner_account.owner = ctx.accounts.owner_signer.key();
        Ok(())
    }

    /**
     * Register a merchant
     * If lat and lon are provided, the merchant is verified immediately.
     * Synthetic Tokens are awarded based on registration and verification.
     */
    pub fn register_merchant(
        ctx: Context<RegisterMerchant>,
        lat: f64,
        lon: f64,
        metadata_uri: String,
    ) -> Result<()> {
        let merchant = &mut ctx.accounts.merchant_account;
        merchant.owner = ctx.accounts.merchant_signer.key();
        merchant.lat = lat;
        merchant.lon = lon;
        merchant.metadata_uri = metadata_uri.clone();
        merchant.tx_count = 0;
        merchant.og_badge_minted = false;
        merchant.verified_badge_minted = false;
        merchant.points = REGISTRATION_REWARD;
        if lat != 0.0 && lon != 0.0 {
            merchant.verified_badge_minted = true;
            merchant.points += VERIFICATION_REWARD;
        }
        emit!(MerchantRegistered {
            owner: merchant.owner,
            lat: merchant.lat,
            lon: merchant.lon,
            metadata_uri: merchant.metadata_uri.clone(),
            og_badge_minted: merchant.og_badge_minted,
            verified_badge_minted: merchant.verified_badge_minted,
            tx_count: merchant.tx_count,
            points: merchant.points,
        });
        Ok(())
    }

    /**
     * Verify a Merchant
     * This function updates the merchant's latitude and longitude,
     * marks them as verified, and reward Synthetic Tokens.
     */
    pub fn verify_merchant(ctx: Context<VerifyMerchant>, lat: f64, lon: f64) -> Result<()> {
        let merchant = &mut ctx.accounts.merchant_account;

        // Ensure the merchant is registered and not already verified
        require!(
            !merchant.verified_badge_minted,
            CustomError::AlreadyVerified
        );

        merchant.lat = lat;
        merchant.lon = lon;
        merchant.verified_badge_minted = true;
        merchant.points += VERIFICATION_REWARD;
        emit!(MerchantVerified {
            owner: merchant.owner,
            lat: merchant.lat,
            lon: merchant.lon,
            verified_badge_minted: merchant.verified_badge_minted,
            points: merchant.points,
        });
        Ok(())
    }

    /**
     * Increment the transaction count for a merchant
     * This function increments the transaction count and rewards Synthetic Tokens
     * Only the contract owner can call this function
     */
    pub fn increment_tx_count(ctx: Context<IncrementTxCount>) -> Result<()> {
        // Only the contract owner can increment transaction count
        require!(
            ctx.accounts.owner_signer.key() == ctx.accounts.contract_owner_account.owner,
            CustomError::Unauthorized
        );
        let merchant = &mut ctx.accounts.merchant_account;
        merchant.tx_count += 1;
        merchant.points += TX_REWARD;

        // Check if the transaction count reaches 10 for OG badge reward
        if merchant.tx_count == OG_BADGE_TX_THRESHOLD {
            merchant.og_badge_minted = true;
            merchant.points += OG_BADGE_REWARD;
            emit!(OgBadgeAwarded {
                owner: merchant.owner,
            });
        }

        emit!(TxCountIncremented {
            owner: merchant.owner,
            tx_count: merchant.tx_count,
            points: merchant.points,
        });
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = owner_signer,
        space = 8 + 32,
        seeds = [b"contract_owner"],
        bump
    )]
    pub contract_owner_account: Account<'info, ContractOwner>,
    #[account(mut)]
    pub owner_signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct VerifyMerchant<'info> {
    #[account(mut, seeds = [b"merchant", merchant_signer.key().as_ref()], bump)]
    pub merchant_account: Account<'info, MerchantAccount>,
    pub merchant_signer: Signer<'info>,
}

#[derive(Accounts)]
#[instruction(lat: f64, lon: f64, metadata_uri: String)]
pub struct RegisterMerchant<'info> {
    #[account(
        init,
        payer = merchant_signer,
        space = 8 + 32 + 8 + 8 + 4 + 256 + 1 + 1 + 8 + 8,
        seeds = [b"merchant", merchant_signer.key().as_ref()],
        bump
    )]
    pub merchant_account: Account<'info, MerchantAccount>,
    #[account(mut)]
    pub merchant_signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct IncrementTxCount<'info> {
    #[account(mut, seeds = [b"merchant", merchant_account.owner.as_ref()], bump)]
    pub merchant_account: Account<'info, MerchantAccount>,
    #[account(seeds = [b"contract_owner"], bump)]
    pub contract_owner_account: Account<'info, ContractOwner>,
    pub owner_signer: Signer<'info>,
}

#[error_code]
pub enum CustomError {
    #[msg("Merchant is already verified")]
    AlreadyVerified,
    #[msg("Unauthorized: Only contract owner can perform this action")]
    Unauthorized,
}
