import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import { updateReservationAction } from "@/app/lib/actions";

export default async function page({ params }) {
  const reservationId = params.reservationId;
  const reservationRef = doc(db, "reservations", reservationId);

  const snapshot = await getDoc(reservationRef);

  if (!snapshot.exists()) {
    throw new Error("Reservation not found");
  }

  const { id, numGuests, observations, roomId } = {
    id: snapshot.id,
    ...snapshot.data(),
  };

  const docRef = doc(db, "rooms", roomId);
  const docSnap = await getDoc(docRef);
  const { maxCapacity } = { id: docSnap.id, ...docSnap.data() };

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <form
        action={updateReservationAction}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <input type="hidden" value={id} name="id"></input>
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={numGuests}
            required
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          >
            <option>Select number of guests...</option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option key={x} value={x}>
                {x} guest{x > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            defaultValue={observations}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          ></textarea>
        </div>

        <div className="flex justify-end items-center gap-6">
          <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
            Update reservation
          </button>
        </div>
      </form>
    </div>
  );
}
