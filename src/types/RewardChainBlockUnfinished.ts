import { ProofOfSpace } from './ProofOfSpace';
import { VdfInfo } from './VdfInfo';

export interface RewardChainBlockUnfinished {
    total_iters: number;
    signage_point_index: number;
    pos_ss_cc_challenge_hash: string;
    proof_of_space: ProofOfSpace;
    challenge_chain_sp_vdf: VdfInfo | null;
    challenge_chain_sp_signature: string;
    reward_chain_sp_vdf: VdfInfo | null;
    reward_chain_sp_signature: string;
}
