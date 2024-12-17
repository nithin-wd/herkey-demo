"use server";

import { getServerSession } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";
import authOptions from "../lib/options";
import { redirect } from "next/navigation";

export const handleRevalidateTag = async (tag: string) => {
  try {
    await revalidateTag(tag);
  } catch (error) {
    console.log({ error });
  }
};
export const handleRevalidatePath = async (path: string = "/") => {
  try {
    await revalidatePath(path, "layout");
    await revalidatePath(path, "page");
  } catch (error) {
    console.log({ error });
  }
};


const handleResponse = async (res: Response) => {
  if (!res.ok) {
    if (res?.status === 401) {
      console.log("Signing out");
      redirect("/session-expired");
    }

    const error = await res.json();
    throw { ...error, errorCode: res.status };
  }
  return res.json();
};

export const AUTH_GET = async (url: string, nextConfig?: any) => {
  console.log("GET", url);
  try {
    const session: any = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return "No session found";
    }
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
      next: { revalidate: 0, ...nextConfig },
    });
    console.log("SUCCESS", "AUTH_GET", url);
    return handleResponse(res);
  } catch (error: any) {
    console.log("FAILED", "AUTH_GET", url);
    console.log({ error });
    throw error;
  }
};

export const UN_AUTH_POST = async (url: string, payload: any) => {
  console.log("POST", url);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      next: { revalidate: 0 },
    });
    console.log("SUCCESS", "UN_AUTH_POST", url);
    if (!res.ok) {
      const error = await res.json();
      throw { ...error, errorCode: res.status };
    }
    return res.json();

  } catch (error) {
    console.log({ error });
    console.log("FAILED", "UN_AUTH_POST", url);
    throw error;
  }
};
