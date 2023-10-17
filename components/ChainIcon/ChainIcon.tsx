import { ChainIcon as ConnectkitChainIcon } from 'connectkit';
import Image from 'next/image';

type ChainIconProps = {
  id?: number;
  unsupported?: boolean;
  radius?: number;
  size?: number;
};

const ChainIcon = ({ id, size = 24, ...props }: ChainIconProps) => {
  switch (id) {
    case 8453:
      return (
        <Image
          src="https://assets.rabbithole.gg/networks/base.png"
          width={size}
          height={size}
          alt="base-mainnet"
        />
      );
    case 324:
      return (
        <Image
          src="https://assets.rabbithole.gg/networks/zksync-era.png"
          width={size}
          height={size}
          alt="zksync-mainnet"
        />
      );
    case 7777777:
      return (
        <Image
          src="https://assets.rabbithole.gg/ourzora.png"
          width={size}
          height={size}
          alt="zora-network"
        />
      );
    default:
      return <ConnectkitChainIcon id={Number(id)} {...props} size={size} />;
  }
};

export default ChainIcon;
