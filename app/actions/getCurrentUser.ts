import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null; // if we throw error then the flow of our application will also get halted so we do not throw any error so that even the non logged in user can use the application
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    // we could just return currentUser if we don't encounter any warnings in server console(I didn't see any errors in this version of next.js)
    // return currentUser;

    // returning an object and dates as string to resolve the warnings
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    // as this is not an api call which requires database and we are directly communicating to server so we have skipped error message here
    return null;
  }
}
