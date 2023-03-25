import client from './client';

export async function addApplication(cid) {
  const response = await client.put(`/api/application`, {
    clientId: cid,
    downPaymentValue: "15000",
    province: "ON",
    intendedUseOfProperty: "Owned",
    address: {
      streetNumber: "220A",
      streetName: "Ira Needles Blvd",
      unit: "801",
      city: "Kitchener",
      province: "ON",
      country: "Canada",
      postalCode: "N2N0C4",
      moveInDate: "2021/12/15"
    },
    assets: [
      {
        type: "Savings",
        value: "50000"
      }
    ],
    incomes: [
      {
        type: "Employed",
        amount: "120000",
        startDate: "2023/01/01"
      }
    ],
    properties: [],
    professionals: []
  });
  return response.data;
}

export async function getApplicationsByCid(cId) {
  const response = await client.get(`/api/application/client/${cId}`);
  return response.data;
}
