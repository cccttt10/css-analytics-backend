const hasChildSelector = (selector: string): boolean => {
    if (typeof selector !== 'string') {
        throw new TypeError('hasChildSelector expects (selector: string)');
    }
    return />/.test(selector);
};

export default hasChildSelector;
