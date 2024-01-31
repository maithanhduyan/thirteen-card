import Phaser from "phaser";

export default {
  type: Phaser.AUTO,
  parent: "game",
  backgroundColor: "0x5C0321",
  scale: {
    width: 800,
    height: 600,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

export enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

export enum Game_Status {
  READY = "READY",
  NOT_READY_YET = "NOT_READY_YET",
  WIN = "WIN",
  LOSS = "",
  DEALING = "DEALING"
};

export const SOCKET_URL = 'ws://simple-weboscket.deno.dev/websocket';
export const SOCKET_LOCAL_URL = 'ws://localhost:8000/websocket';// Virtual DNS
export const WEBSOCKET: WebSocket = new WebSocket(SOCKET_LOCAL_URL);