import { EndOfSubSlotBundle } from './EndOfSubSlotBundle';
import { Foliage } from './Foliage';
import { FoliageBlockData } from './FoliageBlockData';
import { RewardChainBlockUnfinished } from './RewardChainBlockUnfinished';
import { VdfProof } from './VdfProof';

export interface UnfinishedBlockHeader {
    finished_sub_slots: EndOfSubSlotBundle[];
    reward_chain_block: RewardChainBlockUnfinished;
    challenge_chain_sp_proof: VdfProof | null;
    reward_chain_sp_proof: VdfProof | null;
    foliage: Foliage;
    foliage_transaction_block: FoliageBlockData | null;
    transactions_filter: string;
}
