import { ConditionOpcode } from './ConditionOpcode';
import { ConditionWithArgs } from './ConditionWithArgs';

export interface Npc {
    coin_name: string;
    puzzle_hash: string;
    conditions: [ConditionOpcode, ConditionWithArgs[]][];
}
