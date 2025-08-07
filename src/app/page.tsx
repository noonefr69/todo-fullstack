import { auth } from "@/auth";
import AddTodo from "@/components/AddTodo";
import Authentication from "@/components/Authentication";
import Calender from "@/components/Calender";
import Todos from "@/components/Todos";
import { Ghost, Smile } from "lucide-react";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <div className="grid grid-cols-12 mx-7 gap-7">
        <div className="lg:col-span-3 hidden lg:block">
          <Authentication />
        </div>
        <div className="col-span-12 lg:col-span-6">
          {session?.user ? (
            <>
              <AddTodo />
              <Todos />
            </>
          ) : (
            <div className="flex flex-col px-7 items-center justify-center gap-5 py-14 h-[calc(100ch-10vh)] shadow-sm dark:shadow-amber-50 rounded-lg mb-7 ">
              <Ghost size={100} className="animate-bounce" />
              <h1 className="text-xl text-center">
                Welcome! Please sign in with Google to access your personalized
                experience
              </h1>
              <h1 className="flex flex-col animate-pulse  items-center justify-center text-center">
                You can sign in from your left side or menu bar if you using mobile
                <Smile className="mt-3"/>
              </h1>
            </div>
          )}
        </div>
        <div className="hidden lg:block lg:col-span-3">
          <Calender />
        </div>
      </div>
    </div>
  );
}
