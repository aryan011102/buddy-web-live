import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { createCharMesh } from "./createCharMesh";
import { applyBulge } from "./bulge";

export default function FisheyeTextPixi({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;


    const app = new PIXI.Application({
      resizeTo: container,
        backgroundAlpha: 0, 
      antialias: true,
      
    });

    container.appendChild(app.view as HTMLCanvasElement);
   
    app.stage.eventMode = "static";
    app.stage.hitArea = app.screen;

    const style = new PIXI.TextStyle({
      fontFamily: "Rethink Sans",
      fontSize: 180, 
      fontWeight: "600",
      fill: 0xF6DDE1,
    });


   const chars = text.split("");
const meshes: any[] = [];

for (const char of chars) {
  const { plane, vertices, original } = createCharMesh(char, style);
  app.stage.addChild(plane);
  meshes.push({ plane, vertices, original });
}


const totalWidth = meshes.reduce(
  (sum, m) => sum + m.plane.width,
  0
);

let startX = app.screen.width / 2 - totalWidth / 2;

for (const m of meshes) {
  m.plane.x = startX;
  m.plane.y = app.screen.height / 2 - m.plane.height / 2;
  startX += m.plane.width;
}



const cursor = new PIXI.Graphics();

const radius = 100;   
const strength = 20;

cursor.lineStyle(2, 0xF6DDE1, 0.6);
cursor.drawCircle(0, 0, radius);
cursor.endFill();
cursor.visible = false;

app.stage.addChild(cursor);

app.stage.on("pointermove", (e) => {

   if (!cursor.visible) return; 
  const mx = e.global.x;
  const my = e.global.y;


  cursor.position.set(mx, my);

  for (const m of meshes) {
    const plane = m.plane;

    const localX = mx - plane.x;
    const localY = my - plane.y;

    applyBulge(
      m.vertices,
      m.original,
      localX,
      localY,
      radius,
      strength
    );

    plane.geometry.getBuffer("aVertexPosition").update();
  }
});


app.stage.on("pointerover", () => {
  cursor.visible = true;
  container.style.cursor = "none";
});

app.stage.on("pointerout", () => {
  cursor.visible = false;
  container.style.cursor = "auto";

 
  for (const m of meshes) {
    m.vertices.set(m.original);
    m.plane.geometry.getBuffer("aVertexPosition").update();
  }
});




    return () => {
      app.destroy(true, {
        children: true,
        texture: true,
        baseTexture: true,
      });
    };
  }, [text]);

  return (
    <div
    ref={containerRef}
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -60%)", 
      width: "100%",
      height: "420px",
     pointerEvents: "none", 
    }}
  />
  );
}
