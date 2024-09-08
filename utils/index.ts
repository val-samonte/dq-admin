export const getProvider = () => {
  if ("phantom" in window) {
    const { phantom }: any = window;
    const provider = phantom.solana;

    if (provider?.isPhantom) {
      return provider;
    }
  }
  return null;
};
