// src/lib/data.js
import { collection, getDocs, query, orderBy, limit, doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Adapter: Firestore 'reports' -> UI report shape used by map & details
 */
const mapDocToReport = (d) => {
  const data = d.data() || {};
  return {
    id: d.id,
    title: data.title || 'Untitled report',
    description: data.description || '',
    category: (data.category || '').toString().toLowerCase().replace(/\s+/g, '_'),
    city: (data.city || '').toString().toLowerCase(),
    coordinates: { lat: data.lat ?? 0, lng: data.lng ?? 0 },
    photo_url: data.photoURL || '',
    status: (data.status || 'pending').toString().toLowerCase(),
    created_at: data.createdAt || null,
    updated_at: data.updatedAt || null,
    // expose raw as well for detail page
    _raw: data,
  };
};

/** Fetch latest reports for the home map view */
export async function fetchReports() {
  const q = query(collection(db, 'reports'), orderBy('createdAt', 'desc'), limit(100));
  const snap = await getDocs(q);
  return snap.docs.map(mapDocToReport);
}

/** Fetch a single report by id */
export async function fetchReportById(id) {
  const r = await getDoc(doc(db, 'reports', id));
  if (!r.exists()) return null;
  return mapDocToReport(r);
}


/** Update a report's status in Firestore */
export async function updateReportStatus(id, status) {
  if (!id) throw new Error('Missing report id');
  const ref = doc(db, 'reports', id);
  await updateDoc(ref, { status, updatedAt: serverTimestamp() });
}
