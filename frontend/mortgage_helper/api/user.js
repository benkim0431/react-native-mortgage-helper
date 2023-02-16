import client from './client';

export async function registerUser({uid, firstName, lastName}) {
  const response = await client.post('/public/register', {
    uuid: uid,
    firstName: firstName,
    lastName: lastName,
  });

  return response.data;
}

export async function loginUser(uid, deviceId) {
  const response = await client.post('/public/login', {
    uuid: uid,
    device: deviceId,
  });
  return response.data;
}

export async function getUserByUuid(uid) {
  const response = await client.get(`/api/user/${uid}`);
  return response.data;
}

export async function editUserByUuid(form) {
  // console.log(form);
  const response = await client.post(`/api/user/${form.uid}`, {
    firstName: form.firstName,
    lastName: form.lastName,
    phoneNumber: form.phoneNumber,
    workNumber: form.workNumber,
  });
  return response.data;
}
