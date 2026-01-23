import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label={todo.completed ? `Mark ${todo.text} as incomplete` : `Mark ${todo.text} as complete`}
        />
        <span className="todo-text">{todo.text}</span>
      </label>

      <button className="btn small danger" onClick={() => onDelete(todo.id)} aria-label={`Delete ${todo.text}`}>
        ✕
      </button>
    </li>
  );
}

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const inputRef = useRef(null);
  const STORAGE_KEY = "spa2_todos_v1";

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setTodos(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const value = text.trim();
    if (!value) return;
    const newTodo = { id: Date.now().toString(36) + Math.random().toString(36).slice(2,6), text: value, completed: false };
    setTodos((s) => [newTodo, ...s]);
    setText("");
    inputRef.current?.focus();
  };

  const handleKey = (e) => {
    if (e.key === "Enter") addTodo();
  };

  const toggleTodo = (id) => {
    setTodos((s) => s.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTodo = (id) => {
    setTodos((s) => s.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTodos((s) => s.filter((t) => !t.completed));
  };

  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <div className="todo-app">
      <header className="todo-header">
        <h1 className="todo-title">My To‑Do List</h1>
        
      </header>

      <section className="todo-card" aria-labelledby="todo-heading">
        <h2 id="todo-heading" className="sr-only">To do</h2>

        <div className="input-row">
          <input
            ref={inputRef}
            className="todo-input"
            placeholder="Add new task and press Enter"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKey}
            aria-label="Add new todo"
          />
          <button className="btn primary" onClick={addTodo} aria-label="Add todo">
            Add
          </button>
        </div>

        <div className="list-wrap" role="list">
          {todos.length === 0 ? (
            <div className="empty">No tasks yet — add one above.</div>
          ) : (
            <ul className="todo-list">
              {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
              ))}
            </ul>
          )}
        </div>

        <footer className="todo-footer">
          <div className="left">{remaining} remaining</div>
          <div className="right">
            <button className="btn small" onClick={() => setTodos([])}>Reset All</button>
            <button className="btn small" onClick={clearCompleted} disabled={!todos.some(t => t.completed)}>Clear Completed</button>
          </div>
        </footer>
      </section>
    </div>
  );
}