import { handlers } from "@/app/lib/auth";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import firestore from "../../../lib/firestore";

export const authOptions = {
  adapter: FirestoreAdapter(firestore),
  // providers, callbacks, etc
};
 
 export const { GET, POST } = handlers;