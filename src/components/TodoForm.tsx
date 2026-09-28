import { useFormik } from "formik";
import * as Yup from "yup";
import type { Todo } from "../types/todo";

type TodoFormProps = {
  onSubmit: (todo: Omit<Todo, "id">) => void;
  editTodo: Todo | null;
  onCancel: () => void;
};

const todoValidationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(3, "Title must be at least 3 characters.")
    .required("Title is required."),
  userId: Yup.number()
    .typeError("Valid User ID is required.")
    .positive("Valid User ID is required.")
    .required("Valid User ID is required."),
  completed: Yup.boolean(),
});

function TodoForm({ onSubmit, editTodo, onCancel }: TodoFormProps) {
  const formik = useFormik({
    initialValues: {
      title: editTodo?.title ?? "",
      userId: editTodo?.userId ?? 1,
      completed: editTodo?.completed ?? false,
    },
    enableReinitialize: true,
    validationSchema: todoValidationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <div style={{ background: "white", padding: "20px", border: "1px solid #ccc" }}>
      <h2 style={{ marginBottom: "16px", fontSize: "0.95rem" }}>
        {editTodo ? "Edit Todo" : "Add New Todo"}
      </h2>

      <form onSubmit={formik.handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginBottom: "16px" }}>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "0.9rem", color: "#555" }}>Title</label>
            <input
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter todo title"
              style={{ padding: "8px", border: "1px solid #ccc" }}
            />
            {formik.touched.title && formik.errors.title && (
              <p style={{ color: "#dc2626", fontSize: "0.8rem" }}>{formik.errors.title}</p>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "0.8rem", color: "#555" }}>User ID</label>
            <input
              type="number"
              name="userId"
              value={formik.values.userId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ padding: "8px", border: "1px solid #ccc" }}
            />
            {formik.touched.userId && formik.errors.userId && (
              <p style={{ color: "#dc2626", fontSize: "0.8rem" }}>{formik.errors.userId}</p>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "0.8rem", color: "#555" }}>Status</label>
            <select
              name="completed"
              value={formik.values.completed ? "true" : "false"}
              onChange={(e) => formik.setFieldValue("completed", e.target.value === "true")}
              onBlur={formik.handleBlur}
              style={{ padding: "8px", border: "1px solid #ccc" }}
            >
              <option value="false">Pending</option>
              <option value="true">Completed</option>
            </select>
          </div>

        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit" style={{ padding: "10px 24px", background: "#2563eb", color: "white", border: "none", cursor: "pointer" }}>
            {editTodo ? "Save Changes" : "Add Todo"}
          </button>
          {editTodo && (
            <button type="button" onClick={onCancel} style={{ padding: "10px 24px", background: "none", border: "1px solid #ccc", cursor: "pointer", color: "#dc2626" }}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TodoForm;