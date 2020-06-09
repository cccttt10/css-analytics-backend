import { MediaQueries, Options } from 'global';
import _ from 'lodash';
import postcss from 'postcss';

import getDeclarations from './getDeclarations';
import getRules from './getRules';
import getSelectors from './getSelectors';

const getMediaQueries = (root: postcss.Root, opts: Options): MediaQueries => {
    const result: MediaQueries = {
        total: 0,
        unique: 0,
        values: [],
        contents: [],
    };
    root.walkAtRules(function (rule) {
        if (rule.name === 'media') {
            result.total++;
            result.values.push(rule.params);
            if (opts.mediaQueries) {
                const queryRoot = postcss.parse(rule.nodes);
                result.contents.push({
                    value: rule.params,
                    rules: getRules(queryRoot),
                    selectors: getSelectors(queryRoot, opts),
                    declarations: getDeclarations(queryRoot, opts),
                });
            } else {
                delete result.contents;
            }
        }
    });
    result.unique = _.uniq(result.values).length;
    return result;
};

export default getMediaQueries;
