"use client";

import { handlePost } from "@/actions/hadleTodoActions";
import { Loader, Plus } from "lucide-react";
import { useState, useTransition } from "react";

export default function AddTodo() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [input, setInput] = useState("");

  function handleChange(formData: FormData) {
    const title = formData.get("title")?.toString().trim();

    if (!title) {
      setError("Please enter a valid todo");
      return;
    }

    setError("");

    startTransition(() => {
      handlePost(formData)
        .catch((err) => {
          setError(err.message || "Something went wrong");
        })
        .finally(() => {
          setInput("");
        });
    });
  }

  return (
    <div className="py-14 shadow-sm dark:shadow-amber-50 rounded-lg mb-7 ">
      <form action={handleChange} className="flex px-5 space-x-2 items-center">
        <div className="w-full relative">
          <input
            className="w-full outline-none border-b-2 border-r-2 py-3 px-5 text-lg shadow-sm dark:shadow-amber-50 duration-300 focus:border-r-[#00000094] focus:border-b-[#00000094] dark:focus:border-r-amber-50 dark:focus:border-b-amber-50"
            type="text"
            name="title"
            id="title"
            required
            placeholder="Add Todo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isPending}
          />

          <p
            className={`absolute duration-500 -bottom-8 text-red-500 ${
              error ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            }`}
          >
            {error}
          </p>
        </div>
        {isPending ? (
          <Loader className="animate-spin" size={38} />
        ) : (
          <button type="submit" className="cursor-pointer">
            <Plus size={35} />
          </button>
        )}
      </form>
    </div>
  );
}
