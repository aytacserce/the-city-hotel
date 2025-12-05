import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { auth } from "@/app/lib/auth";
import { db } from "@/app/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export const metadata = {
  title: "Profile",
};

export default async function Page() {
  const session = await auth();

  const userId = session?.user?.email;

  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return <div>User not found.</div>;
  }

  const user = { id: docSnap.id, ...docSnap.data() };

  const nationality = "Turkey";

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing following information helps us personalize your experience.
      </p>

      <UpdateProfileForm user={user}>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={user.nationality ? user.nationality : nationality}
        />
      </UpdateProfileForm>
    </div>
  );
}
