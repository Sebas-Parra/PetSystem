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

    // test to update an existing adoption application
    test('PUT /api/adoption-applications/:id should update an existing adoption application', 
    async () => {
        const newApplication = { applicantdate: '2023-10-01', statusAdoption: 'Pending', comments: 'Looking forward to adopting!' };

        const postRes = await request(app).post('/api/adoption-applications').send(newApplication);
        const appId = postRes.body.id;

        const updatedApplication = { applicantdate: '2023-10-03', statusAdoption: 'Approved', comments: 'Can\'t wait to meet my new pet!' };

        const putRes = await request(app).put(`/api/adoption-applications/${appId}`).send(updatedApplication);

        expect(putRes.statusCode).toBe(200);
        expect(putRes.body).toHaveProperty('id', appId);
        expect(putRes.body.applicantdate).toBe(updatedApplication.applicantdate);
        expect(putRes.body.statusAdoption).toBe(updatedApplication.statusAdoption);
        expect(putRes.body.comments).toBe(updatedApplication.comments);
    });

    // test to delete an existing adoption application
    test('DELETE /api/adoption-applications/:id should delete an existing adoption application', 
    async () => {
        const newApplication = { applicantdate: '2023-10-01', statusAdoption: 'Pending', comments: 'Looking forward to adopting!' };

        const postRes = await request(app).post('/api/adoption-applications').send(newApplication);
        const appId = postRes.body.id;

        const deleteRes = await request(app).delete(`/api/adoption-applications/${appId}`);

        expect(deleteRes.statusCode).toBe(204);

        const getRes = await request(app).get('/api/adoption-applications');

        expect(getRes.body.find(app => app.id === appId)).toBeUndefined();
    });

    //test to update when id is invalid
    test('PUT /api/adoption-applications/:id should return 400 for invalid ID', 
    async () => {
        const updatedApplication = { applicantdate: '2023-10-03', statusAdoption: 'Approved', comments: 'Can\'t wait to meet my new pet!' };

        const putRes = await request(app).put('/api/adoption-applications/invalid-id').send(updatedApplication);

        expect(putRes.statusCode).toBe(400);
        expect(putRes.body).toHaveProperty('message', 'Invalid ID');
    });

    //test to update when applicantdate, statusAdoption or comments are missing
    test('PUT /api/adoption-applications/:id should return 400 if data is incomplete', 
    async () => {
        const newApplication = { applicantdate: '2023-10-01', statusAdoption: 'Pending', comments: 'Looking forward to adopting!' };

        const postRes = await request(app).post('/api/adoption-applications').send(newApplication);
        const appId = postRes.body.id;

        const putRes = await request(app).put(`/api/adoption-applications/${appId}`).send({ applicantdate: '2023-10-03' });

        expect(putRes.statusCode).toBe(400);
        expect(putRes.body).toHaveProperty('message', 'applicantdate, statusAdoption and comments are required');
    });

    //test to update when adoption application not found
    test('PUT /api/adoption-applications/:id should return 404 if application not found', 
    async () => {
        const updatedApplication = { applicantdate: '2023-10-03', statusAdoption: 'Approved', comments: 'Can\'t wait to meet my new pet!' };

        const putRes = await request(app).put('/api/adoption-applications/9999').send(updatedApplication);

        expect(putRes.statusCode).toBe(404);
        expect(putRes.body).toHaveProperty('message', 'Adoption application not found');
    });

    //test to delete when id is invalid
    test('DELETE /api/adoption-applications/:id should return 400 for invalid ID', 
    async () => {
        const deleteRes = await request(app).delete('/api/adoption-applications/invalid-id');

        expect(deleteRes.statusCode).toBe(400);
        expect(deleteRes.body).toHaveProperty('message', 'Invalid ID');
    });

    //test to delete when adoption application not found
    test('DELETE /api/adoption-applications/:id should return 404 if application not found', 
    async () => {
        const deleteRes = await request(app).delete('/api/adoption-applications/9999');

        expect(deleteRes.statusCode).toBe(404);
        expect(deleteRes.body).toHaveProperty('message', 'Adoption application not found');
    });
});
