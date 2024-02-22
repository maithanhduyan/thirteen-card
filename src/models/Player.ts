import { Player_Action } from "../utils/Enum";
import Card from "./Card";

class Player {

    id;
    name;
    username;
    cards: Card[];
    selectedCards!: Card[];
    cardOnDesk: Card[];
    yourturn: boolean = false;
    action: string = Player_Action.Waiting;

    constructor(id: string, name: string, username: string) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.cards = [];
        this.selectedCards = [];
        this.cardOnDesk = [];
    }

    addCards(cards: Card[]): void {
        if (cards.length > 0) {
            cards.forEach((card) => {
                this.cards.push(card);
            });
        }
    }

    removeCards(cards: Card[]) {
        if (cards.length > 0) {
            cards.forEach((card) => {
                const index = cards.findIndex(c => c === card);
                if (index !== -1) {
                    this.cards.splice(index, 1);
                }
            });
        }
    }

    moved(cards: Card[]) {
        cards.forEach((card) => {
            this.cardOnDesk.push(card);
        });
    }

    getAction() {
        return this.action;
    }

    setAction(act: string) {
        this.action = act;
    }
}

interface Player {
    cards: Card[];
    addCards(cards: Card[]): void;
}
export default Player;