import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const auth = getAuth(app);
export const db = getFirestore(app);
export const appId = 'adventours-cr-nihongo';

export const MASTER_SEED = {
  GRAMMAR: {
    n5_base: {
      cat: "Nivel N5: Fundamentos",
      icon: "Shapes",
      regla: "Uso de partículas WA (tema), O (objeto), GA (sujeto) y NI (lugar/tiempo).",
      detalles: ["Sustantivo + DESU (Ser)", "Partícula NO (Posesión)", "Partícula KA (Pregunta)", "Hiragana y Katakana básicos"],
      ejemplos: [{ jap: "Watashi wa gakusei desu", esp: "Yo soy estudiante" }]
    },
    n4_conjugacion: {
      cat: "Nivel N4: Conjugación",
      icon: "Workflow",
      regla: "Formas verbales de cortesía (~MASU), forma TE, potencial (~ERU) y deseo (~TAI).",
      detalles: ["Condicional ~TARA", "Forma Volitiva (~YOU)", "Existencia IRU/ARU", "Adjetivos I y NA"],
      ejemplos: [{ jap: "Tabetai desu", esp: "Quiero comer" }]
    },
    n3_secuencia: {
      cat: "Nivel N3: Secuencia y Causa",
      icon: "Timer",
      regla: "Expresar momentos exactos (~TOKORO), causas objetivas (~NODE) y arrepentimiento (~SHIMAU).",
      detalles: ["~BAKARI (Acaba de)", "~AIDA (Mientras)", "~TE KARA (Después de)", "~TE MIRU (Intentar)"],
      ejemplos: [{ jap: "Tabeta bakari da", esp: "Acabo de comer" }]
    },
    n2_honorificos: {
      cat: "Nivel N2: Cortesía y Sufijos",
      icon: "Crown",
      regla: "Uso de Keigo (honorífico/humilde) y sufijos de cualidad (~SA, ~MI, ~RASHII).",
      detalles: ["~GATHI (Tendencia)", "~DARAKE (Lleno de)", "~TOSHITE (Como/En calidad de)", "Kenjougo y Sonkeigo"],
      ejemplos: [{ jap: "Mairimasu", esp: "Ir/Venir (Humilde)" }]
    },
    n1_sintaxis: {
      cat: "Nivel N1: Maestría",
      icon: "Bolt",
      regla: "Lógica avanzada, prohibiciones arcaicas (~BEKARAZU) y matices morales (~MAJIKI).",
      detalles: ["~ZARU O ENAI (Sin remedio)", "~NARI NI (A su manera)", "~GOTOKI (Como si fuera)", "Sintaxis literaria"],
      ejemplos: [{ jap: "Yaruzaru o enai", esp: "No hay más remedio que hacerlo" }]
    }
  },
  VOCABULARY: [
    { romaji: "", esp: "El / La / Los / Las", claves: ["el", "la", "los", "las"], tipo: "Articulo", categoria: "GRAMATICA", grupo: "ABSTRACTO" },
    { romaji: "to", esp: "Y", claves: ["y"], tipo: "Conector", categoria: "GRAMATICA", grupo: "ABSTRACTO" },
    { romaji: "kaisha", esp: "Empresa", claves: ["empresa"], tipo: "Negocios", grupo: "SOCIEDAD", categoria: "Sustantivo" },
    { romaji: "shigoto", esp: "Trabajo", claves: ["trabajo"], tipo: "Negocios", grupo: "INDUSTRIAS", categoria: "Sustantivo" },
    { romaji: "kangaeru", esp: "Pensar", claves: ["pensar"], tipo: "Cognición", grupo: "ABSTRACTO", categoria: "Verbos" },
    { romaji: "mamoru", esp: "Proteger", claves: ["proteger", "cumplir"], tipo: "Leyes", grupo: "SOCIEDAD", categoria: "Verbos" },
    { romaji: "kyou", esp: "Hoy", claves: ["hoy"], tipo: "Tiempo", grupo: "ABSTRACTO", categoria: "Sustantivo" },
    { romaji: "sensei", esp: "Maestro", claves: ["maestro", "profesor", "sensei"], tipo: "Persona", grupo: "SOCIEDAD", categoria: "Sustantivo" },
    { romaji: "yomu", esp: "Leer", claves: ["leer", "leyendo"], tipo: "Acción", grupo: "CULTURA", categoria: "Verbos" },
    { romaji: "hon", esp: "Libro", claves: ["libro", "libros"], tipo: "Objeto", grupo: "CULTURA", categoria: "Sustantivo" },
    { romaji: "taberu", esp: "Comer", claves: ["comer", "comiendo"], tipo: "Vida", grupo: "COTIDIANO", categoria: "Verbos" },
    { romaji: "mizu", esp: "Agua", claves: ["agua"], tipo: "Vida", grupo: "NATURALEZA", categoria: "Sustantivo" },
    { romaji: "nihongo", esp: "Japonés", claves: ["japones"], tipo: "Idioma", grupo: "SOCIEDAD", categoria: "Sustantivo" },
    { romaji: "manabu", esp: "Aprender", claves: ["aprender"], tipo: "Educación", grupo: "SOCIEDAD", categoria: "Verbos" }
  ]
};
