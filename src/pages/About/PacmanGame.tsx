import { useEffect, useMemo, useRef, useState } from "react";
import "./pacmanGame.css";

import squarePink from "../../assets/svg/sad-pink.svg";
import squarePurple from "../../assets/svg/sad-purple.svg";
import squareGreen from "../../assets/svg/sad-green.svg";
import pacmanIcon from "../../assets/svg/circleYIcon.svg";

const ROWS = 13;
const COLS = 20;
const TICK_MS = 140;

const ENEMIES = [
  { id: "pink", icon: squarePink },
  { id: "yellow", icon: squarePurple },
  { id: "green", icon: squareGreen },
];

type Dir = "left" | "right" | "up" | "down";

type Pos = { x: number; y: number };

type Enemy = {
  id: string;
  icon: string;
  pos: Pos;
  lastDir: Dir | null;
};

const DIRS: Dir[] = ["left", "right", "up", "down"];

function PacmanIcon({ direction }: { direction: Dir }) {
  return (
    <img
      className={`pacman-icon ${direction}`}
      src={pacmanIcon}
      alt=""
      aria-hidden="true"
    />
  );
}

type CityMarkerProps = {
  icon: string;
  label: string;
  style: React.CSSProperties;
};

function CityMarker({ icon, label, style }: CityMarkerProps) {
  return (
    <div className="city-marker" style={style}>
      <img src={icon} alt="" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

function keyToDir(key: string): Dir | null {
  if (key === "ArrowLeft") return "left";
  if (key === "ArrowRight") return "right";
  if (key === "ArrowUp") return "up";
  if (key === "ArrowDown") return "down";
  return null;
}

function move(pos: Pos, dir: Dir): Pos {
  if (dir === "left") return { x: pos.x - 1, y: pos.y };
  if (dir === "right") return { x: pos.x + 1, y: pos.y };
  if (dir === "up") return { x: pos.x, y: pos.y - 1 };
  return { x: pos.x, y: pos.y + 1 };
}

function canMove(pos: Pos) {
  return pos.x >= 0 && pos.x < COLS && pos.y >= 0 && pos.y < ROWS;
}

function tryMove(pos: Pos, dir: Dir) {
  const next = move(pos, dir);
  if (!canMove(next)) return { pos, moved: false };
  return { pos: next, moved: true };
}

function dist(a: Pos, b: Pos) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function pickEnemyDir(enemy: Enemy, pacman: Pos) {
  const options = DIRS.map(dir => {
    const attempt = tryMove(enemy.pos, dir);
    return { dir, next: attempt.pos, moved: attempt.moved };
  })
    .filter(o => o.moved)
    .filter(o => !(enemy.lastDir && opposite(enemy.lastDir) === o.dir));

  if (options.length === 0) return enemy.lastDir ?? "left";

  const chaseBias = 0.7;
  if (Math.random() < chaseBias) {
    options.sort((a, b) => dist(a.next, pacman) - dist(b.next, pacman));
    return options[0].dir;
  }

  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex].dir;
}

function opposite(dir: Dir): Dir {
  if (dir === "left") return "right";
  if (dir === "right") return "left";
  if (dir === "up") return "down";
  return "up";
}

function initDots() {
  return Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => true));
}

