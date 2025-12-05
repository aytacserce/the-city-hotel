import { auth } from "@/app/lib/auth";
import {
  collection,
  query,
  where,
  doc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import ReservationCard from "@/app/_components/ReservationCard";

export const metadata = {
  title: "Reservations",
};

export default async function Page() {
  const session = await auth();

  const q = query(
    collection(db, "reservations"),
    where("userId", "==", session.user.email)
  );

  const querySnapshot = await getDocs(q);

  const reservations = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const reservationsWithRooms = await Promise.all(
    reservations.map(async (res) => {
      const roomRef = doc(db, "rooms", res.roomId);
      const roomSnap = await getDoc(roomRef);
      const room = roomSnap.exists()
        ? { id: roomSnap.id, ...roomSnap.data() }
        : null;

      return {
        ...res,
        room,
      };
    })
  );

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {reservationsWithRooms.length === 0 ? (
        <p className="text-lg">You have no reservations yet.</p>
      ) : (
        <ul className="space-y-6">
          {reservationsWithRooms.map((reservation) => (
            <ReservationCard key={reservation.id} reservation={reservation} />
          ))}
        </ul>
      )}
    </div>
  );
}
