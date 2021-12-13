import { Coin } from './Coin';

export interface TransactionsInfo {
    generator_root: string;
    generator_refs_root: string;
    aggregated_signature: string;
    fees: number;
    cost: number;
    reward_claims_incorporated: Coin[];
}
