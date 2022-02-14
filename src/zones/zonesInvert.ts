import { zonesNormalize } from './zonesNormalize';

/**
 * Convert an array of exclusions and keep only from / to. The method will always check if "from" is lower than "to" and will swap them if required.
 *
 * @param exclusions - array of zones
 * @param options - options
 * @returns array of inverted zones
 */
export function zonesInvert(
  exclusions: {
    /** start of zone*/
    from: number;
    /** end of zone */
    to: number;
  }[] = [],
  options: {
    /** specify min value of zones
     * @default Number.NEGATIVE_INFINITY
     */
    from?: number;
    /** specify max value of zones
     * @default Number.POSITIVE_INFINITY
     */
    to?: number;
  } = {},
): { from: number; to: number }[] {
  let { from = Number.NEGATIVE_INFINITY, to = Number.POSITIVE_INFINITY } =
    options;
  if (from > to) [from, to] = [to, from];

  let returnExclusions = zonesNormalize(exclusions, { from, to });
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
