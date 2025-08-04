"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import Todo from "@/models/todo";
import { revalidatePath } from "next/cache";

export async function handlePost(formData) {
  const title = formData.get("title");

  if (!title || title.trim() === "") throw new Error("No title provided");

  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  await dbConnect();

  await Todo.create({
    title,
    userEmail: session.user.email,
  });

  revalidatePath("/");
}
