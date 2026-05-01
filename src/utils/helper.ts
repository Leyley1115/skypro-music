import { TrackType } from '../sharedTypes/sharedTypes';

export function formatTime(time: number) {
  const minuts = Math.floor(time / 60);
  const inputSeconds = Math.floor(time % 60);
  const outputSeconds = inputSeconds < 10 ? `0${inputSeconds}` : inputSeconds;
  return `${minuts}:${outputSeconds}`;
}

export function getUniqueValuesByKey(
  arr: TrackType[],
  key: keyof TrackType,
): string[] {
  const uniqueValues = new Set<string>();

  arr.forEach((item) => {
    const value = item[key];

    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (typeof v === 'string') {
          uniqueValues.add(v);
        }
      });
    } else if (typeof value === 'string') {
      uniqueValues.add(value);
    }
  });

  return Array.from(uniqueValues);
}
