import { ClassgroupElement } from './ClassgroupElement';

export interface VdfInfo {
    challenge: string;
    number_of_iterations: number;
    output: ClassgroupElement;
}
