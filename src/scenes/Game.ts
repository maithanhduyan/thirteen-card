import Phaser from "phaser";

export default class Game extends Phaser.Scene {

  logo: any;
  constructor() {
    super("Game");
  }

  preload() {
    this.load.image("logo", "assets/phaser3-logo.png");
  }

  create() {
    this.logo = this.add.image(400, 70, "logo");

    this.tweens.add({
      targets: this.logo,
      y: 350,
      duration: 1600,
      ease: "Sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }

  update() {

  }

}
