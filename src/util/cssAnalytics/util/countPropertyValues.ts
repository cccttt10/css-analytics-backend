import { Properties } from 'global';

const countPropertyValues = (
    properties: Properties,
    property: string,
    value: string
): number => {
    if (!properties || !properties[property]) {
        return 0;
    }
    return properties[property].filter(val => val === value).length;
};

export default countPropertyValues;
