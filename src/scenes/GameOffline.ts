/**
 * GameOffline not using websocket
 * */
import Phaser from "phaser";
import Card from "../models/Card";
import Deck from "../models/Deck";
import { sortByRank } from "../utils/Utils";
import { baBich_check, checkCards, isStraight } from "../core/GameLogic";
import Player from "../models/Player";

export default class GameOffline extends Phaser.Scene {
    private deck: Deck;
    newGame = true;

    playerHand_A!: Card[];
    selectedCards!: Card[];
    playerHand_B!: Card[];
    playerHand_C!: Card[];
    playerHand_D!: Card[];

    player_A!: Player;

    cardsOnDeck: Card[] = [];

    centerX!: number;
    centerY!: number;

    constructor() {
        super({ key: 'GameOffline' });
        this.deck = new Deck();
        this.player_A = new Player('A', 'A', 'A');
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
            const cardSprite = this.add.sprite(this.centerX, this.centerY, 'cards', card.getFrame());
            cardSprite.scale = 0.6;
            cardSprite.setInteractive();
            cardSprite.setData('selected', false);
            cardSprite.on('pointerdown', () => {
                this.selectedCard(card);
            });
            card.addSprite(cardSprite);
            this.tweens.add({
                targets: card.sprite,
                x: startX + index * 30,
                y: startY,
                ease: 'Power2',
                duration: 1000
            });
        });

    }

    displayPlayerHand_B(cards: Card[]) {

        const startX = this.cameras.main.width - 70;
        const startY = this.cameras.main.height / 2 - (cards.length * 15) / 2;
        let count = 13;
        cards.forEach((card, index) => {
            const cardSprite = this.add.sprite(startX, startY + index * 17, 'cards', card.getFrame());
            cardSprite.angle = 90;
            cardSprite.scale = 0.5;
            cardSprite.setInteractive();
            cardSprite.setDepth(count--);
            cardSprite.on('pointerdown', () => {
                console.log('NOT YOUR CARD')
            });
        });

    }

    displayPlayerHand_C(cards: Card[]) {
        const startX = this.cameras.main.width / 2 - (cards.length * 15) / 2;;
        const startY = 70;

        cards.forEach((card, index) => {
            const cardSprite = this.add.sprite(startX + index * 15, startY, 'cards', card.getFrame());
            cardSprite.scale = 0.5;
            cardSprite.setInteractive();
            cardSprite.on('pointerdown', () => {
                console.log('NOT YOUR CARD')
            });
        });
    }

    displayPlayerHand_D(cards: Card[]) {
        const startX = 70;
        const startY = this.cameras.main.height / 2 - (cards.length * 15) / 2;;

        cards.forEach((card, index) => {
            const cardSprite = this.add.sprite(startX, startY + index * 15, 'cards', 'back');
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

    }

    private selectedCard(card: Card): void {
        let selected_flag = card.isSelected;
        if (!selected_flag) {
            card.sprite.y = card.sprite.y - 20;
            card.isSelected = true;
            this.player_A.selectedCards.push(card)
        } else {
            card.sprite.y = card.sprite.y + 20;
            card.isSelected = false;
            const index = this.player_A.selectedCards.findIndex(c => c === card);
            if (index !== -1) {
                this.player_A.selectedCards.splice(index, 1);
            }
        }
    }

    count = 0;
    private playCard_A(cards: Card[]) {
        // console.log(cards.length);
        switch (cards.length) {
            case 1: console.log('1 Lá Lẻ'); break;
            case 2: console.log('2 Lá: Đôi'); break;
            case 3: console.log('3 Lá: Sảnh 3 Cây | Tam Cô'); break;
            case 4: console.log('4 Lá: Sảnh 4 Cây | Tứ Quý | Tứ Quý 2 Tới Trắng'); break;
            case 5: console.log('5 Lá: Sảnh 5 Cây'); break;
            case 6: console.log('6 Lá: Sảnh 6 Cây | 3 Đôi Thông'); break;
            case 7: console.log('7 Lá: Sảnh 7 Cây'); break;
            case 8: console.log('8 Lá: Sảnh 8 Cây | 4 Đôi Thông'); break;
            case 9: console.log('9 Lá: Sảnh 9 Cây'); break;
            case 10: console.log('10 Lá: Sảnh 10 Cây | 5 Đôi Thông'); break;
            case 11: console.log('11 Lá: Sảnh 11 Cây'); break;
            case 12: console.log('12 Lá: Sảnh 12 Cây | 6 Đôi Thông Tới Trắng'); break;
            case 13: console.log('13 Lá: Sảnh 13 Cây, Rồng Tới Trắng | '); break;
            default: console.log('not case'); break;
        }
        const centerX = this.cameras.main.width / 2 - (cards.length * 30) / 2;
        const centerY = this.cameras.main.height / 2 + 100;
        cards.forEach((card, index) => {
            this.tweens.add({
                targets: card.sprite,
                y: centerY,
                x: centerX + index * 30,
                ease: 'Power2',
                duration: 400,
                onStart: () => { card.sprite.setDepth(this.count++); },
                onComplete: () => {
                    const index = this.player_A.cards.findIndex(c => c === card);
                    if (index !== -1) {
                        this.player_A.cards.splice(index, 1);
                        this.cardsOnDeck.push(card);
                    }
                }
            });
        });
        this.player_A.selectedCards.length = 0;
    }

    private resortCard_A() {
        const startX = this.cameras.main.width / 2 - (this.playerHand_A.length * 30) / 2;
        this.playerHand_A.forEach((card, index) => {
            card.sprite.setX(startX + index * 30);
        });
    }

    private onPlayCardButtonClicked(): void {
        this.playCard_A(this.player_A.selectedCards);
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

        this.centerX = this.cameras.main.width / 2;
        this.centerY = this.cameras.main.height / 2;

        // Button
        this.createPlayButton();
        // this.createSkipButton();
        // this.createSortButton();

        // Deal Cards
        // this.playerHand = this.deck.dealCards(13);
        // this.displayPlayerHand(this.playerHand);
        let cards = this.deck.dealCards(13);
        this.player_A.addCards(cards);
        // this.playerHand_A = this.deck.dealCards(13);
        this.displayPlayerHand_A(this.player_A.cards);
        // this.playerHand_B = this.deck.dealCards(13);
        // this.displayPlayerHand_B(this.playerHand_B)
        // this.playerHand_C = this.deck.dealCards(13);
        // this.displayPlayerHand_C(this.playerHand_C)
        // this.playerHand_D = this.deck.dealCards(13);
        // this.displayPlayerHand_D(this.playerHand_D)
    }

    /**
     * UPDATE GAME SCENE
     */
    update() {
        if (this.player_A.cards.length == 0) {
            // console.log('HẾT BÀI');
        }
    }
}