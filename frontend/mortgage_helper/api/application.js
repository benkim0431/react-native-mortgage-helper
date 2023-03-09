import client from './client';

export async function addApplication(cid) {
  const response = await client.put(`/api/application`, {
    clientId: cid,
  });
  return response.data;
}

export async function getApplicationsByCid(cId) {
  const response = await client.get(`/api/application/client/${cId}`);
  return response.data;
}
