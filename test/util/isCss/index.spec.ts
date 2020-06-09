import { expect } from 'chai';

import isCss from '../../../src/util/isCss';

const cssPaths: string[] = [
    'foo/file.css',
    'src/foo/bar/file.CSS',
    'http://foo.com/bar.css',
];

const nonCssPaths: string[] = ['foo/filecss', 'file', 'file.scss'];

describe('isCss', () => {
    it('should return true for css files', () => {
        for (const cssPath of cssPaths) {
            expect(isCss(cssPath)).to.equal(true);
        }
    });

    it('should return false for non-css files', () => {
        for (const nonCssPath of nonCssPaths) {
            expect(isCss(nonCssPath)).to.equal(false);
        }
    });
});
