const { app } = require('../src/server');
const supertest = require('supertest');
const mockRequest = supertest(app);
const { db } = require('../src/models/index');


beforeAll(async () => {
    await db.sync();
});

afterAll(async () => {
    await db.drop();
});




describe('Authentication Testing', () => {

    test('create a new user', async () => {
        const res = await mockRequest.post('/signup').send({
            username: "hey",
            password: "why"
        });

        expect(res.status).toBe(201);
    })

    test('POST to /signin to login as a user', async () => {
        await mockRequest.post('/signup').send({
            username: "hey",
            password: "why"
        });

        
        let res = await mockRequest.post('/signin').auth("hey", "why");

        expect(res.status).toBe(200);
    })

})