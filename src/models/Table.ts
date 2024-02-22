import Player from "./Player";
import Room from "./Room";

class Table {
    room: Room;
    players: Player[];

    constructor() {
        this.players = [];
        this.room = new Room('');
    }

    showCards(){
        
    }

}

export default Table;