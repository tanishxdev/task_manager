const TaskItem = ({ task, onDelete, onEdit }) => {
  return (
    <div className="border p-4 rounded mb-3 bg-white">
      <h3 className="font-bold">{task.title}</h3>
      <p>{task.description}</p>
      <p className="text-sm text-gray-600">{task.status}</p>

      <div className="mt-2 space-x-2">
        <button
          onClick={() => onEdit(task)}
          className="bg-yellow-500 px-2 py-1 text-white rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="bg-red-500 px-2 py-1 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
