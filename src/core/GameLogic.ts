import Phaser from "phaser";
import Card from "../models/Card";
/**
 * Qui Tắc Tiến Lên Miền Nam
 */
const SuitsOrder = ['spades', 'clubs', 'diamonds', 'hearts'];
const RanksOrder = ['3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace', '2'];
const DeckOrder = [
    '3_spades', '3_clubs', '3_diamonds', '3_hearts',
    '4_spades', '4_clubs', '4_diamonds', '4_hearts',
    '5_spades', '5_clubs', '5_diamonds', '5_hearts',
    '6_spades', '6_clubs', '6_diamonds', '6_hearts',
    '7_spades', '7_clubs', '7_diamonds', '7_hearts',
    '8_spades', '8_clubs', '8_diamonds', '8_hearts',
    '9_spades', '9_clubs', '9_diamonds', '9_hearts',
    '10_spades', '10_clubs', '10_diamonds', '10_hearts',
    'Jack_spades', 'Jack_clubs', 'Jack_diamonds', 'Jack_hearts',
    'Queen_spades', 'Queen_clubs', 'Queen_diamonds', 'Queen_hearts',
    'King_spades', 'King_clubs', 'King_diamonds', 'King_hearts',
    'Ace_spades', 'Ace_clubs', 'Ace_diamonds', 'Ace_hearts',
    '2_spades', '2_clubs', '2_diamonds', '2_hearts',
];

/**
 * Sảnh 
 */
// Sort cards by their ranks according to RanksOrder
export function sortCards(cards: Card[]): Card[] {
    return cards.sort((a, b) => RanksOrder.indexOf(a.rank) - RanksOrder.indexOf(b.rank));
}

// Check if the cards form a Straight
export function isStraight(cards: Card[]): boolean {
    if (cards.length < 3 || cards.length > 13) {
        return false;
    }

    const sortedCards = sortCards(cards);

    for (let i = 0; i < sortedCards.length - 1; i++) {
        if (RanksOrder.indexOf(sortedCards[i + 1].rank) - RanksOrder.indexOf(sortedCards[i].rank) !== 1) {
            return false;
        }
    }

    return true;
}

export class GameLogic {
    /**
     * Các lá bài đã đánh trên bàn
     */
    cardOnTable!: Card[];

    constructor() {
    }

    /**
     * 
     * @param cards Người chơi đánh bài ra bàn
     * @param newGame Nếu là game mới thì 3 bích được phép đánh trước
     */
    checkRule(cards: Card[], newGame: boolean) {
        if (newGame) {

        }

    }


}

export function baBich_check(cards: Card[]): boolean {
    let found3Spades = false;
    cards.forEach((card) => {
        if (card.rank === '3' && card.suit === 'spades') {
            found3Spades = true;
        }
    });
    return found3Spades;
}