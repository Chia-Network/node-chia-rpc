import { BlockRecord } from '../types/BlockRecord.js';
import { CoinRecord } from '../types/CoinRecord.js';
import { CoinSpend } from '../types/CoinSpend.js';
import { EndOfSubSlotBundle } from '../types/EndOfSubSlotBundle.js';
import { FullBlock } from '../types/FullBlock.js';
import { MempoolItem } from '../types/MempoolItem.js';
import { SignagePoint } from '../types/SignagePoint.js';
import { SpendBundle } from '../types/SpendBundle.js';
import { UnfinishedBlockHeader } from '../types/UnfinishedBlockHeader.js';
import { Client } from './Client.js';
import { Response } from './Response.js';

export interface GetInitialFreezePeriod {
    INITIAL_FREEZE_END_TIMESTAMP: 1620061200;
}

export interface GetBlockchainState {
    blockchain_state: BlockchainState;
}

export type BlockchainState =
    | UninitializedBlockchainState
    | InitializedBlockchainState;

export interface UninitializedBlockchainState {
    peak: null;
    genesis_challenge_initialized: false;
    sync: {
        sync_mode: false;
        synced: false;
        sync_tip_height: 0;
        sync_progress_height: 0;
    };
    difficulty: 0;
    sub_slot_iters: 0;
    space: 0;
    mempool_size: 0;
}

export interface InitializedBlockchainState {
    peak: BlockRecord | null;
    genesis_challenge_initialized: true;
    difficulty: number;
    sub_slot_iters: number;
    space: number;
    mempool_size: number;
    sync: {
        sync_mode: boolean;
        synced: boolean;
        sync_tip_height: number;
        sync_progress_height: number;
    };
}

export interface GetNetworkInfo {
    network_name: string;
    network_prefix: string;
}

export interface GetRecentSignagePoint {
    signage_point: SignagePoint;
    time_received: number;
    reverted: boolean;
}

export interface GetRecentEos {
    eos: EndOfSubSlotBundle;
    time_received: number;
    reverted: boolean;
}

export interface GetBlock {
    block: FullBlock;
}

export interface GetBlocks {
    blocks: FullBlock[] | (FullBlock & { header_hash: string })[];
}

export interface GetBlockRecords {
    block_records: BlockRecord[];
}

export interface GetBlockRecordByHeight {
    block_record: BlockRecord;
}

export interface GetBlockRecord {
    block_record: BlockRecord;
}

export interface GetUnfinishedBlockHeaders {
    headers: UnfinishedBlockHeader[];
}

export interface GetNetworkSpace {
    space: number;
}

export interface GetCoinRecordsByPuzzleHash {
    coin_records: CoinRecord[];
}

export interface GetCoinRecordsByPuzzleHashes {
    coin_records: CoinRecord[];
}

export interface GetCoinRecordByName {
    coin_record: CoinRecord;
}

export interface GetCoinRecordsByNames {
    coin_records: CoinRecord[];
}

export interface GetCoinRecordsByParentIds {
    coin_records: CoinRecord[];
}

export interface PushTx {
    status: 'SUCCESS' | 'PENDING';
}

export interface GetPuzzleAndSolution {
    coin_solution: CoinSpend;
}

export interface GetAdditionsAndRemovals {
    additions: CoinRecord[];
    removals: CoinRecord[];
}

export interface GetAllMempoolTxIds {
    tx_ids: string[];
}

export interface GetAllMempoolItems {
    mempool_items: Record<string, MempoolItem>;
}

export interface GetMempoolItemByTxId {
    mempool_item: MempoolItem;
}

export class FullNode extends Client {
    public port: number;

    constructor(root?: string) {
        super(root);
        this.port = this.config.full_node.rpc_port;
    }

    /**
     * @deprecated For backwards compatibility.
     */
    public async getInitialFreezePeriod(): Promise<
        Response<GetInitialFreezePeriod>
    > {
        return await this.request<GetInitialFreezePeriod>(
            'get_initial_freeze_period'
        );
    }

    public async getBlockchainState(): Promise<Response<GetBlockchainState>> {
        return await this.request<GetBlockchainState>('get_blockchain_state');
    }

    public async getNetworkInfo(): Promise<Response<GetNetworkInfo>> {
        return await this.request<GetNetworkInfo>('get_network_info');
    }

    public async getRecentSignagePoint(
        spHash: string
    ): Promise<Response<GetRecentSignagePoint>> {
        return await this.request<GetRecentSignagePoint>(
            'get_recent_signage_point_or_eos',
            {
                sp_hash: spHash,
            }
        );
    }

    public async getRecentEos(
        challengeHash: string
    ): Promise<Response<GetRecentEos>> {
        return await this.request<GetRecentEos>(
            'get_recent_signage_point_or_eos',
            {
                challenge_hash: challengeHash,
            }
        );
    }

    public async getBlock(headerHash: string): Promise<Response<GetBlock>> {
        return await this.request<GetBlock>('get_block', {
            header_hash: headerHash,
        });
    }