export default function PacmanGame() {
  const boardRef = useRef<HTMLDivElement>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [direction, setDirection] = useState<Dir>("right");
  const [nextDirection, setNextDirection] = useState<Dir>("right");
  const [pacman, setPacman] = useState<Pos>({ x: 1, y: 1 });
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [dots, setDots] = useState<boolean[][]>(() => initDots());
  const [gameOver, setGameOver] = useState(false);
  const pacmanRef = useRef(pacman);
  const enemiesRef = useRef<Enemy[]>([]);
  const directionRef = useRef<Dir>(direction);
  const nextDirectionRef = useRef<Dir>(nextDirection);

  const totalDots = useMemo(() => ROWS * COLS, []);
  const remainingDots = useMemo(
    () => dots.reduce((acc, row) => acc + row.filter(Boolean).length, 0),
    [dots]
  );
  const score = useMemo(() => totalDots - remainingDots, [totalDots, remainingDots]);

  useEffect(() => {
    pacmanRef.current = pacman;
  }, [pacman]);

  useEffect(() => {
    enemiesRef.current = enemies;
  }, [enemies]);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    nextDirectionRef.current = nextDirection;
  }, [nextDirection]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const dir = keyToDir(e.key);
      if (!dir) return;
      e.preventDefault();
      if (!isRunning) return;
      setNextDirection(dir);
      nextDirectionRef.current = dir;
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning || gameOver) return;

    const timer = window.setInterval(() => {
      const current = pacmanRef.current;
      const desired = tryMove(current, nextDirectionRef.current);
      const fallback = desired.moved ? desired : tryMove(current, directionRef.current);
      const nextPos = fallback.pos;
      const nextDir = desired.moved
        ? nextDirectionRef.current
        : fallback.moved
          ? directionRef.current
          : directionRef.current;

      // If pacman moves onto an enemy, end immediately.
      if (enemiesRef.current.some(e => e.pos.x === nextPos.x && e.pos.y === nextPos.y)) {
        setPacman(nextPos);
        pacmanRef.current = nextPos;
        setGameOver(true);
        setIsRunning(false);
        return;
      }

      if (nextPos.x !== current.x || nextPos.y !== current.y) {
        setPacman(nextPos);
        pacmanRef.current = nextPos;
      }

      if (nextDir !== directionRef.current) {
        setDirection(nextDir);
        directionRef.current = nextDir;
      }

      setDots(prevDots => {
        if (!prevDots[nextPos.y][nextPos.x]) return prevDots;
        const copy = prevDots.map(row => [...row]);
        copy[nextPos.y][nextPos.x] = false;
        return copy;
      });

      const nextEnemies = enemiesRef.current.map(enemy => {
        const dir = pickEnemyDir(enemy, nextPos);
        const next = tryMove(enemy.pos, dir).pos;
        return { ...enemy, pos: next, lastDir: dir };
      });
      setEnemies(nextEnemies);

      if (nextEnemies.some(e => e.pos.x === nextPos.x && e.pos.y === nextPos.y)) {
        setGameOver(true);
        setIsRunning(false);
      }
    }, TICK_MS);

    return () => window.clearInterval(timer);
  }, [isRunning, gameOver, direction, nextDirection, pacman]);

  useEffect(() => {
    if (!isRunning) return;
    if (remainingDots === 0) {
      setGameOver(true);
      setIsRunning(false);
    }
  }, [remainingDots, isRunning]);

  useEffect(() => {
    if (!isRunning) return;
    const hit = enemies.some(e => e.pos.x === pacman.x && e.pos.y === pacman.y);
    if (hit) {
      setGameOver(true);
      setIsRunning(false);
    }
  }, [enemies, pacman, isRunning]);

  function handleStart() {
    setIsRunning(true);
    setGameOver(false);
    setDots(initDots());
    setPacman({ x: 1, y: 1 });
    setDirection("right");
    setNextDirection("right");
    setEnemies([
      { id: ENEMIES[0].id, icon: ENEMIES[0].icon, pos: { x: 18, y: 1 }, lastDir: "left" },
      { id: ENEMIES[1].id, icon: ENEMIES[1].icon, pos: { x: 18, y: 11 }, lastDir: "left" },
      { id: ENEMIES[2].id, icon: ENEMIES[2].icon, pos: { x: 1, y: 11 }, lastDir: "right" },
    ]);
  }

  return (
    <section className="pacman-page">
      <div
        className="pacman-board"
        ref={boardRef}
        style={{ ["--cols" as string]: COLS, ["--rows" as string]: ROWS }}
      >
        <div
          className="pacman-grid"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          }}
        >
          {dots.map((row, y) =>
            row.map((on, x) => (
              <span
                key={`${x}-${y}`}
                className={`pacman-dot ${on ? "on" : "off"}`}
              />
            ))
          )}
        </div>

        <div
          className="pacman-character"
          style={{
            ["--x" as string]: pacman.x,
            ["--y" as string]: pacman.y,
          }}
        >
          <PacmanIcon direction={direction} />
        </div>

        {enemies.map(enemy => (
          <div
            key={enemy.id}
            className="pacman-enemy"
            style={{
              ["--x" as string]: enemy.pos.x,
              ["--y" as string]: enemy.pos.y,
            }}
          >
            <img src={enemy.icon} alt="" aria-hidden="true" />
          </div>
        ))}

     
      </div>

      <div className="pacman-sidebar">
        <p className="pacman-about-text">
          You’ll find out more about us soon. Until then,<br />
          play Pac-Man :)
        </p>
        <button className="pacman-start" onClick={handleStart}>
          {gameOver ? "Restart" : "Start"}
        </button>
        <div className="pacman-score">{score} / {totalDots}</div>
        <p className="pacman-hint">Use arrow keys to move</p>
        {gameOver && (
          <div className="pacman-status">
            {remainingDots === 0 ? "You cleared all dots!" : "Caught by an enemy!"}
          </div>
        )}
      </div>
    </section>
  );
}
