import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let createdNoteId: number;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /notes should create note', async () => {
    const res = await request(app.getHttpServer())
      .post('/notes')
      .send({
        title: 'Test',
        content: 'Test content',
      })
      .expect(201);

    createdNoteId = res.body.id;
  });

  it('GET /notes/:id should get info note', async () => {
    await request(app.getHttpServer())
      .get('/notes/' + createdNoteId)
      .expect(200);
  });

  it('PUT /notes/:id should update note', async () => {
    await request(app.getHttpServer())
      .put('/notes/' + createdNoteId)
      .send({ title: 'E2e Test', content: 'E2e Test content' })
      .expect(200);
  });

  it('DELETE /notes/:id should delete note', async () => {
    await request(app.getHttpServer())
      .delete('/notes/' + createdNoteId)
      .expect(200);
  });

  it('GET deleted note should return 404', async () => {
    await request(app.getHttpServer())
      .get('/notes/' + createdNoteId)
      .expect(404);
  });
});
