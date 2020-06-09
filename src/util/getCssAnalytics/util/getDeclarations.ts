import { Declarations, Options } from 'global';
import postcss from 'postcss';

import countUniqueProperties from './countUniqueProperties';
import getPropertyResets from './getPropertyResets';
import getVendorPrefixedProperties from './getVendorPrefixedProperties';

const getDeclarations = (root: postcss.Root, opts?: Options): Declarations => {
    const result: Declarations = {
        total: 0,
        unique: 0,
        important: [],
        properties: {},
    };

    root.walkRules(rule => {
        rule.walkDecls(declaration => {
            const prop = declaration.prop;
            result.total++;
            if (declaration.important) {
                result.important.push({
                    property: declaration.prop,
                    value: declaration.value,
                });
            }
            result.properties[prop] = result.properties[prop] || [];
            result.properties[prop].push(declaration.value);
        });
    });

    result.unique = Object.keys(result.properties).reduce((a, property) => {
        return a + countUniqueProperties(result.properties, property);
    }, 0);

    if (opts.propertyResets) {
        result.resets = getPropertyResets(result.properties);
    }

    if (opts.vendorPrefixedProperties) {
        result.vendorPrefixes = getVendorPrefixedProperties(result.properties);
    }

    if (!opts.importantDeclarations) {
        delete result.important;
    }

    return result;
};

export default getDeclarations;
