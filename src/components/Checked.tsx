"use client";

import React, { useState, useTransition } from "react";
import { Checkbox } from "./ui/checkbox";
import { toggleCompleted } from "@/actions/hadleTodoActions"; // adjust path as needed

type Props = {
  id: string;
  checked: boolean;
};

export default function Checked({ id, checked }: Props) {
  const [isChecked, setIsChecked] = useState(checked);
  const [isPending, startTransition] = useTransition();

  const handleChange = (checked: boolean) => {
    const nextState = checked === true;
    setIsChecked(nextState);

    startTransition(() => {
      toggleCompleted(id, nextState);
    });
  };

  return (
    <div>
      <Checkbox
        checked={isChecked}
        onCheckedChange={handleChange}
        disabled={isPending}
        className="cursor-pointer scale-110"
      />
    </div>
  );
}
