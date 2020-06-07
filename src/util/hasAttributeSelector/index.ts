const hasAttributeSelector = (selector: string): boolean => {
    if (typeof selector !== 'string') {
        throw new TypeError('hasAttributeSelector expects (selector: string)');
    }
    return /\[.+?\]/.test(selector);
};

export default hasAttributeSelector;
