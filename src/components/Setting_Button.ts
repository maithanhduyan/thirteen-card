
import Phaser from "phaser";

export class SettingButton extends Phaser.Scene {
    constructor() {
        super({ key: 'SettingButton' });
    }
    // 
    createSettingButton() {
        // Add a Play Card button
        const settingButton = this.add.text(this.cameras.main.width - 80, 10, 'CÀI ĐẶT', {
            font: '12px Arial',
            fill: '#ffffff',
            padding: { x: 8, y: 5 },
            // backgroundColor: '#0000ff'
        })
            .setInteractive() // Make the text interactive
            .setDepth(1)
            .on('pointerdown', () => {// Pointerdown event
                console.log('Setting')
            });
    }

    preload(): void { }

    init(): void { }

    create(): void {
        this.createSettingButton();
    }

    update(): void { }
}