import { useState, useEffect } from "react";

const TaskForm = ({ onSubmit, selectedTask }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "PENDING",
  });

  useEffect(() => {
    if (selectedTask) {
      setForm(selectedTask);
    }
  }, [selectedTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: "", description: "", status: "PENDING" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded mb-4">
      <input
        placeholder="Title"
        className="w-full mb-2 p-2 border"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        placeholder="Description"
        className="w-full mb-2 p-2 border"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <select
        className="w-full mb-2 p-2 border"
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option value="PENDING">PENDING</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="COMPLETED">COMPLETED</option>
      </select>

      <button className="bg-blue-500 text-white px-3 py-1 rounded">
        Save Task
      </button>
    </form>
  );
};

export default TaskForm;
