const mongoose = require('mongoose');
const { MongoMemoryServer } = require ('mongodb-memory-server');

var expect = require('chai').expect;
var should = require('should');
var request = require('supertest');

const app = require("../../config/app")

//Mock MongoDB using MongoDB Memory Server
let mongoServer;

before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
});
  
after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});
  

describe('POST /register', () => {
    it('OK, Register New User', (done) => {
        let user = {
            uuid: "123a-b456c-d789k",
            firstName: "Sue",
            lastName: "Vicente",
            phoneNumber: "55555555",
            workNumber: "44444444"
        }
        request(app).post('/hown/public/register')
        .send({
            uuid: user.uuid,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            workNumber: user.workNumber
        })
        .then((res) => {
            const body = res.body;
            expect(res.status).to.equal(201);
            should.exist(body)
            expect(body).to.contain.property('_id');
            expect(body).to.contain.property('uuid');
            expect(body).to.contain.property('firstName');
            expect(body).to.contain.property('lastName');
            expect(body).to.contain.property('phoneNumber');
            expect(body).to.contain.property('workNumber');
            expect(body.uuid).to.equal(user.uuid);
            expect(body.firstName).to.equal(user.firstName);
            expect(body.lastName).to.equal(user.lastName);
            expect(body.phoneNumber).to.equal(user.phoneNumber);
            expect(body.workNumber).to.equal(user.workNumber);
            done(); 
        })
        .catch((err) => done(err))
    });

    it('ERROR, User already Registered', (done) => {
        let user = {
            uuid: "123a-b456c-d789k",
            firstName: "Sue",
            lastName: "Vicente",
            phoneNumber: "55555555",
            workNumber: "44444444"
        }
        request(app).post('/hown/public/register')
        .send({
            uuid: user.uuid,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            workNumber: user.workNumber
        })
        .then((res) => {
            request(app).post('/hown/public/register')
            .send({
                uuid: user.uuid,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                workNumber: user.workNumber
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                should.exist(body)
                expect(body.message).to.equal("User already registered.");
                done(); 
            })
        })
        .catch((err) => done(err))
    });

    it('ERROR, Invalid JSON', (done) => {
        request(app).post('/hown/public/register')
        .send({
            aaa: "aaa"
        })
        .then((res) => {
            expect(res.status).to.equal(400);
            done();
        })
        .catch((err) => done(err))
    });
});

describe('POST /login', () => {
    it('OK, Login with a user', (done) => {
        let user = {
            uuid: "123a-b456c-d789k",
            firstName: "Sue",
            lastName: "Vicente",
            phoneNumber: "55555555",
            workNumber: "44444444"
        }
        request(app).post('/hown/public/register')
        .send({
            uuid: user.uuid,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            workNumber: user.workNumber
        })
        .then((res) => {
            request(app).post('/hown/public/login')
            .send({
                uuid: user.uuid,
                device: "iPhone13"
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(200);
                should.exist(body)
                expect(body).to.contain.property('message');
                expect(body).to.contain.property('token');
                done();
            });
        })
        .catch((err) => done(err))
    });

    it('ERROR, User do not exist', (done) => {
        request(app).post('/hown/public/login')
        .send({
            uuid: "1234567890",
            device: "iPhone13"
        })
        .then((res) => {
            const body = res.body;
            expect(res.status).to.equal(404);
            should.exist(body)
            expect(body).to.contain.property('message');
            expect(body.message).to.equal("User not registered.");
            done();
        })
        .catch((err) => done(err))
    });

    it('ERROR, Invalid JSON', (done) => {
        request(app).post('/hown/public/login')
        .send({
            aaa: "aaa"
        })
        .then((res) => {
            expect(res.status).to.equal(400);
            done();
        })
        .catch((err) => done(err))
    });
});

