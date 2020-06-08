import { expect } from 'chai';

import resolveUrl from '../../../../src/util/getCss/util/resolveUrl';

describe('resolveUrl', () => {
    it('should correctly resolve a .. relative link', () => {
        expect(resolveUrl('http://foo.com/some/path', '../bar.css')).equal(
            'http://foo.com/some/bar.css'
        );
    });

    it('should correctly resolve a .. relative link when the url has a trailing /', () => {
        expect(resolveUrl('http://foo.com/some/path/', '../bar.css')).equal(
            'http://foo.com/some/bar.css'
        );
    });

    it('should correctly resolve a relative link', () => {
        expect(resolveUrl('http://foo.com/some/path', 'bar.css')).equal(
            'http://foo.com/some/path/bar.css'
        );
    });

    it('should correctly return a full link', () => {
        expect(
            resolveUrl('http://foo.com', 'http://foo.com/some/path/bar.css')
        ).equal('http://foo.com/some/path/bar.css');
    });

    it('should correctly resolve an absolute link', () => {
        expect(resolveUrl('http://foo.com/some/path', '/bar.css')).equal(
            'http://foo.com/bar.css'
        );
    });

    it('should correctly resolve a relative url from an html file', () => {
        expect(resolveUrl('http://foo.bar/awesome/baz.html', 'baz.css')).equal(
            'http://foo.bar/awesome/baz.css'
        );
    });

    it('should correctly resolve an absolute url from an html file', () => {
        expect(resolveUrl('http://foo.bar/awesome/baz.html', '/baz.css')).equal(
            'http://foo.bar/baz.css'
        );
    });
});
