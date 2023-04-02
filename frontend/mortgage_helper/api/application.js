import client from './client';

export async function addApplication(form) {
  // console.log('form:', form);
  const response = await client
    .put(`/api/application`, {
      ...form,
    })
    .catch(error => {
      throw new Error(error.response.data.message);
    });
  return response.data;
}

export async function getApplicationsByCid(cId) {
  const response = await client.get(`/api/application/client/${cId}`);
  return response.data;
}

export async function editApplicationById({applicationId, brokerId, status}) {
  // console.log('editApplicationById -> applicationId', applicationId);
  // console.log('editApplicationById -> brokerId', brokerId);
  const response = await client.post(`/api/application/${applicationId}`, {
    brokerId: brokerId,
    status: status,
  });
  //console.log('editApplicationById ', response.data);
  return response.data;
}
