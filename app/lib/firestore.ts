// lib/firestore.ts
import { Firestore } from "@google-cloud/firestore";

const firestore = new Firestore({
  projectId: process.env.FIREBASE_PROJECT_ID,
  credentials: {
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

export default firestore;
