"user client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteReservationAction } from "../lib/actions";

export default function DeleteReservation({ reservationId }) {
  return (
    <form
      action={deleteReservationAction}
      className="group flex items-center gap-2 flex-grow uppercase text-xs font-bold text-primary-300 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      <input type="hidden" name="reservationId" value={reservationId} />
      <button className="flex items-center gap-2 uppercase text-xs font-bold flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900">
        <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
        <span className="mt-1">Delete</span>
      </button>
    </form>
  );
}
