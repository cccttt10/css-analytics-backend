import getCssUrls from 'get-css-urls';
import getImports from 'get-imports';
import isPresent from 'is-present';
import isUrl from 'is-url';
import { resolve } from 'url';

const resolveCssImportUrls = (url: string, css: string): string[] => {
    if (typeof url !== 'string' || typeof css !== 'string' || !isUrl(url)) {
        throw new TypeError('resolveCssImports expects (url: string, css: string)');
    }

    const cssUrls = getImports(css).map(importStatement => {
        let cssRelativePath: string | RegExpMatchArray = getCssUrls(importStatement);

        if (!isPresent(cssRelativePath)) {
            cssRelativePath = importStatement.match(/["'](.*?)["']/gi);
        }

        if (isPresent(cssRelativePath as string)) {
            cssRelativePath = cssRelativePath[0]
                .replace('url(', '')
                .replace(/["'()]/g, '');
        }

        return resolve(url, cssRelativePath as string);
    });

    return cssUrls;
};

export default resolveCssImportUrls;
