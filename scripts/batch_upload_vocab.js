import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, writeBatch } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDCDMIXn6ddA_RMLpN1_AgC4eVAQMl4ciw",
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

/**
 * Reemplaza este array con tus 10,000 palabras.
 * El formato debe ser: { romaji, esp, claves, tipo, categoria, grupo }
 */
const DATA_TO_UPLOAD = [
  // Ejemplo:
  // { romaji: "arigatou", esp: "Gracias", claves: ["gracias"], tipo: "Saludo", categoria: "Sustantivo", grupo: "SOCIAL" },
];

async function uploadData() {
  if (DATA_TO_UPLOAD.length === 0) {
    console.log("Error: El array DATA_TO_UPLOAD está vacío. Por favor, pega tus datos allí.");
    process.exit();
  }

  const vocabRef = collection(db, 'artifacts', appId, 'public', 'data', 'vocabulary');
  const CHUNK_SIZE = 500; // Límite de Firestore para batches

  console.log(`Iniciando subida de ${DATA_TO_UPLOAD.length} palabras...`);

  for (let i = 0; i < DATA_TO_UPLOAD.length; i += CHUNK_SIZE) {
    const chunk = DATA_TO_UPLOAD.slice(i, i + CHUNK_SIZE);
    const batch = writeBatch(db);

    chunk.forEach((item) => {
      const id = (item.romaji || item.esp).replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() || Math.random().toString(36).substr(2, 9);
      const docRef = doc(vocabRef, id);
      batch.set(docRef, item);
    });

    await batch.commit();
    console.log(`Lote completado: ${Math.min(i + CHUNK_SIZE, DATA_TO_UPLOAD.length)} / ${DATA_TO_UPLOAD.length}`);
  }

  console.log("¡Subida completada con éxito!");
  process.exit();
}

uploadData();
