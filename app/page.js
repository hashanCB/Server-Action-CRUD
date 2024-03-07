import { addTodo, getTodos, DeletedTodo } from "./action";
export default async function Todo() {
  let todos = await getTodos();

  return (
    <div>
      <form action={addTodo}>
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
      <form action={DeletedTodo}>
        <input type="text" name="uid" placeholder="id" />
        <input name="name" type="text" placeholder="name" />
        <input name="email" type="text" placeholder="email" />
        <button type="submit">Deleted todo</button>
      </form>
    </div>
  );
}
