import { expect } from 'chai';
import request, { SuperTest, Test } from 'supertest';

import App from '../src/services/App';
import { TEST_SERVER_URL } from '../src/services/constants';
import { stdout } from '../src/services/util';

describe('/getCssAnalytics', () => {
    // eslint-disable-next-line init-declarations
    let app: App;
    // eslint-disable-next-line init-declarations
    let agent: SuperTest<Test>;

    before(() => {
        app = new App();
        app.start();
    });

    after(() => {
        app.stop();
    });

    beforeEach(() => {
        agent = request(TEST_SERVER_URL);
    });

    it('should get CSS analytics', async () => {
        const res = await agent.get('/getCssAnalytics?url=cgao.info');
        expect(res.status).to.equal(200);
        stdout.printResponse(res);
    });
});
