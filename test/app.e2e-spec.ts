import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { PrismaService } from 'prisma/prisma.service';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleFixture.get(PrismaService);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    await prisma.noteLog.deleteMany();
    await prisma.note.deleteMany();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /notes should create note', async () => {
    await request(app.getHttpServer())
      .post('/notes')
      .send({
        title: 'Test',
        content: 'Test content',
      })
      .expect(201);
  });

  it('GET /notes/:id should get info note', async () => {
    const createRes = await request(app.getHttpServer()).post('/notes').send({
      title: 'Test',
      content: 'Test content',
    });

    const id = createRes.body.id;
    await request(app.getHttpServer())
      .get('/notes/' + id)
      .expect(200);
  });

  it('PUT /notes/:id should update note', async () => {
    const createRes = await request(app.getHttpServer()).post('/notes').send({
      title: 'Test',
      content: 'Test content',
    });

    const id = createRes.body.id;
    await request(app.getHttpServer())
      .put('/notes/' + id)
      .send({ title: 'E2e Test', content: 'E2e Test content' })
      .expect(200);
  });

  it('DELETE /notes/:id should delete note', async () => {
    const createRes = await request(app.getHttpServer()).post('/notes').send({
      title: 'Test',
      content: 'Test content',
    });

    const id = createRes.body.id;

    await request(app.getHttpServer())
      .delete('/notes/' + id)
      .expect(200);
  });

  it('GET deleted note should return 404', async () => {
    const createRes = await request(app.getHttpServer()).post('/notes').send({
      title: 'Test',
      content: 'Test content',
    });

    const id = createRes.body.id;

    await request(app.getHttpServer()).delete('/notes/' + id);

    await request(app.getHttpServer())
      .get('/notes/' + id)
      .expect(404);
  });
});
