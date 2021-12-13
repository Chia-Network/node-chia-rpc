export interface ProofOfSpace {
    challenge: string;
    pool_public_key: string | null;
    pool_contract_puzzle_hash: string | null;
    plot_public_key: string;
    size: number;
    proof: string;
}
