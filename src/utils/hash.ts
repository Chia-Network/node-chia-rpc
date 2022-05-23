import {
    concatBytes,
    encodeInt,
    fromHex,
    hash256,
} from '@rigidity/bls-signatures';
import { Coin } from '../types/Coin';
import { sanitizeHex } from './hex';

export function toCoinId(coin: Coin): Uint8Array {
    return hash256(
        concatBytes(
            fromHex(sanitizeHex(coin.parent_coin_info)),
            fromHex(sanitizeHex(coin.puzzle_hash)),
            encodeInt(coin.amount)
        )
    );
}
