import React from "react";
import { handleGet } from "@/actions/hadleTodoActions";
import Checked from "./Checked";
import { Edit } from "lucide-react";
import Delete from "./Delete";

type Todo = {
  _id: string;
  title: string;
  completed: boolean;
};

export default async function Todos() {
  const todos = await handleGet();

  console.log(todos);

  return (
    <div className="px-3 py-7 shadow-sm min-h-[calc(100vh-37vh)] dark:shadow-amber-50 rounded-lg">
      <ul className="space-y-1">
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
                <Edit
                  size={20}
                  className="cursor-pointer duration-300 text-slate-500 dark:text-slate-400 dark:hover:text-slate-50 hover:text-slate-800"
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
