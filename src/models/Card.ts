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
        // Set up interaction for the card
        // this.sprite = null; // Will be set when the card is displayed
        // this.sprite.setInteractive().on('pointerdown', this.selectCard.bind(this));
    }

    // selectCard() {
    //     this.isSelected = !this.isSelected;
    //     if (this.sprite) {
    //         this.sprite.y = this.isSelected ? this.originalY - 20 : this.originalY;
    //     }
    // }

    getFrame(): string {
        // Assuming you have a method to get the correct frame name based on the card's rank and suit
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
