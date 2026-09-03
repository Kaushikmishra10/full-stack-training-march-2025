import { useState } from "react";

const FINISHED_ICON = "./../public/check.webp";
const PENDING_ICON = "https://img.icons8.com/?size=32&id=78597&format=png";
import "bootstrap/dist/css/bootstrap.css";

const Todo = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn HTML CSS and JavaScript", done: false },
    { id: 2, text: "Learn React", done: false },
    { id: 3, text: "Create Projects", done: false },
    { id: 4, text: "Upload on Github", done: false },
    { id: 5, text: "Create Portfolio Website", done: false },
    { id: 6, text: "Create Resume", done: false },
    { id: 7, text: "Apply for Job", done: false },
  ]);

  const [input, setInput] = useState("");

  const addTodo = () => {
    if (!input.trim()) return;

    setTodos([
      ...todos,
      { id: Date.now(), text: input, done: false },
    ]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="">
      <h1 className="">Todo List</h1>

      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter list item name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addTodo}>
          Add Todo Item
        </button>
      </div>

      <ul className="list-group" style={{listStyle: 'none'}}>
        {todos.map((todo) => (
         <li
        key={todo.id}
        className="list-group-item d-flex justify-content-between"
        >
        <div
            className="gap-2"
            style={{ cursor: "pointer" }}
            onClick={() => toggleTodo(todo.id)}
        >
            <img
            src={todo.done ? FINISHED_ICON : PENDING_ICON}
            alt="status"
            width="20"
            />
            <span
            style={{
                textDecoration: todo.done ? "line-through" : "none",
            }}
            >
            {todo.text}
            </span>
        </div>

        <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => removeTodo(todo.id)}
        >
            Remove
        </button>
        </li>

        ))}
      </ul>
    </div>
  );
};

export default Todo;
