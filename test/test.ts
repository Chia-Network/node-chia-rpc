import { assert } from 'chai';
import { describe } from 'mocha';
import {
    addressInfo,
    formatHex,
    sanitizeHex,
    toAddress,
    toCoinId,
} from '../src';

describe('Addresses', () => {
    describe('To hash', () => {
        it('Is correct', () =>
            assert.deepEqual(
                addressInfo(
                    'txch1pt49mlq270jdn8jftyq60rua92x0vy2jgwykd2ewt4cg36md4dmqrvk9ul'
                ),
                {
                    hash: Buffer.from(
                        '0aea5dfc0af3e4d99e495901a78f9d2a8cf61152438966ab2e5d7088eb6dab76',
                        'hex'
                    ),
                    prefix: 'txch',
                }
            ));
    });

    describe('From hash', () => {
        it('Is correct', () => {
            assert.deepEqual(
                toAddress(
                    Buffer.from(
                        '0aea5dfc0af3e4d99e495901a78f9d2a8cf61152438966ab2e5d7088eb6dab76',
                        'hex'
                    ),
                    'txch'
                ),
                'txch1pt49mlq270jdn8jftyq60rua92x0vy2jgwykd2ewt4cg36md4dmqrvk9ul'
            );
        });
    });
});

describe('Coin id', () => {
    it('Is correct', () =>
        assert.deepEqual(
            toCoinId({
                parent_coin_info:
                    '0x0aea5dfc0af3e4d99e495901a78f9d2a8cf61152438966ab2e5d7088eb6dab76',
                puzzle_hash:
                    '0x0aea5dfc0af3e4d99e495901a78f9d2a8cf61152438966ab2e5d7088eb6dab76',
                amount: 1000,
            }),
            Buffer.from(
                'b9f294f81c2da9e0516cca4cef647b157116ad6c13121f59ab432417c5e2c3f7',
                'hex'
            )
        ));
});

describe('Hex', () => {
    describe('Sanitize formatted', () => {
        it('Is correct', () =>
            assert.equal(
                sanitizeHex(
                    '0x0aea5dfc0af3e4d99e495901a78f9d2a8cf61152438966ab2e5d7088eb6dab76'
                ),
                '0aea5dfc0af3e4d99e495901a78f9d2a8cf61152438966ab2e5d7088eb6dab76'
            ));
    });

    describe('Sanitize plain', () => {
        it('Is correct', () =>
            assert.equal(
                sanitizeHex(
                    '0aea5dfc0af3e4d99e495901a78f9d2a8cf61152438966ab2e5d7088eb6dab76'
                ),
                '0aea5dfc0af3e4d99e495901a78f9d2a8cf61152438966ab2e5d7088eb6dab76'
            ));
    });

    describe('Format plain', () => {
        it('Is correct', () =>
            assert.equal(
                formatHex(
                    '0aea5dfc0af3e4d99e495901a78f9d2a8cf61152438966ab2e5d7088eb6dab76'
                ),
                '0x0aea5dfc0af3e4d99e495901a78f9d2a8cf61152438966ab2e5d7088eb6dab76'
            ));
    });

    describe('Format prefixed', () => {
        it('Is correct', () =>
            assert.equal(
                formatHex(
                    '0x0aea5dfc0af3e4d99e495901a78f9d2a8cf61152438966ab2e5d7088eb6dab76'
                ),
                '0x0aea5dfc0af3e4d99e495901a78f9d2a8cf61152438966ab2e5d7088eb6dab76'
            ));
    });
});
