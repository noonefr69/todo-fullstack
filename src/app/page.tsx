import AddTodo from "@/components/AddTodo";
import Authentication from "@/components/Authentication";
import Todos from "@/components/Todos";

export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-12 mx-7 gap-7">
        <div className="col-span-3">
          <Authentication />
        </div>
        <div className="col-span-6">
          <AddTodo />
          <Todos />
        </div>
        <div className="col-span-3">s</div>
      </div>
    </div>
  );
}
