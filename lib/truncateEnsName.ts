import { isEmptyString } from './isEmptyString';
import { isNonEmptyString } from './isNonEmptyString';

type Options = {
  maxLength?: number;
  chunkSize?: number;
  delimiter?: string;
};

const DEFAULT_CHUNK_SIZE = 6;
const DEFAULT_DELIMITER = '...';
const DEFAULT_MAX_LENGTH = 20;

const DEFAULT_OPTIONS = {
  maxLength: DEFAULT_MAX_LENGTH,
  chunkSize: DEFAULT_CHUNK_SIZE,
  delimiter: DEFAULT_DELIMITER,
} as const;

export function truncateEnsName(value: string, options?: Options) {
  if (isEmptyString(value)) {
    return value;
  }

  const { maxLength, delimiter, chunkSize } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  const originalLength = value.length;
  const fixedMaxLength = Math.max(1, maxLength);

  // Exit early if we don't need to truncate
  if (originalLength <= fixedMaxLength) {
    return value;
  }

  const fixedDelimiter = isNonEmptyString(delimiter)
    ? delimiter
    : DEFAULT_DELIMITER;

  // we need to handle subdomains so we can't just split the string on '.'
  const tldIndex = value.lastIndexOf('.');

  const name = value.slice(0, tldIndex);
  const tld = value.slice(tldIndex, value.length);

  // Don't allow chunkSize to be below 1
  const fixedChunkSize = Math.max(1, chunkSize);

  // Prevent situations where the truncated value + tld is longer than the original string
  if (originalLength <= chunkSize * 2 + fixedDelimiter.length + tld.length) {
    return value;
  }

  const truncatedName = [
    name.slice(0, fixedChunkSize),
    fixedDelimiter,
    name.slice(-fixedChunkSize),
    tld,
  ].join('');

  if (truncatedName.length >= value.length) {
    return value;
  }

  return truncatedName;
}
