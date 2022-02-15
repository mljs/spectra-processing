/**
 * Normalize an array of zones:
 * - ensure than from < to
 * - merge overlapping zones
 *
 * @param zones - array of zones
 * @param options - options
 * @returns array of zones
 */
export function zonesNormalize(
  zones: {
    /** start of zone*/
    from: number;
    /** end of zone*/
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
  if (zones.length === 0) return [];
  let { from = Number.NEGATIVE_INFINITY, to = Number.POSITIVE_INFINITY } =
    options;
  if (from > to) [from, to] = [to, from];

  zones = JSON.parse(JSON.stringify(zones)).map(
    (zone: { from: number; to: number }) =>
      zone.from > zone.to ? { from: zone.to, to: zone.from } : zone,
  );
  zones = zones.sort((a, b) => {
    if (a.from !== b.from) return a.from - b.from;
    return a.to - b.to;
  });

  zones.forEach((zone) => {
    if (from > zone.from) zone.from = from;
    if (to < zone.to) zone.to = to;
  });

  zones = zones.filter((zone) => zone.from <= zone.to);
  if (zones.length === 0) return [];

  let currentZone = zones[0];
  let result = [currentZone];
  for (let i = 1; i < zones.length; i++) {
    let zone = zones[i];
    if (zone.from <= currentZone.to) {
      if (currentZone.to < zone.to) {
        currentZone.to = zone.to;
      }
    } else {
      currentZone = zone;
      result.push(currentZone);
    }
  }
  return result;
}
