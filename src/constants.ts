export const PUNCHES: Record<string, number[]> = {
  " ": [],
  "0": [0],
  "1": [1],
  "2": [2],
  "3": [3],
  "4": [4],
  "5": [5],
  "6": [6],
  "7": [7],
  "8": [8],
  "9": [9],
  A: [12, 1],
  B: [12, 2],
  C: [12, 3],
  D: [12, 4],
  E: [12, 5],
  F: [12, 6],
  G: [12, 7],
  H: [12, 8],
  I: [12, 9],
  J: [11, 1],
  K: [11, 2],
  L: [11, 3],
  M: [11, 4],
  N: [11, 5],
  O: [11, 6],
  P: [11, 7],
  Q: [11, 8],
  R: [11, 9],
  "/": [0, 1],
  S: [0, 2],
  T: [0, 3],
  U: [0, 4],
  V: [0, 5],
  W: [0, 6],
  X: [0, 7],
  Y: [0, 8],
  Z: [0, 9],
};

export const PUNCHES_START_X = 50;
export const PUNCHES_Y_OFFSET = 0;
export const COLUMN_SPACER = 16.37;

export const ROW_Y_POS: Record<number, number> = {
  12: 34,
  11: 80,
  0: 128,
  1: 174,
  2: 221,
  3: 268,
  4: 315,
  5: 362,
  6: 409,
  7: 457,
  8: 505,
  9: 551,
};

export const IDLE_TIMEOUT = 3000; // ms
export const TYPING_DELAY = 100; // ms
export const SEQUENCES = [
  "SLOW CODE",
  "0123456789ABCDEFGHIJKLMNOPQR/STUVWXYZ",
  "This is a full 80 columns of text that fits entirely in this IBM 5081 punch card".toUpperCase(),
];
