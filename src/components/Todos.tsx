import React from "react";
import { handleGet } from "@/actions/hadleTodoActions";
import Checked from "./Checked";
import { Edit } from "lucide-react";
import Delete from "./Delete";
import DeleteAll from "./DeleteAll";
import Link from "next/link";
import EditDialog from "./Edit";

type Todo = {
  _id: { $oid: string };
  title: string;
  completed: boolean;
};

export default async function Todos() {
  const todos = await handleGet();

  console.log(todos);

  return (
    <div className="flex flex-col justify-between px-3 py-7 shadow-sm h-[calc(100vh-37vh)] overflow-y-auto dark:shadow-amber-50 rounded-lg">
      <ul className="space-y-1 duration-300">
        {todos.map((todo) => {
          return (
            <li
              className="flex items-center justify-between break-all gap-5 duration-300 hover:bg-slate-100 dark:hover:bg-[rgb(36,36,36)] rounded-md px-2 py-1"
              key={todo._id.toString()}
            >
              <div className="flex items-center gap-2">
                <Checked id={todo._id.toString()} checked={todo.completed} />
                <span
                  className={`text-lg font-semibold ${
                    todo.completed
                      ? "line-through text-slate-500 dark:text-slate-400"
                      : "text-slate-800 dark:text-slate-100"
                  }`}
                >
                  {todo.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Delete id={todo._id.toString()} />
                {/* <Link href={`?edit/${todo._id.toString()}`}>
                  <Edit
                    size={20}
                    className="cursor-pointer duration-300 text-slate-500 dark:text-slate-400 dark:hover:text-slate-50 hover:text-slate-800"
                  />
                </Link> */}
                <EditDialog
                  id={todo._id.toString()}
                  initialTitle={todo.title}
                />
              </div>
            </li>
          );
        })}
      </ul>
      <div className="relative dark:bg-[rgb(36,36,36)] bg-slate-100 rounded-md mt-3 flex justify-between px-4 py-2 w-full duration-300">
        <div className="font-semibold">
          {
            todos.filter((todo) => {
              return todo.completed;
            }).length
          }{" "}
          out {todos.length}
        </div>
        {/* <div className="absolute left-1/2 -translate-x-1/2">Showing</div> */}
        <DeleteAll />
      </div>
    </div>
  );
}
