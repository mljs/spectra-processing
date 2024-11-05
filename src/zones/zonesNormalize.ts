import { FromTo } from 'cheminfo-types';

export interface ZonesNormalizeOptions {
  /**
   * specify min value of zones
   * @default Number.NEGATIVE_INFINITY
   */
  from?: number;

  /**
   * specify max value of zones
   * @default Number.POSITIVE_INFINITY
   */
  to?: number;

  /**
   * List of exclusion zones
   */
  exclusions?: FromTo[];
}

/**
 * Normalize an array of zones:
 * - ensure than from < to
 * - merge overlapping zones
 * - deal with exclusions zones
 * - if no zones is specified add one between -Infinity and +Infinity
 * @param zones - array of zones
 * @param options - options
 * @returns array of zones
 */
export function zonesNormalize<Zone extends FromTo = FromTo>(
  zones: Zone[] = [],
  options: ZonesNormalizeOptions = {},
): Zone[] {
  const { exclusions = [] } = options;
  let { from = Number.NEGATIVE_INFINITY, to = Number.POSITIVE_INFINITY } =
    options;

  if (from > to) [from, to] = [to, from];

  zones = zones
    .map((zone: Zone) =>
      zone.from > zone.to
        ? { ...zone, from: zone.to, to: zone.from }
        : { ...zone },
    )
    .sort((a, b) => {
      if (a.from !== b.from) return a.from - b.from;
      return a.to - b.to;
    });

  for (const zone of zones) {
    if (from > zone.from) zone.from = from;
    if (to < zone.to) zone.to = to;
  }

  zones = zones.filter((zone) => zone.from <= zone.to);
  if (zones.length === 0) return [];

  let currentZone = zones[0];
  const beforeExclusionsZones = [currentZone];
  for (let i = 1; i < zones.length; i++) {
    const zone = zones[i];
    if (zone.from <= currentZone.to) {
      if (currentZone.to < zone.to) {
        currentZone.to = zone.to;
      }
    } else {
      currentZone = zone;
      beforeExclusionsZones.push(currentZone);
    }
  }

  if (exclusions.length === 0) return beforeExclusionsZones;

  const normalizedExclusions = zonesNormalize(exclusions);

  let currentExclusionIndex = 0;
  const results: Zone[] = [];
  for (
    let zoneIndex = 0;
    zoneIndex < beforeExclusionsZones.length;
    zoneIndex++
  ) {
    const zone = beforeExclusionsZones[zoneIndex];
    if (currentExclusionIndex === normalizedExclusions.length) {
      // we analysed all the exclusion zones
      results.push(zone);
      continue;
    }
    while (
      currentExclusionIndex < normalizedExclusions.length &&
      normalizedExclusions[currentExclusionIndex].to <= zone.from
    ) {
      currentExclusionIndex++;
    }
    if (currentExclusionIndex === normalizedExclusions.length) {
      // we analysed all the exclusion zones
      results.push(zone);
      continue;
    }
    if (zone.to < normalizedExclusions[currentExclusionIndex].from) {
      // no problems, not yet in exclusion
      results.push(zone);
      continue;
    }
    if (normalizedExclusions[currentExclusionIndex].to >= zone.to) {
      // could be totally excluded
      if (normalizedExclusions[currentExclusionIndex].from <= zone.from) {
        continue;
      }
      results.push({
        ...zone,
        from: normalizedExclusions[currentExclusionIndex].to,
        to: zone.to,
      });
    }
    // we cut in the middle, we need to create more zones, annoying !
    if (normalizedExclusions[currentExclusionIndex].from > zone.from) {
      results.push({
        ...zone,
        from: zone.from,
        to: normalizedExclusions[currentExclusionIndex].from,
      });
    }

    zone.from = normalizedExclusions[currentExclusionIndex].to;
    zoneIndex--;
  }

  return results;
}
