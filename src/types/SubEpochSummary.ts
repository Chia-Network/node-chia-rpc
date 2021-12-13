export interface SubEpochSummary {
    prev_subepoch_summary_hash: string;
    reward_chain_hash: string;
    num_blocks_overflow: number;
    new_difficulty: number | null;
    new_sub_slot_iters: number | null;
}
