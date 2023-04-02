import client from './client';

export async function addApplication(form) {
  // console.log('form:', form);
  const response = await client.put(`/api/application`, {
    ...form,
    // address: {
    //   city: 'Kitchener',
    //   country: 'Canada',
    //   moveInDate: '2021/12/15',
    //   postalCode: 'N2N0C4',
    //   province: 'ON',
    //   streetName: 'Ira Needles Boulevard',
    //   streetNumber: '220A',
    //   unit: '801',
    // },
    // assets: [],
    // clientInfo: {
    //   currentAddress: {
    //     city: 'Kitchener',
    //     country: 'Canada',
    //     moveInDate: '2021/12/15',
    //     postalCode: 'N2N0C4',
    //     province: 'ON',
    //     streetName: 'Ira Needles Boulevard',
    //     streetNumber: '220A',
    //     unit: '801',
    //   },
    //   firstTimeBuyer: 'Yes',
    //   maritalStatus: 'Married',
    //   numberOfDependents: 0,
    //   passedAddresses: [],
    //   userId: '6420a54e303de3fe1071817f',
    // },
    // downPaymentValue: '0',
    // incomes: [],
    // intendedUseOfProperty: '',
    // professionals: [],
    // properties: [],
    // province: 'ON',
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
