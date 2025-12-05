"use client";
import { differenceInDays, isPast, isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

export default function DateSelector({ room }) {
  const { range, setRange, resetRange } = useReservation();

  const [bookedRanges, setBookedRanges] = useState([]);

  useEffect(() => {
    async function loadReservedDays() {
      const q = query(
        collection(db, "reservations"),
        where("roomId", "==", room.id)
      );
      const snap = await getDocs(q);

      const ranges = snap.docs.map((doc) => {
        const data = doc.data();
        return {
          from: new Date(data.startDate),
          to: new Date(data.endDate),
        };
      });
      setBookedRanges(ranges);
    }
    loadReservedDays();
  }, [room.id]);

  const displayRange = isAlreadyBooked(range, bookedRanges) ? {} : range;

  const { regularPrice, discount } = room;

  const numNights = differenceInDays(displayRange.to, displayRange.from);

  const cabinPrice = numNights * (regularPrice - discount);

  const minBookingLength = 2;
  const maxBookingLength = 14;
  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-6 px-5 place-self-center flex"
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        onSelect={setRange}
        selected={displayRange}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedRanges.some((range) =>
            isWithinInterval(curDate, { start: range.from, end: range.to })
          )
        }
        style={{
          "--rdp-day-height": "28px",
          "--rdp-day_button-height": "36px",
          "--rdp-day_button-width": "36px",
        }}
        classNames={{
          months: "flex gap-5",
          nav: "w-[0] hidden",
        }}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="text-2xl"> /night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>
                <span className="text-2xl font-semibold">{cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}
