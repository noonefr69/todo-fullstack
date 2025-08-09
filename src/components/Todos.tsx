import React from "react";
import { handleGet } from "@/actions/hadleTodoActions";
import Checked from "./Checked";
import Delete from "./Delete";
import DeleteAll from "./DeleteAll";
import EditDialog from "./Edit";
import { TodoType } from "@/types/todo";

export default async function Todos() {
  const todos: TodoType[] = await handleGet();

  console.log(todos);

  return (
    <div className="flex mb-10 md:mb-0 flex-col justify-between px-3 py-7 shadow-sm h-[calc(100vh-37vh)] overflow-y-auto dark:shadow-amber-50 rounded-lg">
      <ul className="space-y-1 duration-300">
        {todos.length > 0 ? (
          todos.map((todo) => {
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
                  <EditDialog
                    id={todo._id.toString()}
                    initialTitle={todo.title}
                  />
                </div>
              </li>
            );
          })
        ) : (
          <div className="animate-pulse h-[calc(100vh-55vh)]  md:h-[calc(100vh-50vh)] flex items-center justify-center">
            <h1 className="font-bold text-xl">The Todo Is Empty!</h1>
          </div>
        )}
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
