import { ChallengeChainSubSlot } from './ChallengeChainSubSlot';
import { InfusedChallengeChainSubSlot } from './InfusedChallengeChainSubSlot';
import { RewardChainSubSlot } from './RewardChainSubSlot';
import { SubSlotProofs } from './SubSlotProofs';

export interface EndOfSubSlotBundle {
    challenge_chain: ChallengeChainSubSlot;
    infused_challenge_chain: InfusedChallengeChainSubSlot | null;
    reward_chain: RewardChainSubSlot;
    proofs: SubSlotProofs;
}
