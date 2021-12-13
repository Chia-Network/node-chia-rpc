export interface FoliageTransactionBlock {
    prev_transaction_block_hash: string;
    timestamp: number;
    filter_hash: string;
    additions_root: string;
    removals_root: string;
    transactions_info_hash: string;
}
