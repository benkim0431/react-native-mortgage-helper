import firestore from '@react-native-firebase/firestore';

export const usersCollection = firestore().collection('users');

export function createUser({uuid, photoURL}) {
  return usersCollection.doc(uuid).set({
    uuid,
    photoURL,
  });
}

export async function getUser(uuid) {
  console.log(uuid);
  const doc = await usersCollection.doc(uuid).get();
  console.log(doc);
  return doc.data();
}
