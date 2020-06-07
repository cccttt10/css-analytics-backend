const hasIdSelector = (selector: string, selectorToCheck?: string): boolean => {
    if (
        typeof selector !== 'string' ||
        (selectorToCheck && typeof selectorToCheck !== 'string')
    ) {
        throw new TypeError(
            'hasIdSelector expects (selector: string, selectorToCheck?: string)'
        );
    }

    if (selectorToCheck) {
        const reg = new RegExp('#' + selectorToCheck);
        return reg.test(selector);
    }

    return /(?![^[]*])#/.test(selector);
};

export default hasIdSelector;
