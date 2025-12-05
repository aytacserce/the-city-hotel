"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import { createReservation } from "../lib/actions";

export default function ReservationForm({ room, user }) {
  const { range, resetRange } = useReservation();
  const { id, maxCapacity, regularPrice, discount } = room;
  const startDate = range.from;
  const endDate = range.to;
  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const reservationData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    roomId: id,
  };

  const createReservationWithData = createReservation.bind(
    null,
    reservationData
  );

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in</p>
        <div className="flex items-center gap-4">
          <img
            src={user.image}
            alt={user.name}
            className="h-8 rounded-full"
            referrerPolicy="no-referrer"
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        // action={createReservationWithData}
        action={async (formData) => {
          await createReservationWithData(formData);
          resetRange();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label>How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
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
            id="observations"
            placeholder="Any pets, allergies, special requirements, etc."
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
              Reserve now
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
