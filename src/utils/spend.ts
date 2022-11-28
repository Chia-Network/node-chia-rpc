import { AugSchemeMPL, JacobianPoint } from 'chia-bls';
import { SpendBundle } from '../types/SpendBundle';

export function aggregateSpendBundles(
    spendBundles: SpendBundle[]
): SpendBundle {
    return {
        coin_spends: spendBundles
            .map((spendBundle) => spendBundle.coin_spends)
            .flat(),
        aggregated_signature: AugSchemeMPL.aggregate(
            spendBundles.map((spendBundle) =>
                JacobianPoint.fromHexG2(spendBundle.aggregated_signature)
            )
        ).toHex(),
    };
}
