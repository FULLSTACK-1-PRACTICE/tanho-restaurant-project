import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBPVcY_AmfSuqMshHTnBRtiU2THYXwxKYk",
  authDomain: "tanho-e1c97.firebaseapp.com",
  projectId: "tanho-e1c97",
  storageBucket: "tanho-e1c97.firebasestorage.app",
  messagingSenderId: "693485829802",
  appId: "1:693485829802:web:47baea632308401aba1ad3",
  measurementId: "G-2DZK9VDEQG",
};

export const app = initializeApp(firebaseConfig);

// Ba'zi mahalliy internet-provayderlar/tarmoqlar Firestore'ning odatiy
// streaming (WebChannel) ulanishini bloklaydi yoki uzib-ulaydi, natijada
// addDoc/updateDoc kabi so'rovlar hech qachon yakunlanmay "osilib qoladi".
// Shu sababli long polling'ni yoqamiz — bu muammoni hal qiladi.
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
});

isSupported().then((ok) => {
  if (ok) getAnalytics(app);
});