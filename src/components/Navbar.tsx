import React from "react";
import { Toggle } from "./Toggle";
import Link from "next/link";

export default function Navbar() {
  return (
    <div>
      <nav className="flex items-center justify-between p-4 dark:shadow-cyan-300 mx-7 rounded-sm shadow-sm my-7">
        <Link className="text-2xl font-bold" href={`/`}>ToDo</Link>
        <Toggle />
      </nav>
    </div>
  );
}
