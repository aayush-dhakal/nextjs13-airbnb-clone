import { Listing, Reservation, User } from "@prisma/client";

// // use this type if you are just returning currentUser from getCurrentUser
// export type SafeUser = User;

// Omiting(deleting) "createdAt" , "updatedAt" and "emailVerified" types from User type and replacing their type as string
export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  // this syntax is for replacing "createdAt" , "updatedAt" and "emailVerified" types as string by default in User type they are of date type
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};
