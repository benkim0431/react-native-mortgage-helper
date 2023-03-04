import auth from '@react-native-firebase/auth';

export function signIn({email, password}) {
  return auth().signInWithEmailAndPassword(email, password);
}

export function signUp({email, password}) {
  return auth().createUserWithEmailAndPassword(email, password);
}

export function subscribeAuth(callback) {
  return auth().onAuthStateChanged(callback);
}

export function getCredential({curPassword}) {
  return auth.EmailAuthProvider.credential(
    auth().currentUser.email,
    curPassword,
  );
}

export function reauthenticate({credential}) {
  return auth().currentUser.reauthenticateWithCredential(credential);
}

export function changePassword({newPassword}) {
  return auth().currentUser.updatePassword(newPassword);
}

export function signOut() {
  return auth().signOut();
}
