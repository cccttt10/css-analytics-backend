import { expect } from 'chai';

import isVendorPrefixed from '../../../src/util/isVendorPrefixed';

const prefixedProperties: string[] = [
    '-ms-background-image',
    'mso-background-image', // Microsoft
    '-moz-background-image', // Mozilla
    '-o-background-image',
    '-xv-background-image', // Opera Software
    '-atsc-background-image', //	Advanced Television Standards Committee
    '-wap-background-image', //	The WAP Forum
    '-khtml-background-image', //	KDE
    '-webkit-background-image', //	Apple
    'prince-background-image', //	YesLogic
    '-ah-background-image', //	Antenna House
    '-hp-background-image', //	Hewlett Packard
    '-ro-background-image', //	Real Objects
    '-rim-background-image', //	Research In Motion
    '-tc-background-image', //	TallComponents
];

const unprefixedProperties: string[] = [
    'background-image',
    'foo-bar',
    '-not-valid-background-image',
    '-mozbackground-image',
    'mox-background-image',
];

describe('isVendorPrefixed', () => {
    it('should return true for prefixed properties', () => {
        for (const property of prefixedProperties) {
            expect(isVendorPrefixed(property)).to.equal(true);
        }
    });

    it('should return false for unprefixed properties', () => {
        for (const property of unprefixedProperties) {
            expect(isVendorPrefixed(property)).to.equal(false);
        }
    });
});
