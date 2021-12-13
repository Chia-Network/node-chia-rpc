import { Coin } from './Coin';
import { NpcResult } from './NpcResult';
import { SpendBundle } from './SpendBundle';

export interface MempoolItem {
    spend_bundle: SpendBundle;
    fee: number;
    npc_result: NpcResult;
    cost: number;
    spend_bundle_name: string;
    additions: Coin[];
    removals: Coin[];
    program: string;
}
