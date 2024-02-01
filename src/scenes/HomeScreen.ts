import { WEBSOCKET } from "../config";

class HomeScreen extends Phaser.Scene {

    socket: WebSocket;

    constructor() {
        super('HomeScreen');
        this.socket = WEBSOCKET;
        this.socket.onmessage = this.handleMessageReceived.bind(this);
        this.socket.onopen = this.handleOnOpen.bind(this);
    }

    handleOnOpen() { }

    handleMessageReceived(event: MessageEvent): void {
        console.log(event.data)
    }

    init() { }

    preload() { }

    create() { }

    update() { }
}