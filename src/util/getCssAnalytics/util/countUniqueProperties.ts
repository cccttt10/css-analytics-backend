import { Properties } from 'global';
import _ from 'lodash';

const countUniqueProperties = (properties: Properties, property: string): number => {
    if (!properties || !properties[property]) {
        return 0;
    }
    return _.uniq(properties[property]).length;
};

export default countUniqueProperties;
