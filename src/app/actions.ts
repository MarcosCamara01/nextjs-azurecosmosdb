"use server";

import cosmosSingleton from "@/lib/cosmos";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  _rid: string;
  _self: string;
  _etag: string;
  _attachments: string;
  _ts: number;
}

export interface TodoError {
  error: string;
  status: number;
}

export const getTodos = async () => {
  try {
    await cosmosSingleton.initialize();
    const container = cosmosSingleton.getContainer();
    if (container) {
      const { resources: todos } = await container.items
        .query("SELECT * from Todos")
        .fetchAll();
      return todos as Todo[];
    }
  } catch (error) {
    console.log(`Failed to fetch todos: ${error}`);
    return { error: "Failed to fetch todos.", status: 500 } as TodoError;
  }
};

export const createTodo = async (title: string) => {
  try {
    if (!title) {
      return { error: "Title is required.", status: 400 };
    }
    await cosmosSingleton.initialize();
    const container = cosmosSingleton.getContainer();

    const newTodo = { id: uuidv4(), title, completed: false };
    if (container) {
      const { resource: createdTodo } = await container.items.create(newTodo);
      revalidatePath("/");

      return createdTodo;
    }
  } catch (error) {
    console.log(`Failed to create todo: ${error}`);
    return { error: "Failed to create todo.", status: 500 };
  }
};

export const updateTodo = async (id: string, updatedTodo: any) => {
  try {
    await cosmosSingleton.initialize();
    const container = cosmosSingleton.getContainer();

    if (container) {
      const { resource: existingTodo } = await container.item(id, id).read();

      if (!existingTodo) {
        return { error: "Todo not found.", status: 404 };
      }

      await container.item(id, id).replace(updatedTodo);

      return updatedTodo;
    }
  } catch (error) {
    console.log(`Failed to update todo: ${error}`);
    return { error: "Failed to update todo.", status: 500 };
  }
};

export const deleteTodo = async (id: string) => {
  try {
    await cosmosSingleton.initialize();
    const container = cosmosSingleton.getContainer();
    if (container) {
      const { resource: existingTodo } = await container.item(id, id).read();

      if (!existingTodo) {
        return { error: "Todo not found.", status: 404 };
      }

      await container.item(id, id).delete();
      revalidatePath("/");
      return { message: "Todo deleted." };
    }
  } catch (error) {
    console.log(`Failed to delete todo: ${error}`);
    return { error: "Failed to delete todo.", status: 500 };
  }
};
