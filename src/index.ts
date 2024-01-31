import Phaser from 'phaser';
import Game from './scenes/Game';
import Controller from './scenes/Controller';
import GamePlay from './scenes/GamePlay';

let gameSreenWidth, gameSreenHeight;
let game;

function onDeviceReady() {

  gameSreenWidth = window.innerWidth
  gameSreenHeight = window.innerHeight

  const config = {
    type: Phaser.AUTO,
    parent: "game",
    backgroundColor: "0x5C0321",
    scale: {
      width: gameSreenWidth,
      height: gameSreenHeight,
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [Controller],
    gameVersion:"0.1"
  }

  game = new Phaser.Game(config);
  
}
window.onload = onDeviceReady
document.addEventListener('deviceready', onDeviceReady)