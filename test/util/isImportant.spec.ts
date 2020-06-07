import { expect } from 'chai';

import isImportant from '../../src/util/isImportant';

const importantValues: string[] = [
    'blue !important',
    'thin solid #fafafa !important',
    'transparent !important',
];

const unimportantValues: string[] = [
    'green',
    'thin solid #fafafa',
    'url(http://foo.bar/important.jpg)',
];

describe('isImportant', () => {
    it('should return true for important values', () => {
        for (const importantValue of importantValues) {
            expect(isImportant(importantValue)).to.equal(true);
        }
    });

    it('should return false for unimportant values', () => {
        for (const unimportantValue of unimportantValues) {
            expect(isImportant(unimportantValue)).to.equal(false);
        }
    });
});
