// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import firestore from "@/app/lib/firestore";

// Configuração do NextAuth
const authOptions = {
  adapter: FirestoreAdapter(firestore),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // Outros callbacks e configurações
};

// NextAuth aceita um único argumento, que é a configuração
export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };