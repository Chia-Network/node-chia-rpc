import { PoolTarget } from './PoolTarget';

export interface FoliageBlockData {
    unfinished_reward_block_hash: string;
    pool_target: PoolTarget;
    pool_signature: string | null;
    farmer_reward_puzzle_hash: string;
    extension_data: string;
}
