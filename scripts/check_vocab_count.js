import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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

async function countVocabulary() {
  try {
    console.log("Conectando a Firestore...");
    const vocabRef = collection(db, 'artifacts', appId, 'public', 'data', 'vocabulary');
    const snapshot = await getDocs(vocabRef);
    console.log(`Éxito: Se encontraron ${snapshot.size} documentos en la colección de vocabulario.`);
  } catch (error) {
    console.error("Error al contar documentos:", error);
  } finally {
    process.exit();
  }
}

countVocabulary();
