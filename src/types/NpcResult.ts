import { Npc } from './Npc';

export interface NpcResult {
    error: number[];
    npc_list: Npc[];
    clvm_cost: number;
}
