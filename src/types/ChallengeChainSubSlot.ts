import { VdfInfo } from './VdfInfo';

export interface ChallengeChainSubSlot {
    challenge_chain_end_of_slot_vdf: VdfInfo;
    infused_challenge_chain_sub_slot_hash: string | null;
    subepoch_summary_hash: string | null;
    new_sub_slot_iters: number | null;
    new_difficulty: number | null;
}
