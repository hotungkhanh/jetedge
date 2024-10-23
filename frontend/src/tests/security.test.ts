import { describe, it, expect } from 'vitest';
import { REMOTE_API_URL } from '../scripts/api';
import { AuthHeader } from '../security/AuthContext';


/**
 * Test Basic Authentication with backend.
 */
describe('authentication', { timeout: 200000 }, () => {

  it('allow access given correct username and password', async () => {

    const authHeader: AuthHeader = `Basic ${btoa(`${import.meta.env.VITE_FRONTEND_USERNAME}:${import.meta.env.VITE_FRONTEND_PASSWORD}`)}`;
    const response = await fetch(REMOTE_API_URL + "/login", {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
      },
    });

    expect(response.status).not.equal(401);
    
    const text = await response.text();
    expect(text).equal("jetedge");

  });

  it('does not allow access given wrong username or password', async () => {

    const authHeader: AuthHeader = '';
    const response = await fetch(REMOTE_API_URL + "/login", {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
      },
    });

    expect(response.status).equal(401);

  });

});