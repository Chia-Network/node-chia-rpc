import { EndOfSubSlotBundle } from './EndOfSubSlotBundle';
import { Foliage } from './Foliage';
import { FoliageTransactionBlock } from './FoliageTransactionBlock';
import { RewardChainBlock } from './RewardChainBlock';
import { TransactionsInfo } from './TransactionsInfo';
import { VdfProof } from './VdfProof';

export interface FullBlock {
    finished_sub_slots: EndOfSubSlotBundle[];
    reward_chain_block: RewardChainBlock;
    challenge_chain_sp_proof: VdfProof | null;
    challenge_chain_ip_proof: VdfProof;
    reward_chain_sp_proof: VdfProof | null;
    reward_chain_ip_proof: VdfProof;
    infused_challenge_chain_ip_proof: VdfProof | null;
    foliage: Foliage;
    foliage_transaction_block: FoliageTransactionBlock | null;
    transactions_info: TransactionsInfo | null;
    transactions_generator: string | null;
    transactions_generator_ref_list: number[];
}
