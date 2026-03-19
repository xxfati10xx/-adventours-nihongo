import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, writeBatch } from 'firebase/firestore';

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

const VERBS_DATA = [
  { romaji: "hoshigaru", esp: "querer", claves: ["querer", "desear"], tipo: "Verbos", categoria: "Verbos", grupo: "SENTIMIENTO" },
  { romaji: "inu", esp: "perro", claves: ["perro"], tipo: "Animal", categoria: "Sustantivo", grupo: "NATURALEZA" },
  { romaji: "taberu", esp: "comer", claves: ["comer"], tipo: "Verbos", categoria: "Verbos", grupo: "ACCION" },
  { romaji: "nomu", esp: "beber", claves: ["beber"], tipo: "Verbos", categoria: "Verbos", grupo: "ACCION" },
  { romaji: "miru", esp: "ver", claves: ["ver"], tipo: "Verbos", categoria: "Verbos", grupo: "PERCEPCION" },
  { romaji: "kiku", esp: "escuchar", claves: ["escuchar"], tipo: "Verbos", categoria: "Verbos", grupo: "PERCEPCION" },
  { romaji: "kaku", esp: "escribir", claves: ["escribir"], tipo: "Verbos", categoria: "Verbos", grupo: "ACCION" },
  { romaji: "yomu", esp: "leer", claves: ["leer"], tipo: "Verbos", categoria: "Verbos", grupo: "ACCION" },
  { romaji: "iku", esp: "ir", claves: ["ir"], tipo: "Verbos", categoria: "Verbos", grupo: "MOVIMIENTO" },
  { romaji: "suru", esp: "hacer", claves: ["hacer"], tipo: "Verbos", categoria: "Verbos", grupo: "ACCION" }
];

// Generating 1000 items
for(let i = 0; i < 990; i++) {
  const base = VERBS_DATA[i % VERBS_DATA.length];
  VERBS_DATA.push({
    ...base,
    romaji: `${base.romaji}-${i}`,
    esp: `${base.esp} (${i})`,
    claves: [`${base.esp}-${i}`]
  });
}

async function uploadData() {
  const vocabRef = collection(db, 'artifacts', appId, 'public', 'data', 'vocabulary');
  const CHUNK_SIZE = 500;

  console.log(`Iniciando subida de ${VERBS_DATA.length} vocablos...`);

  for (let i = 0; i < VERBS_DATA.length; i += CHUNK_SIZE) {
    const chunk = VERBS_DATA.slice(i, i + CHUNK_SIZE);
    const batch = writeBatch(db);

    chunk.forEach((item) => {
      const id = (item.romaji).replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
      const docRef = doc(vocabRef, id);
      batch.set(docRef, item);
    });

    await batch.commit();
    console.log(`Lote completado: ${Math.min(i + CHUNK_SIZE, VERBS_DATA.length)} / ${VERBS_DATA.length}`);
  }

  console.log("¡Subida completada!");
  process.exit();
}

uploadData();
