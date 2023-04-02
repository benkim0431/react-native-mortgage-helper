import client from './client';

export async function setClient({userId}) {
  const response = await client
    .put('api/broker', {
      userId,
    })
    .catch(error => {
      // console.log('registerUser error' + error.response.data.message);
      throw new Error(error.response.data.message);
    });
  return response.data;
}
