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

// Thirteen Order Game
export const RanksOrder = ['3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace', '2'];
export const SuitsOrder = ['spades', 'clubs', 'diamonds', 'hearts'];

// WebSocket
export const SOCKET_URL = 'ws://thirteen-card-server.deno.dev/websocket';
export const SOCKET_URL_LOCAL = 'ws://localhost:8000/websocket'; // Virtual DNS
export const WEBSOCKET: WebSocket = new WebSocket(SOCKET_URL_LOCAL);
