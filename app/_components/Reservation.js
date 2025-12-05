import React from "react";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { auth } from "../lib/auth";
import LoginMessage from "./LoginMessage";

export default async function Reservation({ room }) {
  const session = await auth();
  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector room={room} />
      {session?.user ? (
        <ReservationForm room={room} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}
