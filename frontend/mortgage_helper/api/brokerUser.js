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

export async function setBroker({
  userId,
  companyName,
  percentageFee,
  province,
}) {
  const response = await client
    .put('api/broker', {
      userId: userId,
      companyName: companyName,
      percentageFee: percentageFee,
      province: province,
    })
    .catch(error => {
      // console.log('registerUser error' + error.response.data.message);
      throw new Error(error.response.data.message);
    });
  return response.data;
}
