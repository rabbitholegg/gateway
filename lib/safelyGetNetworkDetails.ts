import { NETWORKS } from "./constants/networks";

export const safelyGetNetworkDetails = (networkName: string) => {
  const maybeNetwork = NETWORKS[networkName];

  if (maybeNetwork == null) {
    return NETWORKS['eth-mainnet'];
  }

  return maybeNetwork;
};
