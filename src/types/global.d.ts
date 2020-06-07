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
}
