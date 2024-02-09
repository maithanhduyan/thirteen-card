class Card {

    name: string;
    isSelected: boolean = false;
    sprite!: Phaser.GameObjects.Sprite;
    x!: number;
    y!: number;
    scene!: Phaser.Scene;

    constructor(rank: string, suit: string) {
        this.suit = suit;
        this.rank = rank;
        this.name = `${suit}${rank}`;
    }

    addSprite(sprite: Phaser.GameObjects.Sprite): void {
        this.sprite = sprite
    }

    getFrame(): string {
        return `${this.suit}${this.rank}`;
    }



    toJSON(): JSON {
        return JSON.parse(JSON.stringify({
            client_command: 'play',
            cards: Card,
        }));
    }


}

interface Card {
    rank: string;
    suit: string;
    getFrame(): string;
}
export default Card;
