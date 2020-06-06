import { expect } from 'chai';

import cssUrlRegex from '../../src/util/cssUrlRegex';

const matches: string[] = [
    'url(foo.css)',
    "url('foo.css')",
    'url(foo/bar.css)',
    'url(http://google.com/foo/bar)',
];

const nonMatches: string[] = ['foo', '(foo.css)', 'url (foo.css)'];

describe('cssUrlRegex', () => {
    it('should match urls', () => {
        matches.forEach((match: string) => {
            expect(cssUrlRegex().test(match)).to.equal(true);
        });
    });

    it('should not match invalid urls', () => {
        nonMatches.forEach((nonMatch: string) => {
            expect(cssUrlRegex().test(nonMatch)).to.equal(false);
        });
    });
});
