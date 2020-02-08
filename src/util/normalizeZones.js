/**
 * Normalize an array of zones:
 * - ensure than from < to
 * - merge overlapping zones
 * @param {object} [zones=[]]
 * @param {object} [options={}]
 * @param {number} [options.from=Number.MIN_VALUE]
 * @param {number} [options.to=Number.MAX_VALUE]
 */

export function normalizeZones(zones = [], options = {}) {
  if (zones.length === 0) return [];
  zones = JSON.parse(JSON.stringify(zones)).map((zone) =>
    zone.from > zone.to ? { from: zone.to, to: zone.from } : zone,
  );
  let {
    from = Number.NEGATIVE_INFINITY,
    to = Number.POSITIVE_INFINITY,
  } = options;
  if (from > to) {
    [from, to] = [to, from];
  }

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
