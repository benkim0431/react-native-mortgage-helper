import client from './client';
import axios from 'axios';

export async function registerUser({uid, firstName, lastName}) {
  const response = await client.post('/register', {
    uuid: uid,
    firstName: firstName,
    lastName: lastName,
  });

  return response.data;
}
