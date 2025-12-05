"use server";

import { auth, signIn, signOut } from "./auth";
import { db } from "@/app/lib/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfileAction(formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in.");

  const nationalID = formData.get("nationalID");

  const [nationality, countryFlag] = formData.get("nationality")?.split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Invalid National ID.");

  const updateData = { nationality, nationalID, countryFlag };

  const userRef = doc(db, "users", session.user.email);

  await updateDoc(userRef, updateData);

  revalidatePath("/account/profile");

  return { success: true };
}

export async function createReservation(reservationData, formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in.");

  const newReservation = {
    ...reservationData,
    startDate: reservationData.startDate.toISOString(),
    endDate: reservationData.endDate.toISOString(),
    createdAt: new Date().toISOString(),
    userId: session.user.email,
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations").slice(0, 1000),
  };

  await addDoc(collection(db, "reservations"), newReservation);

  revalidatePath(`/rooms/${reservationData.roomId}`);

  redirect("/account/reservations");
}

export async function updateReservationAction(formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in.");

  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations"),
    observations: formData.get("observations").slice(0, 1000),
  };

  const resRef = doc(db, "reservations", formData.get("id"));

  await updateDoc(resRef, updateData);

  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${formData.get("id")}`);

  redirect("/account/reservations");
}

export async function deleteReservationAction(formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in.");

  const reservationId = formData.get("reservationId");
  console.log(reservationId);
  if (!reservationId) throw new Error("Reservation ID is required.");

  const reservationRef = doc(db, "reservations", reservationId);

  await deleteDoc(reservationRef);

  revalidatePath("/account/reservations");

  return { success: true };
}
