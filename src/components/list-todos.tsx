import React from "react";
import CheckTodo from "./check-todo";
import { Todo } from "@/app/actions";
import DeleteTodo from "./delete-todo";

const ListTodos = ({ todos }: { todos: Todo[] }) =>
  todos.map((todo: any) => (
    <div
      key={todo.id}
      className="flex gap-3 items-center justify-between px-4 py-2 bg-slate-100 rounded"
    >
      <div className="flex gap-3 items-center">
        <CheckTodo todo={todo} />
        <p>{todo.title}</p>
      </div>

      <DeleteTodo todo={todo} />
    </div>
  ));

export default ListTodos;