describe('GET /:uuid', () => {
    it('OK, Get user by uuid', (done) => {
        let user = {
            uuid: "123a-b456c-d789k",
            firstName: "Sue",
            lastName: "Vicente",
            phoneNumber: "55555555",
            workNumber: "44444444"
        }
        request(app).post('/hown/public/register')
        .send({
            uuid: user.uuid,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            workNumber: user.workNumber
        })
        .then((res) => {
            request(app).post('/hown/public/login')
            .send({
                uuid: user.uuid,
                device: "iPhone13"
            })
            .then((res) => {
                request(app).get('/hown/api/user/' + user.uuid)
                .set('x-access-token', res.body.token)
                .then((res) => {
                    const body = res.body.user;
                    should.exist(body)
                    expect(res.status).to.equal(200);
                    expect(body).to.contain.property('_id');
                    expect(body).to.contain.property('uuid');
                    expect(body).to.contain.property('firstName');
                    expect(body).to.contain.property('lastName');
                    expect(body).to.contain.property('phoneNumber');
                    expect(body).to.contain.property('workNumber');
                    expect(body.uuid).to.equal(user.uuid);
                    expect(body.firstName).to.equal(user.firstName);
                    expect(body.lastName).to.equal(user.lastName);
                    expect(body.phoneNumber).to.equal(user.phoneNumber);
                    expect(body.workNumber).to.equal(user.workNumber);
                    done(); 
                });
            })
        })
        .catch((err) => done(err))
    });

    it('ERROR, User do not exist', (done) => {
        let user = {
            uuid: "123a-b456c-d789k",
            firstName: "Sue",
            lastName: "Vicente",
            phoneNumber: "55555555",
            workNumber: "44444444"
        }
        request(app).post('/hown/public/register')
        .send({
            uuid: user.uuid,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            workNumber: user.workNumber
        })
        .then((res) => {
            request(app).post('/hown/public/login')
            .send({
                uuid: user.uuid,
                device: "iPhone13"
            })
            .then((res) => {
                request(app).get('/hown/api/user/' + user.uuid + "1")
                .set('x-access-token', res.body.token)
                .then((res) => {
                    const body = res.body.message;
                    should.exist(body)
                    expect(res.status).to.equal(404);
                    expect(body).to.equal("User not found.")
                    done(); 
                });
            })
        })
        .catch((err) => done(err))
    });

    it('ERROR, Unauthorized', (done) => {
        let user = {
            uuid: "123a-b456c-d789k",
            firstName: "Sue",
            lastName: "Vicente",
            phoneNumber: "55555555",
            workNumber: "44444444"
        }
        request(app).get('/hown/api/user/' + user.uuid + "1")
        .set('x-access-token', 'abc')
        .then((res) => {
            const body = res.body;
            should.exist(body)
            expect(res.status).to.equal(401);
            done(); 
        })
        .catch((err) => done(err))
    });
});

