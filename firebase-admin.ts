import { initFirestore } from "@auth/firebase-adapter";
import admin from "firebase-admin";

// Initialize Firebase Admin SDK
let app;

try {
  if (!admin.apps.length) {
    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    };

    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  // Initialize Firestore using Firebase Admin SDK
  const adminDb = initFirestore({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });

  // Initialize Admin Authentication
  const adminAuth = admin.auth(app);

  // Export initialized Firestore and Authentication instances
  module.exports = { adminDb, adminAuth }; // Export using CommonJS syntax
} catch (error) {
  console.error("Firebase initialization error:", error);
}