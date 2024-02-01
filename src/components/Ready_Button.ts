import Phaser from "phaser";

export class ReadyButton extends Phaser.Scene {
    gameReady = false;
    constructor() {
        super({ key: 'ReadyButton' });
    }
    createReadyButton() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        const readyButton = this.add.text(centerX, centerY, 'READY', {
            font: '12px Arial',
            color: '#ffffff',
            padding: { x: 8, y: 5 },
            backgroundColor: '#0000ff'
        })
            .setInteractive() // Make the text interactive
            .setDepth(1)
            .on('pointerdown', () => {// Pointerdown event
                
            });
    }

    onRegistryChange(parent, key, data) {
    }

    preload(): void { }
    init(): void { }
    create(): void {
        this.registry.events.on('changedata', this.onRegistryChange, this);
        this.createReadyButton();
    }
    update(): void { }
}