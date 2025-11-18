const request = require('supertest');
const app = require('../src/app');
const petController = require('../src/controllers/pet.controller');

describe('Pets CRUD - separated tests', () => {
  beforeEach(() => {
    if (typeof petController.reset === 'function') petController.reset();
  });

  test('POST /api/pets creates a pet', async () => {
    const newPet = { nombre: 'Fido', edad: 3 };
    const res = await request(app).post('/api/pets').send(newPet).expect(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.nombre).toBe('Fido');
  });

  test('GET /api/pets returns a list', async () => {
    await request(app).post('/api/pets').send({ nombre: 'A' }).expect(201);
    await request(app).post('/api/pets').send({ nombre: 'B' }).expect(201);
    const res = await request(app).get('/api/pets').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
  });

  test('GET /api/pets/:id returns the pet', async () => {
    const created = await request(app).post('/api/pets').send({ nombre: 'Solo' }).expect(201);
    const id = created.body.id;
    const res = await request(app).get(`/api/pets/${id}`).expect(200);
    expect(res.body.id).toBe(id);
    expect(res.body.nombre).toBe('Solo');
  });

  test('PUT /api/pets/:id updates the pet', async () => {
    const created = await request(app).post('/api/pets').send({ nombre: 'Up', edad: 1 }).expect(201);
    const id = created.body.id;
    const res = await request(app).put(`/api/pets/${id}`).send({ edad: 2 }).expect(200);
    expect(res.body.edad).toBe(2);
  });

  test('DELETE /api/pets/:id deletes the pet', async () => {
    const created = await request(app).post('/api/pets').send({ nombre: 'Del' }).expect(201);
    const id = created.body.id;
    await request(app).delete(`/api/pets/${id}`).expect(204);
    await request(app).get(`/api/pets/${id}`).expect(404);
  });
});

describe('Pets error and edge cases', () => {
  beforeEach(() => {
    if (typeof petController.reset === 'function') petController.reset();
  });

  test('POST /api/pets without nombre returns 400', async () => {
    await request(app).post('/api/pets').send({ edad: 2 }).expect(400);
  });

  test('GET /api/pets/:id with invalid id format returns 400', async () => {
    await request(app).get('/api/pets/abc').expect(400);
  });

  test('GET /api/pets/:id for non-existent id returns 404', async () => {
    await request(app).get('/api/pets/999').expect(404);
  });

  test('PUT /api/pets/:id with invalid id format returns 400', async () => {
    await request(app).put('/api/pets/xyz').send({ nombre: 'X' }).expect(400);
  });

  test('PUT /api/pets/:id for non-existent id returns 404', async () => {
    await request(app).put('/api/pets/1234').send({ nombre: 'X' }).expect(404);
  });

  test('DELETE /api/pets/:id with invalid id returns 400', async () => {
    await request(app).delete('/api/pets/nope').expect(400);
  });

  test('DELETE /api/pets/:id for non-existent id returns 404', async () => {
    await request(app).delete('/api/pets/4321').expect(404);
  });

  test('GET /api/pets returns empty array when none exist', async () => {
    const res = await request(app).get('/api/pets').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });
});
