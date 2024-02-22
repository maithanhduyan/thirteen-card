import Player from "./Player";

class Room {
    players!: Player[];
    constructor(public id: string) {
        this.id = id;
        this.players = [];
    }

    joinRoom(player: Player) {
        if (this.players.length < 4) {
            this.players.push(player)
        }
    }
}

export default Room;