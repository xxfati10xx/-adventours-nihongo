import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCIZ_D9h-ZJ0AueFinQXu4VxSpx1p68QP8",
  authDomain: "adventours-nihongo.firebaseapp.com",
  projectId: "adventours-nihongo",
  storageBucket: "adventours-nihongo.firebasestorage.app",
  messagingSenderId: "767782754441",
  appId: "1:767782754441:web:bb1c98d5313bf1ee2c4e58",
  measurementId: "G-F87YF6M8ZQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const appId = 'adventours-cr-nihongo';

async function updateMetadata() {
  const metadataRef = doc(db, 'artifacts', appId, 'public', 'metadata');
  const newVersion = '1.0.4';

  console.log(`Actualizando versión a ${newVersion}...`);

  await setDoc(metadataRef, {
    version: newVersion,
    last_updated: new Date().toISOString()
  }, { merge: true });

  console.log("¡Versión actualizada en Firestore! Tu APK ahora debería descargar los 1000+ verbos.");
  process.exit();
}

updateMetadata();
