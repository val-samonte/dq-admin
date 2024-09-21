use anchor_lang::prelude::*;

declare_id!("FkLm86ac3Jz3s8eRabm3hjzDvpuFYQJv7Cwp8YmGFenV");

#[program]
pub mod item_blueprint {
    use super::*;

    pub fn create_blueprint(
        ctx: Context<CreateBlueprint>,
        name: String,
        description: String,
        image: String,
    ) -> Result<()> {
        let blueprint = &mut ctx.accounts.blueprint;

        blueprint.name = name;
        blueprint.description = description;
        blueprint.image = image;
        blueprint.mint_authority = ctx.accounts.mint_authority.key();
        blueprint.owner = ctx.accounts.owner.key();

        Ok(())
    }
}
#[derive(AnchorDeserialize, AnchorSerialize)]
pub struct InputParams {
    pub name: String,
    pub description: String,
    pub image: String,
}
#[derive(Accounts)]
#[instruction(params: InputParams)]
pub struct CreateBlueprint<'info> {
    #[account(
        init,
        payer = owner,
        space = 8 + 32 + (4 + params.name.len()) + (4 + params.description.len()) + (4 + params.image.len()),
        seeds = [b"blueprint".as_ref(), owner.key().as_ref()],
        bump
    )]
    pub blueprint: Account<'info, Blueprint>,
    #[account(mut)]
    pub owner: Signer<'info>,
    /// CHECK: mint authority for the item
    pub mint_authority: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Blueprint {
    pub name: String,
    pub description: String,
    pub image: String,
    pub mint_authority: Pubkey,
    pub owner: Pubkey,
}
