import { Coin } from './Coin';

export interface CoinRecord {
    coin: Coin;
    confirmed_block_index: number;
    spent_block_index: number;
    coinbase: boolean;
    timestamp: number;
}
