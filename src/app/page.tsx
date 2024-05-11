import { Todo, TodoError, getTodos } from "./actions";
import CreateTodo from "@/components/create-todo";
import ListTodos from "@/components/list-todos";

export default async function Home() {
  const allTodos: Todo[] | TodoError | undefined = await getTodos();

  return (
    <main className="max-w-[600px] px-5 py-10 m-auto flex flex-col gap-5">
      <CreateTodo />

      {allTodos && "error" in allTodos ? (
        <div>{allTodos.error}</div>
      ) : !allTodos || allTodos.length === 0 ? (
        <div>No todos found.</div>
      ) : (
        <ListTodos todos={allTodos} />
      )}
    </main>
  );
}
