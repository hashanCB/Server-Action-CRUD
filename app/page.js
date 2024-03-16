"use client";
import { useEffect, useState } from "react";
import { addTodo, getTodos, DeletedTodo, update, createsUser } from "./action";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
};

export default function Todo() {
  const [todos, settodos] = useState([]);
  const [state, formAction] = useFormState(createsUser, initialState);

  const grtdata = async () => {
    const todos = await getTodos();
    settodos(todos);
  };

  useEffect(() => {
    grtdata();
  }, []);

  const adduser = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    addTodo(formData);
    grtdata();
  };

  return (
    <div>
      <form onSubmit={adduser}>
        <div>
          <h3>Add new todo</h3>
          <label>Name</label>
          <br />
          <input name="name" type="text" placeholder="name" />
          <input name="email" type="text" placeholder="email" />
        </div>
        <div>
          <button type="submit">Add todo</button>
        </div>
      </form>
      <div>
        <br />
        <h3>Todo items</h3>
        <ul>
          {todos.map((t) => (
            <li key={t.id}>
              {t.name} , {t.email}
            </li>
          ))}
        </ul>
      </div>

      <h3>Deleted</h3>
      <form action={DeletedTodo}>
        <input type="text" name="remove" />
        <button type="submit">Deleted todo</button>
      </form>
      <br />
      <h3>update</h3>
      <form action={update}>
        <input type="text" name="udi" placeholder="id" />
        <input name="name" type="text" placeholder="name" />
        <input name="email" type="text" placeholder="email" />
        <button type="submit">Deleted todo</button>
      </form>

      <p>validetion</p>
      <form action={formAction}>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" required />
        {/* ... */}
        <p>{state?.message}</p>
        <button>Sign up</button>
      </form>
    </div>
  );
}
