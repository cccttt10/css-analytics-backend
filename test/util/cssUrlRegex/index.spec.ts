import { expect } from 'chai';

import cssUrlRegex from '../../../src/util/cssUrlRegex';

const matches: string[] = [
    'url(foo.css)',
    "url('foo.css')",
    'url(foo/bar.css)',
    'url(http://google.com/foo/bar)',
];

const nonMatches: string[] = ['foo', '(foo.css)', 'url (foo.css)'];

describe('cssUrlRegex', () => {
    it('should match urls', () => {
        for (const match of matches) {
            expect(cssUrlRegex().test(match)).to.equal(true);
        }
    });

    it('should not match invalid urls', () => {
        for (const nonMatch of nonMatches) {
            expect(cssUrlRegex().test(nonMatch)).to.equal(false);
        }
    });
});
