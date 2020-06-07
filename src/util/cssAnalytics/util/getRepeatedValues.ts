import _ from 'lodash';

const getRepeatedValues = (values: string[]): string[] => {
    return _.uniq(
        _.clone(values)
            .sort()
            .reduce(function (a, b, i, arr) {
                if (b === arr[i - 1] || b === arr[i + 1]) {
                    return a.concat(b);
                } else {
                    return a;
                }
            }, [])
    );
};

export default getRepeatedValues;
