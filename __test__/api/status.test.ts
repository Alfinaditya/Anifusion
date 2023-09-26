import { apiUrl } from '@/lib/consts';
import 'isomorphic-fetch';

describe('Status', () => {
  it('Should return 200 Status Code', async () => {
    const res = await fetch(apiUrl);
    expect(res.status).toBe(200);
  });
});
