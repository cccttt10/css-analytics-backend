import { Properties, Resets } from 'global';
import _ from 'lodash';

const getPropertyResets = (properties: Properties): Resets => {
    const resets: Resets = {};
    const declarations: Array<{ prop: string; value: string }> = [];
    const PROP_MATCH_REGEX = /(^margin|^padding)/;
    const VALUE_MATCH_REGEX = /^(?:0(?:\w{2,4}|%)? ?)+$/;
    _.forIn(properties, (values: string[], key: string) => {
        for (const value of values) {
            declarations.push({
                prop: key,
                value: value,
            });
        }
    });
    declarations
        .filter(declaration => declaration.prop.match(PROP_MATCH_REGEX))
        .forEach(declaration => {
            if (declaration.value.match(VALUE_MATCH_REGEX)) {
                resets[declaration.prop] |= 0;
                resets[declaration.prop]++;
            }
        });
    return resets;
};

export default getPropertyResets;
