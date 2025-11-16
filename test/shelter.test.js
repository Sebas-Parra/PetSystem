const request = require('supertest');
const app = require('../src/app');
const shelterController = require('../src/controllers/shelter.controller');

describe('Shelter CRUD - separated tests', () => {
  beforeEach(() => {
    if (typeof shelterController.reset === 'function') shelterController.reset();
  });


  test('POST /api/shelter creates a shelter', async () => {
    const newShelter = { nombre: 'Shelter Central', direccion: 'Calle 1' };
    const res = await request(app).post('/api/shelter').send(newShelter).expect(201);

    expect(res.body.id).toBeDefined();
    expect(res.body.nombre).toBe('Shelter Central');
    expect(res.body.direccion).toBe('Calle 1');
  });

  test('GET /api/shelter returns a list', async () => {
    await request(app).post('/api/shelter').send({ nombre: 'R1' }).expect(201);
    await request(app).post('/api/shelter').send({ nombre: 'R2' }).expect(201);

    const res = await request(app).get('/api/shelter').expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
  });

  test('GET /api/shelter/:id returns the shelter', async () => {
    const created = await request(app)
      .post('/api/shelter')
      .send({ nombre: 'Único', direccion: 'X' })
      .expect(201);

    const id = created.body.id;

    const res = await request(app).get(`/api/shelter/${id}`).expect(200);

    expect(res.body.id).toBe(id);
    expect(res.body.nombre).toBe('Único');
  });

  test('PUT /api/shelter/:id updates the shelter', async () => {
    const created = await request(app)
      .post('/api/shelter')
      .send({ nombre: 'Viejo', direccion: 'Antigua' })
      .expect(201);

    const id = created.body.id;

    const res = await request(app)
      .put(`/api/shelter/${id}`)
      .send({ direccion: 'Nueva dirección', telefono: '0999999999' })
      .expect(200);

    expect(res.body.direccion).toBe('Nueva dirección');
    expect(res.body.telefono).toBe('0999999999');
  });

  test('DELETE /api/shelter/:id deletes the shelter', async () => {
    const created = await request(app)
      .post('/api/shelter')
      .send({ nombre: 'Borrar' })
      .expect(201);

    const id = created.body.id;

    await request(app).delete(`/api/shelter/${id}`).expect(204);
    await request(app).get(`/api/shelter/${id}`).expect(404);
  });
});
