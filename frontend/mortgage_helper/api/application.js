import client from './client';

export async function addApplication(form) {
  console.log('form:', form);
  const response = await client.put(`/api/application`, {
    ...form,
  });
  return response.data;
}

export async function getApplicationsByCid(cId) {
  const response = await client.get(`/api/application/client/${cId}`);
  return response.data;
}
