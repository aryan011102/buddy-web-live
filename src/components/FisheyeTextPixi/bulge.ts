// src/components/FisheyeTextPixi/bulge.ts

export function applyBulge(
  vertices: Float32Array,
  original: Float32Array,
  cx: number,
  cy: number,
  radius: number,
  strength: number
) {
  for (let i = 0; i < vertices.length; i += 2) {
    const ox = original[i];
    const oy = original[i + 1];

    const dx = ox - cx;
    const dy = oy - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > radius) {
      vertices[i] = ox;
      vertices[i + 1] = oy;
      continue;
    }

    const t = 1 - dist / radius;
   const curve = t * t * (3 - 2 * t);

    const offset = curve * strength * 0.8;


    vertices[i] = ox + (dx / dist) * offset;
    vertices[i + 1] = oy + (dy / dist) * offset;
  }
}
