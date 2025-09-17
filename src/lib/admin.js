import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function userIsAdmin(uid) {
  if (!uid) return false;
  const snap = await getDoc(doc(db, 'admins', uid));
  return snap.exists() && snap.data()?.isAdmin === true;
}
