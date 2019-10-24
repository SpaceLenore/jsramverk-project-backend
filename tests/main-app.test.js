const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const expect = chai.expect

const debugJWT = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAbG9jYWwiLCJpYXQiOjE1NzE5MzQ4NjR9.V7EpCfUVSBwEWvKcczrM7OQfcv59kSqyQMkZx_fy_fg`;

chai.should();
chai.use(chaiHttp);

describe('Cover remaining app.js route', () => {
    it('404 NOT FOUND cover-all route', () => {
        chai.request(server)
        .get('/notarealroute')
        .set('Authorization', debugJWT)
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res.status).to.be.equal(404);
        });
    });
});
