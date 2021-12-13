import { VdfInfo } from './VdfInfo';
import { VdfProof } from './VdfProof';

export interface SignagePoint {
    cc_vdf: VdfInfo | null;
    cc_proof: VdfProof | null;
    rc_vdf: VdfInfo | null;
    rc_proof: VdfProof | null;
}
