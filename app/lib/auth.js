import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "@/app/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user }) {
      try {
        const userRef = doc(db, "users", user.email);
        const snapshot = await getDoc(userRef);

        if (!snapshot.exists()) {
          await setDoc(userRef, {
            name: user.name,
            email: user.email,
            image: user.image,
            provider: "google",
            createdAt: Date.now(),
          });

          console.log("Created new user in Firestore:", user.email);
        } else {
          console.log("User already exists:", user.email);
        }
        return true;
      } catch {
        return false;
      }
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
