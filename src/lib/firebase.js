import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAI, getGenerativeModel, VertexAIBackend } from "firebase/ai";

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
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const auth = getAuth(app);
export const db = getFirestore(app);
export const ai = getAI(app, { backend: new VertexAIBackend() });
export const generativeModel = getGenerativeModel(ai, { model: "gemini-2.0-flash" });
export const generativeModelFallback = getGenerativeModel(ai, { model: "gemini-1.5-flash" });
export const appId = 'adventours-cr-nihongo';
export const APP_VERSION = '1.0.2'; // Forced cache refresh for new 12-level system

export const MASTER_SEED = {
  GRAMMAR: {
    lvl1_be: {
      nivel: 1, fase: 1, cat: "FASE 1: LOS CIMIENTOS", icon: "User",
      regla: "[Sujeto] WA [Sustantivo] DESU.",
      detalles: ["Identidad (Verb to Be)", "WA marca el tema", "DESU es la cópula afirmativa"],
      ejemplos: [{ jap: "Watashi wa gakusei desu", esp: "Yo soy estudiante" }]
    },
    lvl2_present: {
      nivel: 2, fase: 1, cat: "FASE 1: LOS CIMIENTOS", icon: "Zap",
      regla: "[Objeto] WO [Verbo forma MASU].",
      detalles: ["Presente Simple (Acción)", "El verbo siempre va al final", "WO marca el objeto directo"],
      ejemplos: [{ jap: "Ringo wo tabemasu", esp: "Como una manzana" }]
    },
    lvl3_past_neg: {
      nivel: 3, fase: 1, cat: "FASE 1: LOS CIMIENTOS", icon: "Clock",
      regla: "MASU -> MASHITA (Pasado) / MASEN (Negativo).",
      detalles: ["Tiempos Simples", "Pasado: ~MASHITA", "Negativo: ~MASEN"],
      ejemplos: [{ jap: "Tabemashita / Tabemasen", esp: "Comí / No como" }]
    },
    lvl4_questions: {
      nivel: 4, fase: 1, cat: "FASE 1: LOS CIMIENTOS", icon: "HelpCircle",
      regla: "Agregar KA al final.",
      detalles: ["Preguntas y Dudas", "Funciona como signo de interrogación", "Mantiene el orden original"],
      ejemplos: [{ jap: "Tabemasu ka?", esp: "¿Comes?" }]
    },
    lvl5_adjectives: {
      nivel: 5, fase: 2, cat: "FASE 2: EL COLOR DEL LENGUAJE", icon: "Palette",
      regla: "Adjetivos ~I (directo) / ~NA (+na).",
      detalles: ["La Pintura", "I-Adj: Oishii ringo", "NA-Adj: Kirei na hana"],
      ejemplos: [{ jap: "Oishii ringo", esp: "Manzana deliciosa" }]
    },
    lvl6_existence: {
      nivel: 6, fase: 2, cat: "FASE 2: EL COLOR DEL LENGUAJE", icon: "MapPin",
      regla: "ARIMASU (Cosas) / IMASU (Vivos).",
      detalles: ["Ubicación y Existencia", "There is / There are", "Partícula GA marca la existencia"],
      ejemplos: [{ jap: "Neko ga imasu", esp: "Hay un gato" }]
    },
    lvl7_desire: {
      nivel: 7, fase: 2, cat: "FASE 2: EL COLOR DEL LENGUAJE", icon: "Heart",
      regla: "Raíz verbal + ~TAI.",
      detalles: ["I want to...", "Expresa voluntad rápida", "Se conjuga como adjetivo ~I"],
      ejemplos: [{ jap: "Tabetai desu", esp: "Quiero comer" }]
    },
    lvl8_invitations: {
      nivel: 8, fase: 2, cat: "FASE 2: EL COLOR DEL LENGUAJE", icon: "Users",
      regla: "MASU -> MASHOU.",
      detalles: ["Invitaciones (Let's go!)", "Hagamos algo juntos", "Tono entusiasta"],
      ejemplos: [{ jap: "Ikimashou!", esp: "¡Vamos!" }]
    },
    lvl9_te_form: {
      nivel: 9, fase: 3, cat: "FASE 3: CONEXIÓN Y FLUIDEZ", icon: "Link",
      regla: "Forma ~TE (Conector).",
      detalles: ["Conector 'and'", "Une acciones secuenciales", "Base para favores (~kudasai)"],
      ejemplos: [{ jap: "Tabete, nemasu", esp: "Como y duermo" }]
    },
    lvl10_continuous: {
      nivel: 10, fase: 3, cat: "FASE 3: CONEXIÓN Y FLUIDEZ", icon: "RefreshCw",
      regla: "Forma ~TE + IRU.",
      detalles: ["Presente Continuo (-ing)", "I am doing...", "Estado actual de la acción"],
      ejemplos: [{ jap: "Tabete imasu", esp: "Estoy comiendo" }]
    },
    lvl11_permissions: {
      nivel: 11, fase: 3, cat: "FASE 3: CONEXIÓN Y FLUIDEZ", icon: "ShieldCheck",
      regla: "~TE MO II (Permiso) / ~TE WA IKEMASEN (Prohibición).",
      detalles: ["May I? / You must not", "Interacción social básica", "Normas y reglas"],
      ejemplos: [{ jap: "Tabete mo ii desu ka?", esp: "¿Puedo comer?" }]
    },
    lvl12_potential: {
      nivel: 12, fase: 3, cat: "FASE 3: CONEXIÓN Y FLUIDEZ", icon: "Star",
      regla: "Forma Potencial (~ERU/REIRU).",
      detalles: ["Capacidad (Can)", "Be able to...", "Cambia la estructura del verbo"],
      ejemplos: [{ jap: "Taberareru", esp: "Puedo comer" }]
    }
  },
  PARTICLES: {
    WA: { label: "WA", desc: "El Tema (De qué hablamos)" },
    GA: { label: "GA", desc: "El Sujeto (Quién hace la acción específicamente)" },
    WO: { label: "WO", desc: "El Objeto Directo (Qué recibe la acción)" },
    NI: { label: "NI", desc: "Destino o Tiempo (A dónde o a qué hora)" },
    DE: { label: "DE", desc: "Lugar de acción o Herramienta (Dónde o con qué)" },
    NO: { label: "NO", desc: "Posesión (De quién es)" },
    TO: { label: "TO", desc: "Compañía (Con quién)" }
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
