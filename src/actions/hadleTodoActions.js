"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import Todo from "@/models/todo";
import { revalidatePath } from "next/cache";

// type TodoProps = {
//   _id: string,
//   title: string,
//   completed: boolean,
// };

export async function handleGet() {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  await dbConnect();

  const todos = Todo.find({ userEmail: session?.user?.email }).lean();

  return todos;
}

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

export async function handleDelete(id) {
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

export async function handleUpdate(id, newTitle) {
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

export async function toggleCompleted(id, completed) {
  const session = await auth();
  // if (!session?.user?.email) {
  //   throw new Error("Unauthorized");
  // }

  await dbConnect();

  await Todo.findOneAndUpdate(
    { _id: id, userEmail: session?.user?.email },
    { completed }
  );

  revalidatePath("/"); // Optional, to refresh data
}
