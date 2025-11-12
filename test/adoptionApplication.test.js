const request = require('supertest');
const app = require('./../src/app');

// Describe block for Adoption Application API tests
describe('Adoption Application API', () => {
    // Test to check if GET returns an empty list initially
    test('GET /api/adoption-applications should return an empty list initially', 
    async () => {
        const res = await request(app).get('/api/adoption-applications');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([]);
    });

    // Test to check if POST creates a new adoption application correctly
    test('POST /api/adoption-applications should create a new adoption application', 
    async () => {
        const newApplication = { applicantdate: '2023-10-01', statusAdoption: 'Pending', comments: 'Looking forward to adopting!' };

        const res = await request(app).post('/api/adoption-applications').send(newApplication);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.applicantName).toBe(newApplication.applicantName);
    });

    // Test to check if the endpoint rejects incomplete requests
    test('POST /api/adoption-applications should fail if data is incomplete', 
    async () => {
        const res = await request(app).post('/api/adoption-applications').send({ applicantdate: '2023-10-01' });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('message', 'applicantdate, statusAdoption and comments are required');
    });

    // Test to create adoption applications and then retrieve them
    test('GET /api/adoption-applications should return the list of applications after creation', 
    async () => {
        const application1 = { applicantdate: '2023-10-01', statusAdoption: 'Pending', comments: 'Looking forward to adopting!' };
        const application2 = { applicantdate: '2023-10-02', statusAdoption: 'Approved', comments: 'Excited to bring home a new friend!' };

        await request(app).post('/api/adoption-applications').send(application1);
        await request(app).post('/api/adoption-applications').send(application2);

        const res = await request(app).get('/api/adoption-applications');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.arrayContaining([
            expect.objectContaining(application1),
            expect.objectContaining(application2)
        ]));
    });
});