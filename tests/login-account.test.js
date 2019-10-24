const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const expect = chai.expect

const debugJWT = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAbG9jYWwiLCJpYXQiOjE1NzE5MzQ4NjR9.V7EpCfUVSBwEWvKcczrM7OQfcv59kSqyQMkZx_fy_fg`;

chai.should();
chai.use(chaiHttp);

describe('Testing routers \'login\' and \'account\'', () => {
    describe('test login router', () => {
        it('200 OK Register account', () => {
            chai.request(server)
            .post('/register')
            .send({name:"testAccount", email:"test@local", password:"testpassword"})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.be.equal(201);
                expect(res.body.token).to.be.an('string');
            });
        });
        it('400 BAD REQ missing register parameters', () => {
            chai.request(server)
            .post('/register')
            .send({})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.be.equal(400);
            });
        });
        it('200 OK Login with created account', () => {
            chai.request(server)
            .post('/login')
            .send({email:"test@local", password: "testpassword"})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.be.equal(200);
                expect(res.body.token).to.be.an('string');
            });
        });
        it('400 BAD REQ missing register parameters', () => {
            chai.request(server)
            .post('/login')
            .send({})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.be.equal(400);
            });
        });
        it('400 BAD REQ no user found', () => {
            chai.request(server)
            .post('/login')
            .send({email:"norealuser", password:"notapassword"})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.be.equal(400);
            });
        });
        it('400 BAD REQ incorrect password', () => {
            chai.request(server)
            .post('/login')
            .send({email:"test@local", password:"notmypassword"})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.be.equal(400);
            });
        });
    });
    describe('test account router', () => {
        it('401 Unauthorized denied access if not logged in', () => {
            chai.request(server)
            .get('/acc/wallets')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.be.equal(401);
            });
        });
        it('401 Unauthorized bad JWT', () => {
            chai.request(server)
            .get('/acc/wallets')
            .set('Authorization', "notmyjwt")
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.be.equal(401);
            });
        });
        it('200 OK get (empty) wallets', () => {
            chai.request(server)
            .get('/acc/wallets')
            .set('Authorization', debugJWT)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.be.equal(0);
            });
        });
        it('200 OK get funds', () => {
            chai.request(server)
            .get('/acc/funds')
            .set('Authorization', debugJWT)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.be.equal(200);
                expect(res.body.funds).to.be.equal(100);
            });
        });
    });
});
