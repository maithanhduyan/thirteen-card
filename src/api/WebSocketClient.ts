// WebSocketClient.ts
import { WEBSOCKET } from "../config"

export default class WebSocketClient {
    socket!: WebSocket;
    
    constructor() {
        this.connect();
    }
    public onMessageReceived: ((message: string) => void) | undefined;

    private connect(): void {
        this.socket = WEBSOCKET;
        this.socket.onopen = this.onOpen.bind(this);
        this.socket.onmessage = this.onMessage.bind(this);
        this.socket.onclose = this.onClose.bind(this);
        this.socket.onerror = this.onError.bind(this);
    }

    private onOpen(): void {
        console.log('WebSocket is connected.');
    }

    private onMessage(event: MessageEvent): void {
        if (this.onMessageReceived) {
            this.onMessageReceived(event.data);
        }
    }

    private onClose(): void {
        console.log('WebSocket connection closed');
    }

    private onError(event: Event): void {
        console.error('WebSocket encountered an error:', event);
    }

    public sendMessage(message: string): void {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        } else {
            console.error('WebSocket is not open. Message not sent:', message);
        }
    }
}