import { Express } from 'express';

import getCssAnalytics from './getCssAnalytics';

const setUpRoutes = (app: Express): void => {
    app.get('/getCssAnalytics', getCssAnalytics);
};

export default setUpRoutes;
