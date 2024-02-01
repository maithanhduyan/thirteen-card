import Phaser from "phaser";

export class FPSLabel extends Phaser.Scene {
    private fpsText!: Phaser.GameObjects.Text;
    constructor() {
        super({ key: 'FPSLabel' });
    }
    createFPSText() {
        this.fpsText = this.add.text(10, 10, '', {
            font: '12px Arial',
            fill: '#ffffff'
        }).setDepth(1); 

    }
    create(): void {
        this.createFPSText();
    }

    update(): void {
        this.fpsText.setText(`FPS: ${this.game.loop.actualFps.toFixed(2)}`);
    }
}