import request from 'supertest';
import { describe, it, expect } from '@jest/globals';
import { ERROR_INVALID_ORIGINAL_URL, ERROR_INVALID_EXPIRES_AT } from '../src/errors';

const BASE_URL = 'http://localhost:3000';

describe('E2E: Shorten URL', () => {
  it('should return 400 if originalUrl is missing', async () => {
    const res = await request(BASE_URL).post('/shorten').send({
      originalUrl: '',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(ERROR_INVALID_ORIGINAL_URL.message);
  });

  it('should return 400 if originalUrl invalid', async () => {
    const res = await request(BASE_URL).post('/shorten').send({
      originalUrl: 'https://examplecom',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(ERROR_INVALID_ORIGINAL_URL.message);
  });

  it('should return 400 if originalUrl invalid', async () => {
    const res = await request(BASE_URL).post('/shorten').send({
      originalUrl: 'https:/example.com',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(ERROR_INVALID_ORIGINAL_URL.message);
  });

  it('should return 400 if originalUrl invalid', async () => {
    const res = await request(BASE_URL).post('/shorten').send({
      originalUrl: 'htt://example.com',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(ERROR_INVALID_ORIGINAL_URL.message);
  });

	it('should return 400 if originalUrl invalid', async () => {
    const res = await request(BASE_URL).post('/shorten').send({
      originalUrl: 'example.com',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(ERROR_INVALID_ORIGINAL_URL.message);
  });

  it('should return 400 if expiresAt is in the past or invalid date', async () => {
    const res = await request(BASE_URL).post('/shorten').send({
      originalUrl: 'https://example.com',
      expiresAt: '2020-01-01T00:00:00Z',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(ERROR_INVALID_EXPIRES_AT.message);
  });

  it('should return 201 and a short URL when valid data is provided', async () => {
    const res = await request(BASE_URL)
      .post('/shorten')
      .send({
        originalUrl: 'https://test.com',
        expiresAt: new Date(Date.now() + 86400000).toISOString(),
      });

    expect(res.status).toBe(201);
    expect(res.body.shortUrl).toBeDefined();
  });
});
