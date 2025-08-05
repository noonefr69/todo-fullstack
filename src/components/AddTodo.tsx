import { handlePost } from "@/actions/hadleTodoActions";
import { auth } from "@/auth";
import { Plus } from "lucide-react";
import React from "react";

export default async function AddTodo() {
  const session = await auth();

  return session?.user ? (
    <div className="py-14 shadow-sm dark:shadow-amber-50 rounded-lg mb-7 ">
      <form action={handlePost} className="flex px-5 gap-5 items-center">
        <input
          className="w-full outline-none border-b-2 border-r-2 py-3 px-5 text-lg shadow-sm dark:shadow-amber-50 duration-300 focus:border-r-[#00000094] focus:border-b-[#00000094] dark:focus:border-r-amber-50 dark:focus:border-b-amber-50"
          type="text"
          name="title"
          id="title"
          required
          placeholder="Add Todo"
        />
        <button type="submit" className="cursor-pointer">
          <Plus size={35} />
        </button>
      </form>
    </div>
  ) : (
    ""
  );
}
