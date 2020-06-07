import vendorPrefixes from 'vendor-prefixes';

const isVendorPrefixed = (property: string): boolean => {
    if (typeof property !== 'string') {
        throw new TypeError('isVendorPrefixed expects a string argument');
    }
    const regexForPrefixes = new RegExp(
        '^(' + vendorPrefixes().join('|') + ')([a-z-]+)$',
        'i'
    );
    return regexForPrefixes.test(property);
};

export default isVendorPrefixed;
