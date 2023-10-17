import { z } from 'zod';
import { isValidAddress } from '../isValidAddress';

export const EthAddressSchema = z.custom<`0x${string}`>((val) =>
  isValidAddress(val),
);

export type EthAddress = z.infer<typeof EthAddressSchema>;