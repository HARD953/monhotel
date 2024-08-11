import { getSession } from "next-auth/react";

export const getAuthToken = async () => {
  const session = await getSession();
  return session?.user?.token;
};
