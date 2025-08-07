import React from "react";
import { Toggle } from "./Toggle";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Authentication from "./Authentication";

export default function Navbar() {
  return (
    <div>
      <nav className="flex items-center justify-between p-4 dark:shadow-amber-50 mx-7 rounded-sm shadow-sm my-7">
        <Link className="text-2xl font-bold" href={`/`}>
          ToDo
        </Link>
        <div className="flex items-center gap-4">
          <Toggle />
          <Sheet>
            <SheetTrigger>
              {" "}
              <Menu className="lg:hidden cursor-pointer" size={30} />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Profile</SheetTitle>
                <div className="h-[calc(100vh-8vh)] flex items-center justify-center">
                  <Authentication />
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
}
