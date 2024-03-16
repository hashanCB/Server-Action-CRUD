"use server";
import { revalidatePath, revalidateTag } from "next/cache";

import { z } from "zod";

const schema = z.object({
  emaile: z.string().email({ message: "Invalid email address" }),
});

export async function createsUser(prevState, formData) {
  let message = "";

  const validatedFields = schema.safeParse({
    emaile: formData.get("email"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      message: "Please enter a valid email",
    };
  }

  return {
    message,
  };
}

export async function getTodos() {
  let todos = await fetch("http://localhost:3002/users/", {
    next: { tags: ["todo-items"], revalidate: 3600 },
  });

  return todos.json();
}
export async function addTodo(formData) {
  "use server";

  const name = formData.get("name");
  const email = formData.get("email");

  await fetch(`http://localhost:3002/users`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ name, email }),
  });

  revalidateTag("todo-items");

  // revalidatePath("/todo");
}

export async function DeletedTodo(formData) {
  "use server";
  const id = formData.get("remove");

  await fetch(`http://localhost:3002/users/${id}`, {
    headers: { "Content-Type": "application/json" },
    method: "DELETE",
  });

  revalidateTag("todo-items");

  // revalidatePath("/todo");
}

export async function update(formData) {
  "use server";
  const id = formData.get("udi");
  const name = formData.get("name");
  const email = formData.get("email");
  console.log(id, name, email);
  await fetch(`http://localhost:3002/users/${id}`, {
    headers: { "Content-Type": "application/json" },
    method: "PUT",
    body: JSON.stringify({ name, email }),
  });

  revalidateTag("todo-items");

  // revalidatePath("/todo");
}
