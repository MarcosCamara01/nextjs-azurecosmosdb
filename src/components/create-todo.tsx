"use client";

import React, { useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createTodo } from "@/app/actions";
import { toast } from "sonner";

const CreateTodo = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;

    const response = await createTodo(title);

    if (response && "error" in response) {
      console.error(response.error);
      toast.error(response.error);
    } else {
      toast.success("Todo created successfully.");
      formRef.current?.reset();
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex gap-3">
      <Input id="title" name="title" placeholder="New todo..." className="" />

      <Button type="submit" className="">
        Create
      </Button>
    </form>
  );
};

export default CreateTodo;
