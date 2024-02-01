/**
 * Game Play Online
 */
import Phaser from "phaser";
import Card from "../models/Card";
import CardHolder from "../models/CardsHolder";
import Deck from "../models/Deck";
import { WEBSOCKET } from "../config"

class GamePlay extends Phaser.Scene {

    private playerHand: CardHolder[] | undefined;
    private selectedCards: CardHolder[] = [];
    private deck: Deck;
    // Assuming there is a variable to keep track of the last card played
    private lastCardPlayed: Phaser.GameObjects.Sprite | null = null;
    socket!: WebSocket;

    constructor() {
        super({ key: 'GamePlay' });
        this.deck = new Deck();
        this.socket = WEBSOCKET;
        this.socket.onmessage = this.handleMessageReceived.bind(this);
        this.socket.onopen = this.handleOnOpen.bind(this);
    }

    async handleOnOpen() {
        this.socket.send('CHIA_BAI');
    }

    private async handleMessageReceived(event: MessageEvent): Promise<void> {
        try {
            const json = await JSON.parse(event.data);
            if (json.server_command && json.data) {
                console.log(json.data);
                const cardsData = json.data;
                const cards = cardsData.map((cardData: { rank: string; suit: string; name: any; }) => new Card(cardData.rank, cardData.suit, cardData.name));
                this.displayPlayerHand(cards);
            }
            if (json.server_command) {

            }
        } catch (error) {
            console.error('Error parsing server response:', error);
        }
    }

    private displayPlayerHand(playerHand: Card[]): void {
        
        const startX = this.cameras.main.width / 2 - (playerHand.length * 30) / 2;
        const startY = this.cameras.main.height - 70;

        playerHand.forEach((card, index) => {
            const cardSprite = this.add.sprite(startX + index * 30, startY, 'cards', card.getFrame());
            cardSprite.setInteractive();
            cardSprite.scale = 0.7
            // this.input.setDraggable(cardSprite);
            // Set up a click event listener for each card
            cardSprite.on('pointerdown', () => {
                this.playCard(cardSprite);
                if (card.isSelected) {
                    this.selectedCards.push(card);
                } else {
                    this.selectedCards = this.selectedCards.filter(c => c !== card);
                }

                // cardSprite.y = startY - 50;
                // console.log(cardSprite);
            });
            // Additional code to set up card behavior and interactivity
        });
    }

    private playSelectedCards(): void {
        // Play all selected cards
        this.selectedCards.forEach(card => {

        });

        // Clear the selected cards array
        this.selectedCards.length = 0;
    }

    private playCard(cardSprite: Phaser.GameObjects.Sprite): void {
        // The coordinates for the center of the table
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Hide or destroy the last card played if it exists
        if (this.lastCardPlayed) {
            this.lastCardPlayed.setVisible(false); // or this.lastCardPlayed.destroy();
        }

        // The scale to shrink the card to - smaller values will shrink the card more
        const shrinkScale = 0.5;

        // Update the lastCardPlayed to the current card
        this.lastCardPlayed = cardSprite;

        // Creating a tween for the card movement and scaling
        this.tweens.add({
            targets: cardSprite,
            x: centerX,
            y: centerY,
            scaleX: shrinkScale,
            scaleY: shrinkScale,
            ease: 'Power2',
            duration: 500, // Duration in milliseconds
            onComplete: () => {
                // Optional: Do something when the animation completes
                cardSprite.setDepth(1);
            }
        });
    }

    private onPlayCardButtonClicked(): void {
        console.log('Client: CHIA_BAI');
    }

    createPlayButton(): void {
        const playButton = this.add.text(this.cameras.main.centerX + 100, this.cameras.main.height - 150, 'ĐÁNH BÀI', {
            font: '14px Arial',
            color: '#ffffff',
            padding: { x: 8, y: 5 },
            backgroundColor: '#38B249'
        })
            .setInteractive() // Make the text interactive
            .on('pointerdown', () => this.onPlayCardButtonClicked()) // Pointerdown event
            .setOrigin(0.5, 0.5); // Center the button

        // Additional setup for the Play Card button, such as setting its position and depth
        playButton.setDepth(10);
    }

    createSortButton(): void {
        const playButton = this.add.text(this.cameras.main.centerX + 300, this.cameras.main.height - 150, 'XẾP BÀI', {
            font: '14px Arial',
            color: '#ffffff',
            padding: { x: 8, y: 5 },
            backgroundColor: '#9E0B0F'
        })
            .setInteractive() // Make the text interactive
            .on('pointerdown', () => {
                console.log('XẾP BÀI');
            }) // Pointerdown event
            .setOrigin(0.5, 0.5); // Center the button

        // Additional setup for the Play Card button, such as setting its position and depth
        playButton.setDepth(10);
    }

    createSkipButton(): void {
        const playButton = this.add.text(this.cameras.main.centerX / 2, this.cameras.main.height - 150, 'BỎ QUA', {
            font: '14px Arial ',
            color: '#ffffff',
            padding: { x: 8, y: 5 },
            backgroundColor: '#CC9933'
        })
            .setInteractive() // Make the text interactive
            .on('pointerdown', () => {
                console.log('BỎ QUA')
            }) // Pointerdown event
            .setOrigin(0.5, 0.5); // Center the button

        // Additional setup for the Play Card button, such as setting its position and depth
        playButton.setDepth(1);
    }

    /**
     * INIT GAME
     */
    init() {
    }

    /**
     * PRELOAD GAME 
    */
    preload() {
        // console.log('preload game')
        this.load.atlas('cards', "assets/images/atlas/cards.png", "assets/images/atlas/cards.json");
    }

    /**
    * CREATE GAME SCENE
    */
    create(): void {
        // this.playerHand = this.deck.dealCards(13);
        // this.displayPlayerHand(this.playerHand);

        this.createPlayButton();
        this.createSortButton();
        this.createSkipButton();
    }

    /**
     * UPDATE GAME SCENE
     */
    update() {
    }

}

export default GamePlay;