const request = require('supertest');
const app = require('../src/app');
const adopterController = require('../src/controllers/adopter.controller');

describe('Adopter CRUD - separated tests', () => {
  beforeEach(() => {
    if (typeof adopterController.reset === 'function') adopterController.reset();
  });

  test('POST /api/adopters creates an adopter', async () => {
    const newAdopter = { nombreCompleto: 'Juan Pérez', dni: '1234567890' };
    const res = await request(app).post('/api/adopters').send(newAdopter).expect(201);

    expect(res.body.id).toBeDefined();
    expect(res.body.nombreCompleto).toBe('Juan Pérez');
    expect(res.body.dni).toBe('1234567890');
  });

  test('POST /api/adopters fails without nombreCompleto', async () => {
    const res = await request(app).post('/api/adopters').send({ dni: '1234567890' }).expect(400);

    expect(res.body).toHaveProperty('message', 'Nombre es requerido');
  });

  test('GET /api/adopters returns a list', async () => {
    await request(app).post('/api/adopters').send({ nombreCompleto: 'Adoptante 1' }).expect(201);
    await request(app).post('/api/adopters').send({ nombreCompleto: 'Adoptante 2' }).expect(201);

    const res = await request(app).get('/api/adopters').expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
  });

  test('GET /api/adopters/:id returns the adopter', async () => {
    const created = await request(app)
      .post('/api/adopters')
      .send({ nombreCompleto: 'María López', dni: '0987654321' })
      .expect(201);

    const id = created.body.id;

    const res = await request(app).get(`/api/adopters/${id}`).expect(200);

    expect(res.body.id).toBe(id);
    expect(res.body.nombreCompleto).toBe('María López');
  });

  test('GET /api/adopters/:id returns 400 for invalid ID', async () => {
    const res = await request(app).get('/api/adopters/invalid').expect(400);

    expect(res.body).toHaveProperty('message', 'ID invalido');
  });

  test('GET /api/adopters/:id returns 404 for non-existent adopter', async () => {
    const res = await request(app).get('/api/adopters/999').expect(404);

    expect(res.body).toHaveProperty('message', 'Adoptante no encontrado');
  });

  test('PUT /api/adopters/:id updates the adopter', async () => {
    const created = await request(app)
      .post('/api/adopters')
      .send({ nombreCompleto: 'Carlos Ruiz', telefono: '0991234567' })
      .expect(201);

    const id = created.body.id;

    const res = await request(app)
      .put(`/api/adopters/${id}`)
      .send({ telefono: '0997654321', email: 'carlos@email.com' })
      .expect(200);

    expect(res.body.telefono).toBe('0997654321');
    expect(res.body.email).toBe('carlos@email.com');
  });

  test('PUT /api/adopters/:id returns 400 for invalid ID', async () => {
    const res = await request(app)
      .put('/api/adopters/invalid')
      .send({ telefono: '0991234567' })
      .expect(400);

    expect(res.body).toHaveProperty('message', 'ID invalido');
  });

  test('PUT /api/adopters/:id returns 404 for non-existent adopter', async () => {
    const res = await request(app)
      .put('/api/adopters/999')
      .send({ telefono: '0991234567' })
      .expect(404);

    expect(res.body).toHaveProperty('message', 'Adoptante no encontrado');
  });

  test('DELETE /api/adopters/:id deletes the adopter', async () => {
    const created = await request(app)
      .post('/api/adopters')
      .send({ nombreCompleto: 'Ana Torres' })
      .expect(201);

    const id = created.body.id;

    await request(app).delete(`/api/adopters/${id}`).expect(204);
    await request(app).get(`/api/adopters/${id}`).expect(404);
  });

  test('DELETE /api/adopters/:id returns 400 for invalid ID', async () => {
    const res = await request(app).delete('/api/adopters/invalid').expect(400);

    expect(res.body).toHaveProperty('message', 'ID invalido');
  });

  test('DELETE /api/adopters/:id returns 404 for non-existent adopter', async () => {
    const res = await request(app).delete('/api/adopters/999').expect(404);

    expect(res.body).toHaveProperty('message', 'Adoptante no encontrado');
  });
});