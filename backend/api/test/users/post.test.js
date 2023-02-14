process.env.NODE_ENV = 'test'

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../../config/app.js');
const conn = require ('../../../config/db.js');

describe('POST /register', () => {
    before((done) => {
        // conn.connect()
        // .then(() => done())
        // .catch((err) => done(err))
        // return new Promise(() => {
            mongoServer = new MongoMemoryServer();
            await mongoServer.start();
    
            const mongoUri = mongoServer.getUri();
    
            mongoose.connect(mongoUri, (err) => {
                if (err) {console.error(err)};
            })
            .then(() => done())
            .catch((err) => done(err))
        // });
    });

    after((done) => {
        conn.close()
        .then(() => done())
        .catch((err) => done(err))
    })

    it('OK, creating a new user works', (done) => {
        request(app).post('/hown/public/register')
        .send({
            uuid: "123a-b456c-d789k",
            firstName: "Sue",
            lastName: "Vicente",
            phoneNumber: "55555555",
            workNumber: "44444444"
        })
        .then((res) => {
            const body = res.body
            expect(body).to.contain.property('_id');
            expect(body).to.contain.property('firstName');
            expect(body).to.contain.property('lastName');
            expect(body).to.contain.property('phoneNumber');
            expect(body).to.contain.property('workNumber');
            done(); 
        })
        .catch((err) => done(err))
    });

    it('NOT OK, creating a new user works', (done) => {
        request(app).post('/hown/public/register')
        .send({
            uuid: "123a-b456c-d789k",
            firstName: "Sue",
            lastName: "Vicente",
            phoneNumber: "55555555",
            workNumber: "44444444"
        })
        .then((res) => {
            const body = res.body
            expect(body).to.contain.property('_id');
            expect(body).to.contain.property('firstName');
            expect(body).to.contain.property('lastName');
            expect(body).to.contain.property('phoneNumber');
            expect(body).to.contain.property('workNumber');
            done(); 
        })
        .catch((err) => done(err))
    })
});