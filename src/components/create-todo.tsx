"use client";

import React, { useRef, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createTodo } from "@/app/actions";
import { toast } from "sonner";
import { Loader } from "./loader";

const CreateTodo = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;

    startTransition(async () => {
      const response = await createTodo(title);

      if (response && "error" in response) {
        console.error(response.error);
        toast.error(response.error);
      } else {
        toast.success("Todo created successfully.");
        formRef.current?.reset();
      }
    });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex gap-3">
      <Input id="title" name="title" placeholder="New todo..." className="" />

      <Button type="submit" className="w-20" disabled={isPending}>
        {isPending ? <Loader width={20} height={20} /> : "Create"}
      </Button>
    </form>
  );
};

export default CreateTodo;
