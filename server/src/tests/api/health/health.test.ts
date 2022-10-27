import { describe, expect, test } from '@jest/globals';
import request from 'supertest';

import { app } from '../../../app';

describe('Test health route', () => {
  test('The GET method should return an OK response', async () => {
    const response = await request(app).get('/api/v1/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ ok: true });
  });
});
