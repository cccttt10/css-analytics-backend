import cssSelectorTokenizer, {
    SelectorNode,
    SelectorNodeType,
} from 'css-selector-tokenizer';
const parse = cssSelectorTokenizer.parse;

const hasElementSelector = (selector: string): boolean => {
    if (typeof selector !== 'string') {
        throw new TypeError('hasElementSelector expects (selector: string)');
    }
    return parse(selector)
        .nodes.reduce(function (
            selectorNodeTypes: SelectorNodeType[],
            selectorNode: SelectorNode
        ) {
            return selectorNodeTypes.concat(selectorNode.nodes);
        },
        [])
        .reduce(function (a: boolean, selectorNodeType: SelectorNodeType) {
            if (selectorNodeType.type === 'element') {
                return true;
            }
            return a || false;
        }, false);
};

export default hasElementSelector;
