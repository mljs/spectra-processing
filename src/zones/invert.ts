import { normalize } from './normalize';

/**
 * Convert an array of exclusions and keep only from / to
 *
 * The method will always check if from if lower than to and will swap if required.
 * @param exclusions - array of zones
 * @param options - options
 * @param options.from - Specify min value of zones (after inversion)
 * @param options.to - Specify max value of zones (after inversion)
 * @returns array of inverted zones
 */

export function invert(
  exclusions: { from: number; to: number }[] = [],
  options: { from?: number; to?: number } = {},
): { from: number; to: number }[] {
  let { from = Number.NEGATIVE_INFINITY, to = Number.POSITIVE_INFINITY } =
    options;
  if (from > to) [from, to] = [to, from];

  let returnExclusions = normalize(exclusions, { from, to });
  if (returnExclusions.length === 0) return [{ from, to }];

  let zones = [];
  for (let i = 0; i < returnExclusions.length; i++) {
    let exclusion = returnExclusions[i];
    let nextExclusion = returnExclusions[i + 1];
    if (i === 0) {
      if (exclusion.from > from) {
        zones.push({ from, to: exclusion.from });
      }
    }
    if (i === returnExclusions.length - 1) {
      if (exclusion.to < to) {
        zones.push({ from: exclusion.to, to });
      }
    } else {
      zones.push({ from: exclusion.to, to: nextExclusion.from });
    }
  }

  return zones;
}
