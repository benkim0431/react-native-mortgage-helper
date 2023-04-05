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

export async function getApplicationsByAid(aId) {
  console.log('application -> ', aId);
  const response = await client.get(`/api/application/${aId}`);
  console.log('response -> ', response.data);
  return response.data;
}

export async function getApplicationsByCid(cId) {
  console.log('client -> ', cId);
  const response = await client.get(`/api/application/client/${cId}`);
  return response.data;
}

export async function getApplicationsByBroker(broker) {
  console.log('broker -> ', broker);
  const response = await client.get(`/api/application/broker/${broker}`);
  console.log('response -> ', response.data);
  return response.data;
}

export async function editApplicationById({applicationId, brokerId, status}) {
  console.log('editApplicationById -> applicationId', applicationId);
  console.log('editApplicationById -> brokerId', brokerId);
  const response = await client.post(`/api/application/${applicationId}`, {
    broker: brokerId,
    status: status,
  });
  //console.log('editApplicationById ', response.data);
  return response.data;
}

export async function getNotificationByCid(cId) {
  const response = await client.get(`/api/application/notification/${cId}`);
  return response.data;
}