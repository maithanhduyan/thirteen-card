import Phaser from "phaser";
import GamePlay from "./GamePlay";

class Controller extends Phaser.Scene {

    constructor() {
        super('Controller');
    }

    init() { }
    
    preload() { }
    
    changeScene(sceneKey: any) {
        // Hàm để chuyển đổi giữa các scene
        this.scene.start(sceneKey);
    }

    create() {
        // Truy cập WebSocket từ scene
        console.log(this.game.config);
        // Khởi tạo và quản lý các scene
        this.scene.add('GamePlay', GamePlay, false);
        // this.socket.send('Hello Phaser!');
        this.scene.start('GamePlay');
    }


    update() { }

}

export default Controller;