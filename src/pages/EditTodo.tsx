import { useNavigate, useParams } from "react-router-dom";
import type{ Todo } from "../types/todo";
import TodoForm from "../components/TodoForm";

function EditTodo() {
  const { id }                  = useParams();        
  const navigate                = useNavigate();

  const saved = localStorage.getItem("todos");
  const todos: Todo[] = saved && saved !== "undefined" ? JSON.parse(saved) : [];
  const todo = todos.find(t => t.id === Number(id));

  function handleSubmit(updated: Omit<Todo, "id">) {
    const updatedList = todos.map(t =>
      t.id === Number(id) ? { ...t, ...updated } : t
    );
    localStorage.setItem("todos", JSON.stringify(updatedList));
    navigate("/");
  }

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