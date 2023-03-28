import client from './client';

export async function getBrokerByProvince(prov) {
  const response = await client.get(`api/broker/province/${prov}`);
  //   console.log(response.data);
  return response.data;
}

export async function getAllBrokers() {
  const response = await client.get(`api/broker`);
  //console.log('all brokers:', response.data);
  return response.data;
}
