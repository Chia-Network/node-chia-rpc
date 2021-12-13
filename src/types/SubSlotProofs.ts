import { VdfProof } from './VdfProof';

export interface SubSlotProofs {
    challenge_chain_slot_proof: VdfProof;
    infused_challenge_chain_slot_proof: VdfProof | null;
    reward_chain_slot_proof: VdfProof;
}
