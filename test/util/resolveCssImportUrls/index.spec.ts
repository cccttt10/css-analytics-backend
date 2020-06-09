import chai, { expect } from 'chai';
import assertArrays from 'chai-arrays';
chai.use(assertArrays);
import resolveCssImports from '../../../src/util/resolveCssImportUrls';

describe('resolveCssImports', () => {
    it('should handle import statements', () => {
        expect(
            resolveCssImports(
                'http://foo.com/my-css.css',
                '@import url(bar.css); @import url("css/baz.css");'
            )
        ).to.be.equalTo(['http://foo.com/bar.css', 'http://foo.com/css/baz.css']);
    });

    it('should handle relative path import statements', () => {
        expect(
            resolveCssImports(
                'http://foo.com/css/my-css.css',
                "@import url('../bar.css');"
            )
        ).to.be.equalTo(['http://foo.com/bar.css']);
    });

    it('should return an empty array if there is no import', () => {
        expect(resolveCssImports('http://foo.com', 'bar')).to.be.equalTo([]);
    });

    it('should handle urls with single quotes', () => {
        expect(
            resolveCssImports(
                'http://foo.com/css/my-css.css',
                "@import '../bar.css' print;"
            )
        ).to.be.equalTo(['http://foo.com/bar.css']);
    });

    it('should handle urls with double quotes', () => {
        expect(
            resolveCssImports(
                'http://foo.com/css/my-css.css',
                '@import "bar.css" projection;'
            )
        ).to.be.equalTo(['http://foo.com/css/bar.css']);
    });
});
