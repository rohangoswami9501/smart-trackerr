import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type{ Todo } from "../types/todo";
import { getTodos, updateTodo } from "../services/todoService";
import TodoForm from "../components/TodoForm";

function EditTodo() {
  const { id }                  = useParams();        
  const navigate                = useNavigate();
  const [todo, setTodo]         = useState<Todo | null>(null);
  const [loading, setLoading]   = useState<boolean>(true);

  useEffect(() => {
    async function fetchTodo() {
      try {
         const saved = localStorage.getItem("todos");
         if (saved && saved !== "undefined") {
         const existing: Todo[] = JSON.parse(saved);
         const found = existing.find(t => t.id === Number(id));
         if (found) {
          setTodo(found);
          setLoading(false);
          return; 
        }
      }
        const data = await getTodos();
        const found = data.find(t => t.id === Number(id));
        setTodo(found || null);
      } catch {
        alert("Failed to fetch todo.");
      } finally {
        setLoading(false);
      }
    }
    fetchTodo();
  }, [id]);

async function handleSubmit(updated: Omit<Todo, "id">) {
  try {
    await updateTodo(Number(id), updated);

    const saved = localStorage.getItem("todos");
    const existing: Todo[] = saved && saved !== "undefined"
      ? JSON.parse(saved)
      : [];


    const updatedList = existing.map(t =>
      t.id === Number(id) ? { ...t, ...updated } : t
    );

    localStorage.setItem("todos", JSON.stringify(updatedList));
    navigate("/");
  } catch {
    alert("Failed to update todo.");
  }
}

  if (loading) return <p style={{ textAlign: "center", marginTop: "40px" }}>Loading...</p>;
  if (!todo)   return <p style={{ textAlign: "center", marginTop: "40px", color: "#dc2626" }}>Todo not found.</p>;

  return (
    <div style={{ maxWidth: "960px", margin: "24px auto", padding: "0 20px" }}>
      <h2 style={{ marginBottom: "16px" }}>Edit Todo</h2>
      <TodoForm
        editTodo={todo}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/")}
      />
    </div>
  );
}

export default EditTodo;