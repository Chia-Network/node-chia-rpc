import { FoliageBlockData } from './FoliageBlockData';

export interface Foliage {
    prev_block_hash: string;
    reward_block_hash: string;
    foliage_block_data: FoliageBlockData;
    foliage_block_data_signature: string;
    foliage_transaction_block_hash: string | null;
    foliage_transaction_block_signature: string | null;
}
