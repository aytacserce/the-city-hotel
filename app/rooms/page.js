export const metadata = {
  title: "Rooms",
};

import { db } from "@/app/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import RoomCard from "../_components/RoomCard";
import Filter from "../_components/Filter";

export default async function Page({ searchParams }) {
  const filter = searchParams?.capacity ?? "all";

  const snapshot = await getDocs(collection(db, "rooms"));
  const rooms = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  let displayedRooms;
  if (filter === "all") displayedRooms = rooms;
  if (filter === "small")
    displayedRooms = rooms.filter((room) => room.maxCapacity <= 2);
  if (filter === "large")
    displayedRooms = rooms.filter((room) => room.maxCapacity > 2);

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Rooms
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Our luxury rooms redefine urban comfort with elegant design, modern
        sophistication, and thoughtful details. Each room offers a serene escape
        from the city’s energy — featuring plush bedding, refined furnishings,
        and panoramic city views. Whether you’re here for business or leisure,
        you’ll find every amenity designed to elevate your stay: smart
        connectivity, rainfall showers, premium linens, and a warm ambiance that
        makes relaxation effortless. At The City Hotel, every room is more than
        a place to rest — it’s your private retreat in the heart of the city.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      {displayedRooms.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
          {displayedRooms.map((room) => (
            <RoomCard room={room} key={room.id} />
          ))}
        </div>
      )}
    </div>
  );
}
