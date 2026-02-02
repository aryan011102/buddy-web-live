export function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function shuffle<T>(arr: T[]) {
  return [...arr].sort(() => Math.random() - 0.5);
}
