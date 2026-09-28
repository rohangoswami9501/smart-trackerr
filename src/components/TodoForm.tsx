import { useState, useEffect } from "react";
import type{ Todo } from "../types/todo";

type TodoFormProps = {
  onSubmit: (todo: Omit<Todo, "id">) => void;
  editTodo: Todo | null;
  onCancel: () => void;
};

function TodoForm({ onSubmit, editTodo, onCancel }: TodoFormProps) {
  const [title, setTitle]       = useState("");
  const [userId, setUserId]     = useState(1);
  const [completed, setCompleted] = useState(false);
  const [error, setError]       = useState("");

  useEffect(() => {
    if (editTodo) {
      setTitle(editTodo.title);
      setUserId(editTodo.userId);
      setCompleted(editTodo.completed);
    } else {
      setTitle("");
      setUserId(1);
      setCompleted(false);
    }
  }, [editTodo]);

  function handleSubmit() {
    if (!title.trim())        { setError("Title is required."); return; }
    if (title.trim().length < 3) { setError("Title must be at least 3 characters."); return; }
    if (!userId || userId <= 0)  { setError("Valid User ID is required."); return; }

    setError("");
    onSubmit({ title, userId, completed });
  }

  return (
    <div style={{ background: "white", padding: "20px", border: "1px solid #ccc" }}>
      <h2 style={{ marginBottom: "16px", fontSize: "0.95rem" }}>
        {editTodo ? "Edit Todo" : "Add New Todo"}
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginBottom: "16px" }}>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "0.9rem", color: "#555" }}>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter todo title"
            style={{ padding: "8px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "0.8rem", color: "#555" }}>User ID</label>
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
            style={{ padding: "8px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "0.8rem", color: "#555" }}>Status</label>
          <select
            value={completed ? "true" : "false"}
            onChange={(e) => setCompleted(e.target.value === "true")}
            style={{ padding: "8px", border: "1px solid #ccc" }}
          >
            <option value="false">Pending</option>
            <option value="true">Completed</option>
          </select>
        </div>

      </div>

      {error && <p style={{ color: "#dc2626", fontSize: "0.8rem", marginBottom: "10px" }}>{error}</p>}

      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={handleSubmit} style={{ padding: "10px 24px", background: "#2563eb", color: "white", border: "none", cursor: "pointer" }}>
          {editTodo ? "Save Changes" : "Add Todo"}
        </button>
        {editTodo && (
          <button onClick={onCancel} style={{ padding: "10px 24px", background: "none", border: "1px solid #ccc", cursor: "pointer", color: "#dc2626" }}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default TodoForm;