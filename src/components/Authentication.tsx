import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import React from "react";

export default async function Authentication() {
  const session = await auth();
  return (
    <form
      className="rounded-md p-6 shadow-sm dark:shadow-amber-50"
      action={async () => {
        "use server";
        if (session) {
          await signOut();
        } else {
          await signIn("google");
        }
      }}
    >
      {session ? (
        <div className="flex flex-col justify-center items-center my-5">
          <Image
            className="rounded-full mb-7 duration-300 shadow-sm hover:shadow-xl"
            src={session?.user?.image ?? "/globe.svg"}
            alt={session?.user?.name ?? "Avatar.png"}
            width={70}
            height={70}
          />
          <p className="text-lg mb-1">
            Hello <span className="font-bold">{session?.user?.name}</span>
          </p>
          <p className="text-lg mb-7 text-center">Welcome to Todo App</p>
          <button
            className="shadow-sm py-2 dark:shadow-amber-50 duration-300 hover:ring-1 px-7 rounded-md cursor-pointer"
            type="submit"
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center my-5">
          <Image
            className="rounded-full mb-7 duration-300 shadow-sm hover:shadow-xl"
            src={"/globe.svg"}
            alt={"Avatar.png"}
            width={70}
            height={70}
          />
          <p className="text-lg mb-1">
            Wellcome To <span className="font-bold">ToDo</span>
          </p>
          <p className="text-lg mb-7">Lets Sign In To Continue</p>
          <button
            className="shadow-sm py-2 dark:shadow-amber-50 duration-300 hover:ring-1 px-7 rounded-md cursor-pointer"
            type="submit"
          >
            Sign In
          </button>
        </div>
      )}
    </form>
  );
}
