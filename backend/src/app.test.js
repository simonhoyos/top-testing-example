const req = require('supertest');
const mongoose = require('mongoose');
const app = require('./app');

describe('app', () => {
  beforeEach(async () => {
    for(let collection in mongoose.connection.collections) {
      await mongoose.connection.collections[collection].deleteMany({});
    }
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should GET / with success code', async done => {
    const res = await req(app).get('/');
    done();

    expect(res.statusCode).toBe(200);
  });
});
