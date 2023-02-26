import client from './client';

export async function getBrokerByProvince(prov) {
  const response = await client.get(`api/broker/province/${prov}`);
  //   console.log(response.data);
  return response.data;
}
