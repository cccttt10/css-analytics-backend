const hasClassSelector = (selector: string, selectorToCheck?: string): boolean => {
    if (
        typeof selector !== 'string' ||
        (selectorToCheck && typeof selectorToCheck !== 'string')
    ) {
        throw new TypeError(
            'hasClassSelector expects (selector: string, selectorToCheck?: string)'
        );
    }

    if (selectorToCheck) {
        const reg = new RegExp('\\.' + selectorToCheck);
        return reg.test(selector);
    }

    return /\./.test(selector);
};

export default hasClassSelector;
