class Card {

    name: string;
    // sprite: Phaser.GameObjects.Sprite | null; // Placeholder for the sprite, initially null
    isSelected: boolean = false; // Track if the card is selected
    originalY: number; // The original Y position of the card

    constructor(public rank: string, public suit: string) {
        this.suit = suit;
        this.rank = rank;
        this.name = `${suit}${rank}`;
        this.originalY = 0; // Will be set when the card is displayed
    }

    getFrame(): string {
        return `${this.suit}${this.rank}`;
    }

    toString() {
        return this.name;
    }
}

interface Card {
    rank: string;
    suit: string;
    getFrame(): string;
}
export default Card;
