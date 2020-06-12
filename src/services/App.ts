import cors from 'cors';
import { Express, NextFunction, Request, Response } from 'express';
import express from 'express';
import http from 'http';
import createError from 'http-errors';
import logger from 'morgan';
import path from 'path';

import { DEFAULT_PORT } from './constants';
import setUpRoutes from './routes/index';
import { normalizePort, stdout } from './util';

export default class App {
    private readonly port: number;
    private readonly app: Express = express();
    private server: http.Server;

    constructor(port?: number | string) {
        this.port = normalizePort(port || DEFAULT_PORT) as number;
    }

    start(): void {
        /*
        use logger
        */
        this.app.use(logger('dev'));

        /*
        configure cross origin
        */
        this.app.use(
            cors({
                credentials: true,
                origin:
                    process.env.NODE_ENV === 'production'
                        ? 'https://css-analytics.netlify.app/'
                        : 'http://localhost:8000',
            })
        );

        /*
        configure express
        */
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.static(path.join(__dirname, 'public')));

        /*
        configure routes
        */
        setUpRoutes(this.app);

        /*
        catch 404 and forward to error handler
        */
        this.app.use(function (req: Request, res: Response, next: NextFunction) {
            next(createError(404));
        });

        /*
        error handler
        */
        this.app.use(function (
            err: Error & { status?: number },
            req: Request,
            res: Response,
            // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
            next: NextFunction
        ) {
            stdout.error('error caught in app.ts');
            stdout.log(err.toString());
            res.status(err.status || 500).send('Unexpected server error.');
        });

        this.server = this.app.listen(this.port, () => {
            stdout.success(`App running on port ${this.port}...`);
        });
    }

    stop(): void {
        this.server.close(() => {
            stdout.info('Server will stop.');
        });
    }
}
