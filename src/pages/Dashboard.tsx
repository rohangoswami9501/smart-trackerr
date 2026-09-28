import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type{ Todo } from "../types/todo";
import { getTodos, deleteTodo } from "../services/todoService";
import StatsCard from "../components/StatsCard";
import TodoTable from "../components/TodoTable";

function Dashboard() {
  const [todos, setTodos]     = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch]     = useState<string>("");
  const [filter, setFilter]     = useState<string>("all");
  const [error, setError]     = useState<string>("");
  const navigate              = useNavigate();

  useEffect(() => {
    async function fetchTodos() {
      try {
        const saved = localStorage.getItem("todos");
        if(saved){
            setTodos(JSON.parse(saved));
            setLoading(false);
            return;
        }
        const data = await getTodos();
        console.log("Api data:",data);
        localStorage.setItem("todos",JSON.stringify(data));
        setTodos(data);
      } catch {
        setError("Failed to fetch todos.");
      } finally {
        setLoading(false);
      }
    }
    fetchTodos();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteTodo(id);
      const updated = todos.filter(t => t.id !== id);
      setTodos(updated);
      localStorage.setItem("todos",JSON.stringify(updated))
    } catch {
      setError("Failed to delete todo.");
    }
  }

  const total     = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const pending   = todos.filter(t => !t.completed).length;

  return (
    <div style={{ maxWidth: "960px", margin: "24px auto", padding: "0 20px", display: "flex", flexDirection: "column", gap: "16px" }}>

      <div style={{ display: "flex", gap: "12px" }}>
        <StatsCard label="Total"     count={total} />
        <StatsCard label="Completed" count={completed} />
        <StatsCard label="Pending"   count={pending} />
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ flex: 1, padding: "8px", border: "1px solid #ccc" }}
      />
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ padding: "8px", border: "1px solid #ccc" }}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
   </div>

      <div style={{ textAlign: "right" }}>
        <button
          onClick={() => navigate("/create")}
          style={{ padding: "10px 24px", background: "#2563eb", color: "white", border: "none", cursor: "pointer" }}
        >
          + Add Todo
        </button>
      </div>

      {error && <p style={{ color: "#dc2626" }}>{error}</p>}

      {loading ? (
        <p style={{ textAlign: "center", color: "#888" }}>Loading...</p>
      ) : (
        <div style={{ background: "white", padding: "20px", border: "1px solid #ccc" }}>
          <TodoTable
            todos={todos}
            onEdit={(todo) => navigate(`/edit/${todo.id}`)}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}

export default Dashboard;