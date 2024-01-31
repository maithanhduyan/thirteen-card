import Phaser from "phaser";
import Card from "../models/Card";
import CardHolder from "../models/CardsHolder";
import Deck from "../models/Deck";
import WebSocketClient from "../api/WebSocketClient";
import { Game_Status } from "../config";

class GamePlay extends Phaser.Scene {
    private fpsText: Phaser.GameObjects.Text | undefined;
    private playerHand: CardHolder[] | undefined;
    private selectedCards: CardHolder[] = [];
    private deck: Deck;
    private status: string = Game_Status.NOT_READY_YET;

    // Assuming there is a variable to keep track of the last card played
    private lastCardPlayed: Phaser.GameObjects.Sprite | null = null;

    webSocketClient: WebSocketClient = new WebSocketClient();
    constructor() {
        super({ key: 'GamePlay' });
        this.deck = new Deck();
        this.webSocketClient.onMessageReceived = this.handleMessageReceived.bind(this);
    }

    private handleMessageReceived(server_response: string): void {
        try {
            const json = JSON.parse(server_response);
            if (json.server_command && json.data) {
                // console.log(json.data);
                const cardsData = json.data;
                console.log(cardsData.length)
                const cards = cardsData.map((cardData: { rank: string; suit: string; name: any; }) => new Card(cardData.rank, cardData.suit, cardData.name));
                console.log(cards)
                this.displayPlayerHand(cards);
            }
        } catch (error) {
            console.error('Error parsing server response:', error);
        }
    }

    private displayPlayerHand(playerHand: Card[]): void {
        const startX = this.cameras.main.width / 2 - (playerHand.length * 30) / 2;
        const startY = this.cameras.main.height;

        playerHand.forEach((card, index) => {
            const cardSprite = this.add.sprite(startX + index * 30, startY, 'cards', card.getFrame());
            cardSprite.setInteractive();
            // this.input.setDraggable(cardSprite);
            // Set up a click event listener for each card
            cardSprite.on('pointerdown', () => {
                // this.playCard(cardSprite);
                // if (card.isSelected) {
                //     this.selectedCards.push(card);
                // } else {
                //     this.selectedCards = this.selectedCards.filter(c => c !== card);
                // }
                cardSprite.y = startY - 50;
                console.log(cardSprite);
            });
            // Additional code to set up card behavior and interactivity
        });
    }

    private playSelectedCards(): void {
        // Play all selected cards
        this.selectedCards.forEach(card => {
            // Assuming playCard is a method that animates the card to the center and then hides it
            this.playCard(card.sprite);
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
        this.webSocketClient.sendMessage('CHIA_BAI');
        // Logic to handle when the Play Card button is clicked
        // It could involve checking if a card is selected and then playing that card
    }

    /**
     * INIT GAME
     */
    init() {
        // console.log('init game')
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
        this.playerHand = this.deck.dealCards(13);
        this.displayPlayerHand(this.playerHand);

        // Add a Play Card button
        const playCardButton = this.add.text(this.cameras.main.centerX + 300, this.cameras.main.height - 150, 'ĐÁNH BÀI', {
            font: '14px Arial',
            fill: '#ffffff',
            padding: { x: 8, y: 5 },
            backgroundColor: '#0000ff'
        })
            .setInteractive() // Make the text interactive
            .on('pointerdown', () => this.onPlayCardButtonClicked()) // Pointerdown event
            .setOrigin(0.5, 0.5); // Center the button

        // Additional setup for the Play Card button, such as setting its position and depth
        playCardButton.setDepth(10);

        // Create a text object to display the FPS
        this.fpsText = this.add.text(10, 10, '', {
            font: '12px Arial',
            fill: '#ffffff'
        }).setDepth(1);

        // console.log('created');
    }

    showFPS(flag: boolean) {
        // Update the FPS text with the current FPS
        if (flag)
            this.fpsText.setText(`FPS: ${this.game.loop.actualFps.toFixed(2)}`);
    }

    /**
     * UPDATE GAME SCENE
     */
    update() {
        this.showFPS(false);
    }
}

export default GamePlay;