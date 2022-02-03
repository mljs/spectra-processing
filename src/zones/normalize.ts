/**
 * Normalize an array of zones:
 * - ensure than from < to
 * - merge overlapping zones
 * @param zones - array of zones
 * @param options - options
 * @param options.from - specify min value of a zone
 * @param options.to - specify max value of a zone
 * @returns array of zones
 */

export function normalize(
  zones: { from: number; to: number }[] = [],
  options: { from?: number; to?: number } = {},
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
      currentZone.to = zone.to;
    } else {
      currentZone = zone;
      result.push(currentZone);
    }
  }
  return result;
}
