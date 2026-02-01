import * as PIXI from "pixi.js";

export function createCharMesh(char: string, style: PIXI.TextStyle) {
  // 1. Create Pixi Text
  const text = new PIXI.Text(char, style);

  // 🔴 CRITICAL: force texture generation
  text.updateText(true);

  const texture = text.texture;

  // 2. Create deformable plane
  const cols = 8;
  const rows = 8;

  const plane = new PIXI.SimplePlane(texture, cols, rows);



  // 🔴 FORCE NON-ZERO SIZE
  plane.width = Math.max(texture.width, 80);
  plane.height = Math.max(texture.height, 120);

  // 3. Grab vertex buffer
  const buffer = plane.geometry.getBuffer("aVertexPosition");
  const vertices = buffer.data as unknown as Float32Array;

  const original = new Float32Array(vertices.length);
  original.set(vertices);

  return { plane, vertices, original };
}
