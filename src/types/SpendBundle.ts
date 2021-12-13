import { CoinSpend } from './CoinSpend';

export interface SpendBundle {
    coin_spends: CoinSpend[];
    aggregated_signature: string;
}
