const isImportant = (value: string): boolean => {
    if (typeof value !== 'string') {
        throw new TypeError('isImportant expects (value: string)');
    }
    return /!important/.test(value);
};

export default isImportant;
