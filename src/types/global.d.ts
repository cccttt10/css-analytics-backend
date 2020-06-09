declare module 'global' {
    interface Rules {
        total: number;
        size: {
            graph: number[];
            max: number;
            average: number;
        };
        selectorsByRuleSizes: Array<{ selector: string; declarations: number }>;
    }

    interface Properties {
        [property: string]: string[];
    }

    interface Resets {
        [property: string]: number;
    }

    interface Link {
        link: string;
        url: string;
        css: string;
        error?: Error;
        imports?: string[];
    }

    interface Property {
        property: string;
        value: string;
    }

    interface Declarations {
        total: number;
        unique: number;
        important: Array<{ property: string; value: string }>;
        properties: Properties;
        resets?: Resets;
        vendorPrefixes?: Array<Property>;
    }

    interface Selectors {
        total: number;
        type: number;
        class: number;
        id: number;
        pseudoClass: number;
        pseudoElement: number;
        values: string[];
        specificity: {
            max: number;
            average: number;
            graph?: Graph;
            sortedGraph?: {
                selector: string;
                specificity: number;
            }[];
        };
        repeated?: string[];
    }

    type Graph = number[];

    interface MediaQueries {
        total: number;
        unique: number;
        values: string[];
        contents: Array<{
            value: string;
            rules: Rules;
            selectors: Selectors;
            declarations: Declarations;
        }>;
    }

    interface GetSelectorsOptions {
        specificityGraph?: boolean;
        sortedSpecificityGraph?: boolean;
        repeatedSelectors?: boolean;
    }

    interface GetDeclarationsOptions {
        propertyResets?: boolean;
        vendorPrefixedProperties?: boolean;
        importantDeclarations?: boolean;
    }

    interface MediaQueryOptions {
        mediaQueries?: boolean;
    }

    type Options = GetSelectorsOptions & GetDeclarationsOptions & MediaQueryOptions;

    interface Analytics {
        size: number;
        gzipSize: number;
        humanizedSize: string;
        humanizedGzipSize: string;
        rules: Rules;
        selectors: Selectors;
        declarations: Declarations;
        mediaQueries: MediaQueries;
    }
}
