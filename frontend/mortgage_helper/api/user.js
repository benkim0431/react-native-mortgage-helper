import UserTypeScreen from '../screens/UserTypeScreen';
import client from './client';

export async function registerUser({
  uuid,
  firstName,
  lastName,
  phoneNumber,
  workNumber,
}) {
  const response = await client.post('/public/register', {
    uuid: uuid,
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    workNumber: workNumber,
  }).catch((error) => {
    // console.log('registerUser error' + error.response.data.message);
    throw new Error(error.response.data.message);
  });
  return response.data;
}

export async function loginUser({uuid, deviceId}) {
  const response = await client.post('/public/login', {
    uuid: uuid,
    device: deviceId,
  }).catch((error) => {
    console.log('loginUser error' + error.message);
  });
  // console.log('response', response.data);
  return response.data;
}

export async function getUserByUuid(uuid) {
  const response = await client.get(`/api/user/${uuid}`);
  return response.data;
}

export async function getUserById(id) {
  const response = await client.get(`/api/user/id/${id}`);
  return response.data;
}

export async function editUserByUuid(form) {
  // console.log(form);
  const uuid = form.uuid;
  const response = await client.post(`/api/user/${uuid}`, {
    firstName: form.firstName,
    lastName: form.lastName,
    phoneNumber: form.phoneNumber,
    workNumber: form.workNumber,
    photoURL: form.photoURL,
  });
  return response.data;
}

export async function setUserTypeByUuid({uuid, userType}){
  const response = await client.post(`/api/user/${uuid}`, {
    type: userType,
  });
  return response.data;
}