describe('GET id/:userId', () => {
    it('OK, Get user by userId', (done) => {
        let user = {
            uuid: "123a-b456c-d789p",
            firstName: "Sue",
            lastName: "Vicente",
            phoneNumber: "55555555",
            workNumber: "44444444"
        }
        request(app).post('/hown/public/register')
        .send({
            uuid: user.uuid,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            workNumber: user.workNumber
        })
        .then((res) => {
            console.log(res.body)
            let userId = res.body._id;
            request(app).post('/hown/public/login')
            .send({
                uuid: user.uuid,
                device: "iPhone13"
            })
            .then((res) => {
                request(app).get('/hown/api/user/id/' + userId)
                .set('x-access-token', res.body.token)
                .then((res) => {
                    const body = res.body.user;
                    should.exist(body)
                    expect(res.status).to.equal(200);
                    expect(body).to.contain.property('_id');
                    expect(body).to.contain.property('uuid');
                    expect(body).to.contain.property('firstName');
                    expect(body).to.contain.property('lastName');
                    expect(body).to.contain.property('phoneNumber');
                    expect(body).to.contain.property('workNumber');
                    expect(body.uuid).to.equal(user.uuid);
                    expect(body.firstName).to.equal(user.firstName);
                    expect(body.lastName).to.equal(user.lastName);
                    expect(body.phoneNumber).to.equal(user.phoneNumber);
                    expect(body.workNumber).to.equal(user.workNumber);
                    done(); 
                });
            })
        })
        .catch((err) => done(err))
    });

    it('ERROR, User do not exist', (done) => {
        let user = {
            uuid: "123a-b456c-d789k",
            firstName: "Sue",
            lastName: "Vicente",
            phoneNumber: "55555555",
            workNumber: "44444444"
        }
        request(app).post('/hown/public/register')
        .send({
            uuid: user.uuid,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            workNumber: user.workNumber
        })
        .then((res) => {
            let userId = res.body._id;
            request(app).post('/hown/public/login')
            .send({
                uuid: user.uuid,
                device: "iPhone13"
            })
            .then((res) => {
                request(app).get('/hown/api/user/id' + userId + "1")
                .set('x-access-token', res.body.token)
                .then((res) => {
                    const body = res.body.message;
                    should.exist(body)
                    expect(res.status).to.equal(404);
                    expect(body).to.equal("User not found.")
                    done(); 
                });
            })
        })
        .catch((err) => done(err))
    });

    it('ERROR, Unauthorized', (done) => {
        let user = {
            uuid: "123a-b456c-d789k",
            firstName: "Sue",
            lastName: "Vicente",
            phoneNumber: "55555555",
            workNumber: "44444444"
        }
        request(app).get('/hown/api/user/id/' + user.uuid + "1")
        .set('x-access-token', 'abc')
        .then((res) => {
            const body = res.body;
            should.exist(body)
            expect(res.status).to.equal(401);
            done(); 
        })
        .catch((err) => done(err))
    });
});

describe('POST /:uuid', () => {
    it('OK, Edit User', (done) => {
        let user = {
            uuid: "123a-b456c-d789k",
            firstName: "Sue",
            lastName: "Vicente",
            phoneNumber: "55555555",
            workNumber: "44444444"
        }
        let modifiedUser = {
            uuid: "123a-b456c-d789k",
            firstName: "Sue C",
            lastName: "B G Vicente",
            phoneNumber: "555555551",
            workNumber: "444444443"
        }
        request(app).post('/hown/public/register')
        .send({
            uuid: user.uuid,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            workNumber: user.workNumber
        })
        .then((res) => {
            request(app).post('/hown/public/login')
            .send({
                uuid: user.uuid,
                device: "iPhone13"
            })
            .then((res) => {
                request(app).post('/hown/api/user/' + user.uuid)
                .set('x-access-token', res.body.token)
                .send({
                    uuid: user.uuid,
                    firstName: modifiedUser.firstName,
                    lastName: modifiedUser.lastName,
                    phoneNumber: modifiedUser.phoneNumber,
                    workNumber: modifiedUser.workNumber
                })
                .then((res) => {
                    const body = res.body;
                    should.exist(body)
                    expect(res.status).to.equal(200);
                    expect(body).to.contain.property('_id');
                    expect(body).to.contain.property('uuid');
                    expect(body).to.contain.property('firstName');
                    expect(body).to.contain.property('lastName');
                    expect(body).to.contain.property('phoneNumber');
                    expect(body).to.contain.property('workNumber');
                    expect(body.uuid).to.equal(modifiedUser.uuid);
                    expect(body.firstName).to.equal(modifiedUser.firstName);
                    expect(body.lastName).to.equal(modifiedUser.lastName);
                    expect(body.phoneNumber).to.equal(modifiedUser.phoneNumber);
                    expect(body.workNumber).to.equal(modifiedUser.workNumber);
                    done(); 
                });
            })
        })
        .catch((err) => done(err))
    });

    it('ERROR, User do not exist', (done) => {
        let user = {
            uuid: "123a-b456c-d789k",
            firstName: "Sue",
            lastName: "Vicente",
            phoneNumber: "55555555",
            workNumber: "44444444"
        }
        request(app).post('/hown/public/register')
        .send({
            uuid: user.uuid,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            workNumber: user.workNumber
        })
        .then((res) => {
            request(app).post('/hown/public/login')
            .send({
                uuid: user.uuid,
                device: "iPhone13"
            })
            .then((res) => {
                request(app).post('/hown/api/user/' + user.uuid + "1")
                .set('x-access-token', res.body.token)
                .then((res) => {
                    const body = res.body.message;
                    should.exist(body)
                    expect(res.status).to.equal(404);
                    expect(body).to.equal("User not found.")
                    done(); 
                });
            })
        })
        .catch((err) => done(err))
    });

    it('ERROR, Unauthorized', (done) => {
        let user = {
            uuid: "123a-b456c-d789k",
            firstName: "Sue",
            lastName: "Vicente",
            phoneNumber: "55555555",
            workNumber: "44444444"
        }
        request(app).post('/hown/api/user/' + user.uuid + "1")
        .set('x-access-token', 'abc')
        .then((res) => {
            const body = res.body;
            should.exist(body)
            expect(res.status).to.equal(401);
            done(); 
        })
        .catch((err) => done(err))
    });
});

