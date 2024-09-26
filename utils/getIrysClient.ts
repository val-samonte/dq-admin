import Irys from "@irys/sdk"

export const getIrysClient = () => {
    const irys = new Irys({
        url: "https://devnet.irys.xyz",
        token: "solana",
        key: process.env.PRIVATE_KEY,
        config: {
            providerUrl: "https://rpc-mumbai.maticvigil.com",
        }
    });
    // Print your wallet address
    console.log(`wallet address = ${irys.address}`);
    return irys;
};