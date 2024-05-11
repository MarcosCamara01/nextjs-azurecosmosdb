"use client";

import React, { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Todo, updateTodo } from "@/app/actions";
import { toast } from "sonner";

const CheckTodo = ({ todo }: { todo: Todo }) => {
  const [checked, setChecked] = useState(todo.completed);

  const handleCheckboxChange = async () => {
    setChecked(!checked);
    const response = await updateTodo(todo.id, {
      ...todo,
      completed: !checked,
    });

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("Todo updated successfully.");
    }
  };

  return (
    <Checkbox
      checked={checked}
      onCheckedChange={handleCheckboxChange}
      className="rounded-full h-5 w-5 p-0.5"
    />
  );
};

export default CheckTodo;
