import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type{ Todo } from "../types/todo";
import { getTodos } from "../services/todoService";
import StatsCard from "../components/StatsCard";
import TodoTable from "../components/TodoTable";

function Dashboard() {
  const [todos, setTodos]     = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError]     = useState<string>("");
  const navigate              = useNavigate();
  const[currentPage,setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const[search,setSearch] = useState<string>("");
  const[filter,setFilter] = useState<string>("all");

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

  function handleDelete(id: number) {
    if (!confirm("Are you sure?")) return;

      const updated = todos.filter(t => t.id !== id);
      setTodos(updated);
      localStorage.setItem("todos",JSON.stringify(updated))
    
  }

  const total     = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const pending   = todos.filter(t => !t.completed).length;

  const filterTodos = todos.filter(t =>{
    
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = 
    filter == "all" ?  true:
    filter == "completed" ? t.completed === true:
                            t.completed === false;

      return matchSearch && matchFilter;
  })

  const totalPages = Math.ceil(filterTodos.length/itemsPerPage);

  const paginatedTodos = filterTodos.slice(
    (currentPage-1) * itemsPerPage,
    currentPage*itemsPerPage

  );

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
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          style={{ flex: 1, padding: "8px", border: "1px solid #ccc" }}
        />
        <select
          value={filter}
          onChange={(e) => { setFilter(e.target.value); setCurrentPage(1); }}
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
            todos={paginatedTodos}
            onEdit={(todo) => navigate(`/edit/${todo.id}`)}
            onDelete={handleDelete}
          />
        </div>
      )}
        <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
        <button
          onClick={() => setCurrentPage(p => p - 1)}
          disabled={currentPage === 1}
          style={{ padding: "6px 14px", cursor: "pointer", border: "1px solid #ccc" }}
        >
          Prev
        </button>

        <span style={{ padding: "6px 14px" }}>
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage(p => p + 1)}
          disabled={currentPage === totalPages}
          style={{ padding: "6px 14px", cursor: "pointer", border: "1px solid #ccc" }}
        >
          Next
        </button>
      </div>

    </div>
  );
}

export default Dashboard;