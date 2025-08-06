"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import Todo from "@/models/todo";
import { TodoType } from "@/types/todo";
import { revalidatePath } from "next/cache";

export async function handleGet() {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  await dbConnect();

  const todos = await Todo.find({ userEmail: session?.user?.email }).lean<TodoType[]>();

  return todos;
}

export async function handlePost(formData: FormData) {
  const title = formData.get("title");

  if (typeof title !== "string" || title.trim() === "") {
    throw new Error("No title provided");
  }

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

export async function handleDelete(id: string) {
  const session = await auth();

  await dbConnect();

  await Todo.findOneAndDelete({ _id: id, userEmail: session?.user?.email });

  revalidatePath("/");
}

export async function handleDeleteAll() {
  const session = await auth();

  await dbConnect();

  await Todo.deleteMany({ userEmail: session?.user?.email });

  revalidatePath("/");
}

export async function handleUpdate(id: string, newTitle: string) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  if (!id || !newTitle.trim()) {
    throw new Error("Invalid input");
  }

  await dbConnect();

  const updated = await Todo.findOneAndUpdate(
    { _id: id, userEmail: session.user.email }, // filter
    { title: newTitle }, // update
    { new: true } // return the updated document
  );

  if (!updated) {
    throw new Error("Todo not found or unauthorized");
  }

  revalidatePath("/");
}

export async function toggleCompleted(id: string, completed: boolean) {
  const session = await auth();
  // if (!session?.user?.email) {
  //   throw new Error("Unauthorized");
  // }

  await dbConnect();

  await Todo.findOneAndUpdate(
    { _id: id, userEmail: session?.user?.email },
    { completed }
  );

  revalidatePath("/");
}
