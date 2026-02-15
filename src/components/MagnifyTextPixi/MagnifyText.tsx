import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";

export default function MagnifyText({ text }: { text: string }) {
const containerRef = useRef<HTMLDivElement>(null);
const LETTER_SPACING = -12; // try -10 to -30

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const app = new PIXI.Application({
      resizeTo: container,
      backgroundAlpha: 0,
      antialias: true,
    });

    container.appendChild(app.view as HTMLCanvasElement);

  
    const style = new PIXI.TextStyle({
  
      fontFamily: "Rethink Sans",
     fontSize: window.innerWidth < 640 ? 110 : 180,

      fontWeight: "400",
      fill: 0xF6DDE1,
    });
    //bold when magnify and space between characs reduce

    const letters: PIXI.Sprite[] = [];

    for (const char of text.split("")) {
      const t = new PIXI.Text(char, style);
      t.updateText(true);

      const sprite = new PIXI.Sprite(t.texture);
      sprite.anchor.set(0.5);
      app.stage.addChild(sprite);
      letters.push(sprite);
    }


    const totalWidth = letters.reduce(
      (s, l) => s + l.width,
      0
    );

    let x = app.screen.width / 2 - totalWidth / 2;

    for (const l of letters) {
      l.x = x + l.width / 2;
      l.y = app.screen.height / 2;
    x += l.width + LETTER_SPACING;
    }

    // --------------------
    // MAGNIFY CURSOR
    // --------------------
    const cursor = new PIXI.Graphics();
    const radius = 80;

    cursor.lineStyle(2, 0xF6DDE1, 0.6);
    cursor.drawCircle(0, 0, radius);
    app.stage.addChild(cursor);
    cursor.visible = false;


    app.stage.eventMode = "static";
    app.stage.hitArea = app.screen;

    app.stage.on("pointerover", () => {
      cursor.visible = true;
    });

    app.stage.on("pointerout", () => {
      cursor.visible = false;

      letters.forEach((l) => {
        l.scale.set(1);
      });
    });

    app.stage.on("pointermove", (e) => {
      const mx = e.global.x;
      const my = e.global.y;

      cursor.position.set(mx, my);

      for (const l of letters) {
        const dx = mx - l.x;
        const dy = my - l.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < radius) {
          const t = 1 - dist / radius;
          const scale = 1 + t * 0.8; 
          l.scale.set(scale);
        } else {
          l.scale.set(1);
        }
      }
    });

    return () => {
      app.destroy(true);
    };
  }, [text]);

  return (
    <div
      ref={containerRef}
      style={{
       position: "relative",
width: "100%",
height: "100%",
        cursor: "none",
      }}
    />
  );
}
