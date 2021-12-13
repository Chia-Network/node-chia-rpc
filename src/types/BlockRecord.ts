import { ClassgroupElement } from './ClassgroupElement';
import { Coin } from './Coin';
import { SubEpochSummary } from './SubEpochSummary';

export interface BlockRecord {
    header_hash: string;
    prev_hash: string;
    height: number;
    weight: number;
    total_iters: number;
    signage_point_index: number;
    challenge_vdf_output: ClassgroupElement;
    infused_challenge_vdf_output: ClassgroupElement | null;
    reward_infusion_new_challenge: string;
    challenge_block_info_hash: string;
    sub_slot_iters: number;
    pool_puzzle_hash: string;
    farmer_puzzle_hash: string;
    required_iters: number;
    deficit: number;
    overflow: boolean;
    prev_transaction_block_height: number;
    timestamp: number | null;
    prev_transaction_block_hash: string | null;
    fees: number | null;
    reward_claims_incorporated: Coin[] | null;
    finished_challenge_slot_hashes: string[] | null;
    finished_infused_challenge_slot_hashes: string[] | null;
    finished_reward_slot_hashes: string[] | null;
    sub_epoch_summary_included: SubEpochSummary | null;
}
