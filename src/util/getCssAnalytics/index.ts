import bytes from 'bytes';
import {
    Analytics,
    Declarations,
    MediaQueries,
    Options,
    Rules,
    Selectors,
} from 'global';
import getGzipSize from 'gzip-size';
import _ from 'lodash';
import postcss from 'postcss';
import safeParser from 'postcss-safe-parser';

import getDeclarations from './util/getDeclarations';
import getMediaQueries from './util/getMediaQueries';
import getRules from './util/getRules';
import getSelectors from './util/getSelectors';
import getSize from './util/getSize';

const parse = (root: postcss.Root, opts?: Options): Analytics => {
    const stringifiedCss = postcss().process(root).css;

    const size: number = getSize(stringifiedCss);
    const gzipSize: number = getGzipSize.sync(stringifiedCss);
    const humanizedSize: string = bytes(size, { decimalPlaces: 0 });
    const humanizedGzipSize: string = bytes(gzipSize, { decimalPlaces: 0 });

    const rules: Rules = getRules(root);
    const selectors: Selectors = getSelectors(root, opts);
    const declarations: Declarations = getDeclarations(root, opts);
    const mediaQueries: MediaQueries = getMediaQueries(root, opts);

    const analytics: Analytics = {
        size,
        gzipSize,
        humanizedSize,
        humanizedGzipSize,
        rules,
        selectors,
        declarations,
        mediaQueries,
    };

    return analytics;
};

const getCssAnalytics = (src: string, opts?: Options): Analytics => {
    opts = opts || {};
    opts = _.defaults(opts, {
        safe: true,
        mediaQueries: true,
        importantDeclarations: false,
        specificityGraph: false,
        sortedSpecificityGraph: false,
        repeatedSelectors: false,
        propertyResets: false,
        vendorPrefixedProperties: false,
    });

    const root = postcss().process(src, { parser: safeParser }).root;
    const result = parse(root, opts);
    return result;
};

export default getCssAnalytics;
