"use client";

import { handleDeleteAll } from "@/actions/hadleTodoActions";
import { Loader } from "lucide-react";
import React, { useTransition } from "react";

export default function DeleteAll() {
  const [isPending, startTransition] = useTransition();

  function handleChange() {
    startTransition(() => {
      handleDeleteAll();
    });
  }

  return (
    <form action={handleChange}>
      {isPending ? (
        <Loader className="animate-spin" />
      ) : (
        <button
          className="font-semibold cursor-pointer hover:underline"
          type="submit"
        >
          Clear All
        </button>
      )}
    </form>
  );
}
