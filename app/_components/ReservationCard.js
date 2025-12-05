import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, isPast } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DeleteReservation from "./DeleteReservation";

export default function ReservationCard({ reservation }) {
  const { id, roomId, startDate, endDate, numGuests, createdAt, room } =
    reservation;

  const numNights = Math.round(
    (new Date(reservation.endDate) - new Date(reservation.startDate)) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <div className="flex border border-l-primary-800">
      <div className="relative h-32 aspect-square">
        <Image
          src={room.image}
          alt={`Room ${room.name}`}
          fill
          className="object-cover border-r border-l-primary-800"
        />
      </div>
      <div className="flex-grow px-6 py-3 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {numNights} nights in Room {room.name}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              upcoming
            </span>
          )}
        </div>

        <p className="text-lg text-primary-300">
          {format(new Date(startDate), "EEE, dd MM yyyy")} -{" "}
          {format(new Date(endDate), "EEE, dd MM yyyy")}
        </p>

        <div className="flex gap-5 mt-auto items-baseline">
          <p className="text-lg text-primary-300">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="ml-auto text-sm text-primary-400">
            Booked {format(new Date(createdAt), "EEE, dd MM yyyy, p")}
          </p>
        </div>
      </div>

      <div className="flex flex-col border-l border-primary-800 w-[100px]">
        {!isPast(startDate) ? (
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
            >
              <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span className="mt-1">Edit</span>
            </Link>
            <DeleteReservation reservationId={id} />
          </>
        ) : null}
      </div>
    </div>
  );
}
