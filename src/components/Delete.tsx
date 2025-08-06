"use client";

import React, { useTransition } from "react";
import { handleDelete } from "@/actions/hadleTodoActions";
import { Loader, Trash } from "lucide-react";

type Props = {
  id: string;
};

export default function Delete({ id }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleChange() {
    const confirmed = confirm(`Are you sure?`);
    if (confirmed) {
      startTransition(() => {
        handleDelete(id);
      });
    }
  }

  return (
    <div onClick={handleChange}>
      {isPending ? (
        <Loader className="animate-spin" size={20} />
      ) : (
        <Trash
          size={20}
          className="cursor-pointer text-red-400  duration-300 hover:text-red-500"
        />
      )}
    </div>
  );
}
