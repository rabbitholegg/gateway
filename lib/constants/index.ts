export * from './alchemy';
export * from './chains';
export * from './errors';
export * from './quest-factory';

export const DISCORD_URL = '#';
export const TWITTER_URL = '#';
export const GITHUB_URL = '#';
export const TERMINAL_URL = 'https://terminal.rabbithole.gg';

export const isNotProduction = process.env.NODE_ENV !== 'production';
export const hasWindow = () => typeof window !== 'undefined';
export const PROTOCOL_FEE_PERCENT = 0.1;
export const PROTOCOL_REWARD_VALUE_WEI = 25_000_000_000_000n;
export const REFERRAL_FEE_WEI = 25_000_000_000_000n;

export const PROTOCOL_REWARDS_OVERVIEW_URL =
  'https://help.rabbithole.gg/protocol-rewards/protocol-rewards-overview' as const;

export const SPRING_TRANSITION = {
  type: 'spring',
  mass: 2,
  damping: 25,
  stiffness: 150,
};

export const REFERRAL_INFO_LINK =
  'https://help.rabbithole.gg/quest-protocol/protocol-rewards-referrals';
