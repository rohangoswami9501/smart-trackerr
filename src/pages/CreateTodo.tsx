import { useNavigate } from "react-router-dom";
import type{ Todo } from "../types/todo";
import TodoForm from "../components/TodoForm";

function CreateTodo() {
  const navigate = useNavigate();

 function handleSubmit(todo: Omit<Todo, "id">) {
  try {
    const saved = localStorage.getItem("todos");
    const existing: Todo[] = saved && saved !== "undefined" 
      ? JSON.parse(saved) 
      : [];                  

     const maxId = existing.length > 0 
      ? Math.max(...existing.map(t => t.id)) 
      : 0;

    const newTodo: Todo = {
      ...todo,
      id: maxId + 1, 
    };

    const updated = [...existing, newTodo];
    localStorage.setItem("todos", JSON.stringify(updated));

    navigate("/");
  } catch {
    alert("Failed to create todo.");
  }
}

  return (
    <div style={{ maxWidth: "960px", margin: "24px auto", padding: "0 20px" }}>
      <h2 style={{ marginBottom: "16px" }}>Create New Todo</h2>
      <TodoForm
        editTodo={null}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/")}
      />
    </div>
  );
}

export default CreateTodo;