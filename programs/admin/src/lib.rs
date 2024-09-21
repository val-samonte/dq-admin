use anchor_lang::prelude::*;

declare_id!("FkLm86ac3Jz3s8eRabm3hjzDvpuFYQJv7Cwp8YmGFenV");

#[program]
pub mod admin {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
