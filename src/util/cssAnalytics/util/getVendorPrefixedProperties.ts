import { Properties } from 'global';

import isVendorPrefixed from '../../isVendorPrefixed/';

const getVendorPrefixedProperties = (
    properties: Properties
): Array<{ property: string; value: string }> => {
    return Object.keys(properties)
        .filter(property => isVendorPrefixed(property))
        .map(property => {
            const arr: Array<{ property: string; value: string }> = [];
            for (const value of properties[property]) {
                arr.push({
                    property: property,
                    value: value,
                });
            }
            return arr;
        })
        .reduce((arr1, arr2) => arr1.concat(arr2), []);
};

export default getVendorPrefixedProperties;
