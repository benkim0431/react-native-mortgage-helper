import client from './client';

export async function getApplicationsByCid(cId) {
  const response = await client.get(`/api/application/client/${cId}`);
  return response.data;
}
