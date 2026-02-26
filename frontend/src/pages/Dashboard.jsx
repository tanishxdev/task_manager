import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const fetchTasks = async () => {
    const res = await api.get("/tasks", {
      params: { page, status, search },
    });
    setTasks(res.data.tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, [page, status, search]);

  const handleSubmit = async (data) => {
    if (selectedTask) {
      await api.put(`/tasks/${selectedTask._id}`, data);
      setSelectedTask(null);
    } else {
      await api.post("/tasks", data);
    }
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6 max-w-3xl mx-auto">
        <TaskForm onSubmit={handleSubmit} selectedTask={selectedTask} />

        <div className="flex gap-2 mb-4">
          <input
            placeholder="Search"
            className="p-2 border flex-1"
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="p-2 border"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="PENDING">PENDING</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>

        <TaskList
          tasks={tasks}
          onDelete={handleDelete}
          onEdit={setSelectedTask}
        />

        <div className="flex justify-between mt-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="bg-gray-400 px-3 py-1 rounded"
          >
            Prev
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="bg-gray-400 px-3 py-1 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
