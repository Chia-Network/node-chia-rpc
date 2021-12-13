import { VdfInfo } from './VdfInfo';

export interface RewardChainSubSlot {
    end_of_slot_vdf: VdfInfo;
    challenge_chain_sub_slot_hash: string;
    infused_challenge_chain_sub_slot_hash: string | null;
    deficit: number;
}
