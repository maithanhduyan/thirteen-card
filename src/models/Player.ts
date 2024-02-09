import Card from "./Card";


class Player {

    id;
    name;
    username;
    cards!: Card[];
    selectedCards!: Card[];
    yourturn: boolean = false;

    constructor(id: string, name: string, username: string) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.cards = [];
        this.selectedCards = [];
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
            cards.forEach((card, index) => {

            });
        }
    }

    action(act: string) {
        if (this.yourturn) {
            this
        }
    }

}

interface Player {
    cards: Card[];
    addCards(cards: Card[]): void;
}
export default Player;