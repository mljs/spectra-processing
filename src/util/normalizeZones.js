/**
 * Normalize an array of zones:
 * - ensure than from < to
 * - merge overlapping zones
 * @param {object} [zones=[]]
 */

export function normalizeZones(zones = []) {
  if (zones.length === 0) return [];
  zones = JSON.parse(JSON.stringify(zones)).map((zone) =>
    zone.from > zone.to ? { from: zone.to, to: zone.from } : zone,
  );

  zones = zones.sort((a, b) => {
    if (a.from !== b.from) return a.from - b.from;
    return a.to - b.to;
  });

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
