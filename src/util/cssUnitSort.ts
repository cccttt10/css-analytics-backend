export const convertToNumericValue = (value: string | number): number => {
    if (value === 0) {
        return 0;
    }
    if (typeof value === 'string') {
        const raw = parseFloat(value);
        if (value.match(/px$/)) return raw;
        if (value.match(/pt$/)) return raw;
        if (value.match(/em$/)) return raw * 16;
        if (value.match(/%$/)) return raw * 0.16;
        switch (value) {
            case 'inherit':
                return 16;
            case 'xx-small':
                return 9;
            case 'x-small':
                return 10;
            case 'small':
                return 13;
            case 'medium':
                return 16;
            case 'large':
                return 18;
            case 'x-large':
                return 24;
            case 'xx-large':
                return 32;
            case 'larger':
                return 19;
            default:
                return 1024;
        }
    }
};

export const compareUnits = (unit1: string, unit2: string): number => {
    const numericUnit1 = convertToNumericValue(unit1);
    const numericUnit2 = convertToNumericValue(unit2);

    if (numericUnit1 === numericUnit2) return 0;
    return numericUnit1 < numericUnit2 ? 1 : -1;
};

const cssUnitSort = (units: string[]): string[] => units.sort(compareUnits);

export default cssUnitSort;
