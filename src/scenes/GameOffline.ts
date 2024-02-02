/**
 * GameOffline not using websocket
 * */
import Phaser from "phaser";
import Card from "../models/Card";
import CardHolder from "../models/CardsHolder";
import Deck from "../models/Deck";
import { sortByRank } from "../utils/Utils";

export default class GameOffline extends Phaser.Scene {
    private playerHand: CardHolder[] | undefined;
    private selectedCards: CardHolder[] = [];
    private deck: Deck;

    playerHand_A!: Card[];
    playerHand_B!: Card[];
    playerHand_C!: Card[];
    playerHand_D!: Card[];
    playerHand_Selected_A: Phaser.GameObjects.Sprite[] = new Array<Phaser.GameObjects.Sprite>;

    // Assuming there is a variable to keep track of the last card played
    private lastCardPlayed: Phaser.GameObjects.Sprite | null = null;

    constructor() {
        super({ key: 'GameOffline' });
        this.deck = new Deck();
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
        const playButton = this.add.text(this.cameras.main.centerX + 200, this.cameras.main.height - 150, 'XẾP BÀI', {
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

    displayPlayerHand_A(cards: Card[]) {
        const startX = this.cameras.main.width / 2 - (cards.length * 30) / 2;
        const startY = this.cameras.main.height - 70;

        cards.sort(sortByRank);

        cards.forEach((card, index) => {
            const cardSprite = this.add.sprite(startX + index * 30, startY, 'cards', card.getFrame());
            cardSprite.scale = 0.5;
            cardSprite.setInteractive();
            cardSprite.setData('selected', false);
            cardSprite.setData('card', card);
            cardSprite.setDepth(index);
            cardSprite.on('pointerdown', () => {
                this.selectedCard(cardSprite, card);
            });
        });
    }

    displayPlayerHand_B(cards: Card[]) {

        const startX = this.cameras.main.width - 70;
        const startY = 150;

        cards.forEach((card, index) => {
            const cardSprite = this.add.sprite(startX, startY + index * 30, 'cards', card.getFrame());
            cardSprite.angle = 90;
            cardSprite.scale = 0.5;
            cardSprite.setInteractive();
            cardSprite.on('pointerdown', () => {
                // this.playCard(cardSprite);
                console.log('NOT YOUR CARD')
            });
        });

    }
    displayPlayerHand_C(cards: Card[]) {
        const startX = this.cameras.main.width / 2 - (cards.length * 30) / 2;;
        const startY = 70;

        cards.forEach((card, index) => {
            const cardSprite = this.add.sprite(startX + index * 30, startY, 'cards', card.getFrame());
            // cardSprite.angle = 90;
            cardSprite.scale = 0.5;
            cardSprite.setInteractive();
            cardSprite.on('pointerdown', () => {
                // this.playCard(cardSprite);
                console.log('NOT YOUR CARD')
            });
        });
    }
    displayPlayerHand_D(cards: Card[]) {
        const startX = 70;
        const startY = this.cameras.main.height / 2 - (cards.length * 30) / 2;;

        cards.forEach((card, index) => {
            const cardSprite = this.add.sprite(startX, startY + index * 30, 'cards', card.getFrame());
            cardSprite.angle = 90;
            cardSprite.scale = 0.5;
            cardSprite.setInteractive();
            cardSprite.on('pointerdown', () => {
                // this.playCard(cardSprite);
                console.log('NOT YOUR CARD')
            });
        });
    }

    private displayPlayerHand(playerHand: Card[]): void {

        const startX = this.cameras.main.width / 2 - (playerHand.length * 30) / 2;
        const startY = this.cameras.main.height - 70;

        playerHand.forEach((card, index) => {
            const cardSprite = this.add.sprite(startX + index * 30, startY, 'cards', card.getFrame());
            cardSprite.scale = 0.7;
            cardSprite.setInteractive();
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

    private selectedCard(cardSprite: Phaser.GameObjects.Sprite, card: Card): void {
        let selected_flag = cardSprite.getData('selected');
        // console.log(selected_flag)
        if (!selected_flag) {
            // this.selectedCards.push(card);
            cardSprite.y = cardSprite.y - 20;
            cardSprite.setData('selected', true);
            this.playerHand_Selected_A.push(cardSprite);
        } else {
            cardSprite.y = cardSprite.y + 20;
            cardSprite.setData('selected', false);
            const index = this.playerHand_Selected_A.findIndex(c => c === cardSprite);
            if (index !== -1) {
                this.playerHand_Selected_A.splice(index, 1);
            }
        }
        // console.log(this.playerHand_Selected_A);
    }
    count = 0;
    private playCard_A(cards: Phaser.GameObjects.Sprite[]) {
        // The coordinates for the center of the table
        const centerX = this.cameras.main.width / 2 - (cards.length * 30) / 2;
        const centerY = this.cameras.main.height / 2 + 100;
        cards.forEach((card, index) => {
            this.tweens.add({
                targets: card,
                y: centerY,
                x: centerX + index * 30,
                ease: 'Power2',
                duration: 400, // Duration in milliseconds
                onStart: () => { card.setDepth(this.count++); },
                onComplete: () => { }
            });
        });
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
        const shrinkScale = 0.4;

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
                const index = this.playerHand_A.findIndex(c => c === cardSprite.getData('card'));
                if (index !== -1) {
                    this.playerHand_A.splice(index, 1);
                    console.log(this.playerHand_A)
                }
            }
        });
    }

    private onPlayCardButtonClicked(): void {
        // Logic to handle when the Play Card button is clicked
        this.playCard_A(this.playerHand_Selected_A);
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
        // Button
        this.createPlayButton();
        this.createSkipButton();
        this.createSortButton();

        // Deal Cards
        // this.playerHand = this.deck.dealCards(13);
        // this.displayPlayerHand(this.playerHand);
        this.playerHand_A = this.deck.dealCards(13);
        this.displayPlayerHand_A(this.playerHand_A)
        this.playerHand_B = this.deck.dealCards(13);
        this.displayPlayerHand_B(this.playerHand_B)
        this.playerHand_C = this.deck.dealCards(13);
        this.displayPlayerHand_C(this.playerHand_C)
        this.playerHand_D = this.deck.dealCards(13);
        this.displayPlayerHand_D(this.playerHand_D)
    }

    /**
     * UPDATE GAME SCENE
     */
    update() {
        if (this.playerHand_A.length = 0) {
            console.log('HẾT BÀI')
        }
    }
}