describe('DELETE /:uuid', () => {
    it('OK, Delete User', (done) => {
        let user = {
            uuid: "123a-b456c-d789k",
            firstName: "Sue",
            lastName: "Vicente",
            phoneNumber: "55555555",
            workNumber: "44444444"
        }
        var token = ""
        request(app).post('/hown/public/register')
        .send({
            uuid: user.uuid,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            workNumber: user.workNumber
        })
        .then((res) => {
            request(app).post('/hown/public/login')
            .send({
                uuid: user.uuid,
                device: "iPhone13"
            })
            .then((res) => {
                token = res.body.token
                request(app).delete('/hown/api/user/' + user.uuid)
                .set('x-access-token', token)
                .then((res) => {
                    const body = res.body;
                    should.exist(body)
                    expect(res.status).to.equal(200);
                    expect(body).to.contain.property('message');
                    expect(body.message).to.equal("User deleted.");
                    request(app).post('/hown/public/login')
                    .send({
                        uuid: user.uuid,
                        device: "iPhone13"
                    })
                    .then((res) => {
                        request(app).get('/hown/api/user/' + user.uuid)
                        .set('x-access-token', token)
                        .then((res) => {
                            const body = res.body.message;
                            should.exist(body)
                            expect(res.status).to.equal(404);
                            expect(body).to.equal("User not found.")
                            done(); 
                        });
                    })
                });
            })
        })
        .catch((err) => done(err))
    });

    it('ERROR, User do not exist', (done) => {
        let user = {
            uuid: "123a-b456c-d789k",
            firstName: "Sue",
            lastName: "Vicente",
            phoneNumber: "55555555",
            workNumber: "44444444"
        }
        request(app).post('/hown/public/register')
        .send({
            uuid: user.uuid,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            workNumber: user.workNumber
        })
        .then((res) => {
            request(app).post('/hown/public/login')
            .send({
                uuid: user.uuid,
                device: "iPhone13"
            })
            .then((res) => {
                request(app).delete('/hown/api/user/' + user.uuid + "1")
                .set('x-access-token', res.body.token)
                .then((res) => {
                    const body = res.body.message;
                    should.exist(body)
                    expect(res.status).to.equal(404);
                    expect(body).to.equal("User not found.")
                    done(); 
                });
            })
        })
        .catch((err) => done(err))
    });

    it('ERROR, Unauthorized', (done) => {
        let user = {
            uuid: "123a-b456c-d789k",
            firstName: "Sue",
            lastName: "Vicente",
            phoneNumber: "55555555",
            workNumber: "44444444"
        }
        request(app).delete('/hown/api/user/' + user.uuid + "1")
        .set('x-access-token', 'abc')
        .then((res) => {
            const body = res.body;
            should.exist(body)
            expect(res.status).to.equal(401);
            done(); 
        })
        .catch((err) => done(err))
    });
});