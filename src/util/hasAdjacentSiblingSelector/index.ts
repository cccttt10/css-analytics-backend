const hasAdjacentSiblingSelector = (selector: string): boolean => {
    if (typeof selector !== 'string') {
        throw new TypeError('hasAdjacentSiblingSelector expects (selector: string)');
    }
    return /\+/.test(selector);
};

export default hasAdjacentSiblingSelector;
