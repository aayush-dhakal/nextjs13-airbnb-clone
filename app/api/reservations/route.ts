import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { listingId, startDate, endDate, totalPrice } = body;

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  //   it's kinda confusing, here we are not actually updating the listing model data but creating a new associated Reservation record with the specified listingId
  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          // creating a new Reservation record with the listing id as listingId
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });

  //  this creates the data directly to reservation model. You can use this instead for clarity
  // const newReservation = await prisma.reservation.create({
  //   data: {
  //     userId: currentUser.id,
  //     listingId: listingId,
  //     startDate: startDate,
  //     endDate: endDate,
  //     totalPrice: totalPrice,
  //   },
  // });

  return NextResponse.json(listingAndReservation);
}