    public async getBlocks(
        startHeight: number,
        endHeight: number,
        excludeHeaderHash?: boolean
    ): Promise<Response<GetBlocks>> {
        return await this.request<GetBlocks>('get_blocks', {
            start: startHeight,
            end: endHeight,
            exclude_header_hash: excludeHeaderHash,
        });
    }

    public async getBlockRecords(
        startHeight: number,
        endHeight: number
    ): Promise<Response<GetBlockRecords>> {
        return await this.request<GetBlockRecords>('get_block_records', {
            start: startHeight,
            end: endHeight,
        });
    }

    public async getBlockRecordByHeight(
        height: number
    ): Promise<Response<GetBlockRecordByHeight>> {
        return await this.request<GetBlockRecordByHeight>(
            'get_block_record_by_height',
            {
                height,
            }
        );
    }

    public async getBlockRecord(
        headerHash: string
    ): Promise<Response<GetBlockRecord>> {
        return await this.request<GetBlockRecord>(
            'get_block_record_by_height',
            {
                header_hash: headerHash,
            }
        );
    }

    public async getUnfinishedBlockHeaders(): Promise<
        Response<GetUnfinishedBlockHeaders>
    > {
        return await this.request<GetUnfinishedBlockHeaders>(
            'get_unfinished_block_headers'
        );
    }

    public async getNetworkSpace(
        newerBlockHeaderHash: string,
        olderBlockHeaderHash: string
    ): Promise<Response<GetNetworkSpace>> {
        return await this.request<GetNetworkSpace>('get_network_space', {
            newer_block_header_hash: newerBlockHeaderHash,
            older_block_header_hash: olderBlockHeaderHash,
        });
    }

    public async getCoinRecordsByPuzzleHash(
        puzzleHash: string,
        startHeight?: number,
        endHeight?: number,
        includeSpentCoins?: boolean
    ): Promise<Response<GetCoinRecordsByPuzzleHash>> {
        return await this.request<GetCoinRecordsByPuzzleHash>(
            'get_coin_records_by_puzzle_hash',
            {
                puzzle_hash: puzzleHash,
                start_height: startHeight,
                end_height: endHeight,
                include_spent_coins: includeSpentCoins,
            }
        );
    }

    public async getCoinRecordsByPuzzleHashes(
        puzzleHashes: string[],
        startHeight?: number,
        endHeight?: number,
        includeSpentCoins?: boolean
    ): Promise<Response<GetCoinRecordsByPuzzleHashes>> {
        return await this.request<GetCoinRecordsByPuzzleHashes>(
            'get_coin_records_by_puzzle_hashes',
            {
                puzzle_hashes: puzzleHashes,
                start_height: startHeight,
                end_height: endHeight,
                include_spent_coins: includeSpentCoins,
            }
        );
    }

    public async getCoinRecordByName(
        name: string
    ): Promise<Response<GetCoinRecordByName>> {
        return await this.request<GetCoinRecordByName>(
            'get_coin_record_by_name',
            {
                name,
            }
        );
    }

    public async getCoinRecordsByNames(
        names: string[],
        startHeight?: number,
        endHeight?: number,
        includeSpentCoins?: boolean
    ): Promise<Response<GetCoinRecordsByNames>> {
        return await this.request<GetCoinRecordsByNames>(
            'get_coin_records_by_names',
            {
                names,
                start_height: startHeight,
                end_height: endHeight,
                include_spent_coins: includeSpentCoins,
            }
        );
    }

    public async getCoinRecordsByParentIds(
        parentIds: string[],
        startHeight?: number,
        endHeight?: number,
        includeSpentCoins?: boolean
    ): Promise<Response<GetCoinRecordsByParentIds>> {
        return await this.request<GetCoinRecordsByParentIds>(
            'get_coin_records_by_parent_ids',
            {
                parent_ids: parentIds,
                start_height: startHeight,
                end_height: endHeight,
                include_spent_coins: includeSpentCoins,
            }
        );
    }

    public async pushTx(spendBundle: SpendBundle): Promise<Response<PushTx>> {
        return await this.request<PushTx>('push_tx', {
            spend_bundle: spendBundle,
        });
    }

    public async getPuzzleAndSolution(
        coinId: string,
        height: number
    ): Promise<Response<GetPuzzleAndSolution>> {
        return await this.request<GetPuzzleAndSolution>(
            'get_puzzle_and_solution',
            {
                coin_id: coinId,
                height,
            }
        );
    }

    public async getAdditionsAndRemovals(
        headerHash: string
    ): Promise<Response<GetAdditionsAndRemovals>> {
        return await this.request<GetAdditionsAndRemovals>(
            'get_additions_and_removals',
            {
                header_hash: headerHash,
            }
        );
    }

    public async getAllMempoolTxIds(): Promise<Response<GetAllMempoolTxIds>> {
        return await this.request<GetAllMempoolTxIds>('get_all_mempool_tx_ids');
    }

    public async getMempoolItemByTxId(
        txId: string
    ): Promise<Response<GetMempoolItemByTxId>> {
        return await this.request<GetMempoolItemByTxId>(
            'get_mempool_item_by_tx_id',
            {
                tx_id: txId,
            }
        );
    }
}
