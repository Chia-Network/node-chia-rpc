import { ConditionOpcode } from './ConditionOpcode';

export interface ConditionWithArgs {
    opcode: keyof typeof ConditionOpcode;
    vars: string[];
}
