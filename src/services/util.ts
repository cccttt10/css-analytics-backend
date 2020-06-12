import colors from 'colors';
import consola from 'consola';
import isPresent from 'is-present';
import isUrl from 'is-url';
import request from 'supertest';

/*
normalize port into number, string or false
*/
export const normalizePort = (val: number | string): number | string | false => {
    const port = parseInt(val as string, 10);

    if (isNaN(port)) {
        // named pipe
        return val as string;
    }

    if (port >= 0) {
        // port number
        return port as number;
    }

    return false;
};

export const stdout = {
    error: (message: string): void => {
        if (process.env.NODE_ENV !== 'production') {
            consola.error(message);
        }
    },
    info: (message: string): void => {
        if (process.env.NODE_ENV !== 'production') {
            consola.info(message);
        }
    },
    log: (message: string): void => {
        if (process.env.NODE_ENV !== 'production') {
            consola.log(message);
        }
    },
    ready: (message: string): void => {
        if (process.env.NODE_ENV !== 'production') {
            consola.ready(message);
        }
    },
    success: (message: string): void => {
        if (process.env.NODE_ENV !== 'production') {
            consola.success(message);
        }
    },
    warn: (message: string): void => {
        if (process.env.NODE_ENV !== 'production') {
            consola.warn(message);
        }
    },
    printResponse: (res: request.Response): void => {
        if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.log(colors.green(`Response status: ${res.status}`));
            // eslint-disable-next-line no-console
            console.log(colors.green('Response header:'));
            // eslint-disable-next-line no-console
            console.log(colors.green(JSON.stringify(res.header, undefined, 4)));
            // eslint-disable-next-line no-console
            console.log(colors.green('Response body: '));
            // eslint-disable-next-line no-console
            console.log(colors.green(JSON.stringify(res.body, undefined, 4)));
        }
    },
};

export const isValidUrl = (url: string): boolean => isPresent(url) && isUrl(url);
