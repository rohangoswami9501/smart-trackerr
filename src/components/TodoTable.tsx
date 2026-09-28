import type{ Todo } from "../types/todo";

type TodoTableProps = {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
};

function TodoTable({ todos, onEdit, onDelete }: TodoTableProps) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: "#f5f5f5" }}>
          <th style={th}>ID</th>
          <th style={th}>Title</th>
          <th style={th}>User ID</th>
          <th style={th}>Status</th>
          <th style={th}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <tr key={todo.id} style={{ borderBottom: "1px solid #eee" }}>
            <td style={td}>{todo.id}</td>
            <td style={td}>{todo.title}</td>
            <td style={td}>{todo.userId}</td>
            <td style={td}>
              <span style={{ color: todo.completed ? "#15803d" : "#b45309" }}>
                {todo.completed ? "Completed" : "Pending"}
              </span>
            </td>
            <td style={td}>
              <button onClick={() => onEdit(todo)} style={{ color: "#1d4ed8", border: "1px solid #ccc", background: "none", padding: "4px 10px", cursor: "pointer", marginRight: "6px" }}>
                Edit
              </button>
              <button onClick={() => onDelete(todo.id)} style={{ color: "#dc2626", border: "1px solid #ccc", background: "none", padding: "4px 10px", cursor: "pointer" }}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


const th: React.CSSProperties = { padding: "10px", textAlign: "left", fontSize: "0.85rem", color: "#555" };
const td: React.CSSProperties = { padding: "10px", fontSize: "0.9rem" };

export default TodoTable;
