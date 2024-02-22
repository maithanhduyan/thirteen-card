import { RanksOrder, SuitsOrder } from "../config";
import Card from "../models/Card";

export function sortByRank(a: Card, b: Card) {
    // So sánh rank trước
    const rankComparison = RanksOrder.indexOf(a.rank) - RanksOrder.indexOf(b.rank);
    if (rankComparison !== 0) {
        return rankComparison;
    } else {
        // Nếu rank giống nhau, so sánh suit
        return SuitsOrder.indexOf(a.suit) - SuitsOrder.indexOf(b.suit);
    }
}

export function sortBySuit(a: Card, b: Card) {
    // So sánh suit trước
    if (SuitsOrder.indexOf(a.suit) < SuitsOrder.indexOf(b.suit)) {
        return -1;
    } else if (SuitsOrder.indexOf(a.suit) > SuitsOrder.indexOf(b.suit)) {
        return 1;
    } else {
        // Suit bằng nhau, so sánh rank
        if (RanksOrder.indexOf(a.rank) < RanksOrder.indexOf(b.rank)) {
            return -1;
        } else if (RanksOrder.indexOf(a.rank) > RanksOrder.indexOf(b.rank)) {
            return 1;
        } else {
            return 0; // rank và suit giống nhau
        }
    }
}

export function LOG(...data: any[]){
    console.log(...data);
}