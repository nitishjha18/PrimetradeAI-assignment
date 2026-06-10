import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import useAuth from '../context/AuthContext';
import { createTask, deleteTask, getTasks, updateTask } from '../services/tasks';

const initialFormState = {
  title: '',
  description: '',
  status: 'PENDING',
};

const statusClasses = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  IN_PROGRESS: 'bg-blue-100 text-blue-800',
  COMPLETED: 'bg-green-100 text-green-800',
};

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const loadTasks = async () => {
    setError('');
    setIsLoading(true);

    try {
      const response = await getTasks();
      setTasks(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const resetForm = () => {
    setFormData(initialFormState);
    setEditingTaskId(null);
    setIsFormOpen(false);
  };

  const handleNewTask = () => {
    setSuccess('');
    setError('');
    setFormData(initialFormState);
    setEditingTaskId(null);
    setIsFormOpen(true);
  };

  const handleEdit = (task) => {
    setSuccess('');
    setError('');
    setFormData({
      title: task.title || '',
      description: task.description || '',
      status: task.status || 'PENDING',
    });
    setEditingTaskId(task.id);
    setIsFormOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccess('');
    setError('');
    setIsSubmitting(true);

    try {
      if (editingTaskId) {
        await updateTask(editingTaskId, formData);
        setSuccess('Task updated successfully');
      } else {
        await createTask(formData.title, formData.description, formData.status);
        setSuccess('Task created successfully');
      }

      resetForm();
      await loadTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save task');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    setSuccess('');
    setError('');

    try {
      await deleteTask(id);
      setConfirmDeleteId(null);
      setSuccess('Task deleted successfully');
      await loadTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-600">Manage your tasks.</p>
          </div>
          <button
            type="button"
            onClick={handleNewTask}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            New Task
          </button>
        </div>

        {success && (
          <div className="mt-6 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}
        {error && (
          <div className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {isFormOpen && (
          <form
            onSubmit={handleSubmit}
            className="mt-6 rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200"
          >
            <h2 className="text-lg font-semibold text-gray-900">
              {editingTaskId ? 'Edit Task' : 'New Task'}
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="title">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(event) => setFormData({ ...formData, title: event.target.value })}
                  required
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="description">
                  Description
                </label>
                <input
                  id="description"
                  type="text"
                  value={formData.description}
                  onChange={(event) =>
                    setFormData({ ...formData, description: event.target.value })
                  }
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="status">
                  Status
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(event) => setFormData({ ...formData, status: event.target.value })}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Saving...' : editingTaskId ? 'Update Task' : 'Create Task'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="mt-6">
          {isLoading ? (
            <p className="text-sm text-gray-600">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <div className="rounded-xl bg-white p-6 text-center text-sm text-gray-600 shadow-sm ring-1 ring-gray-200">
              No tasks found.
            </div>
          ) : (
            <div className="grid gap-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-lg font-semibold text-gray-900">{task.title}</h2>
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${
                            statusClasses[task.status] || statusClasses.PENDING
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>
                      {task.description && (
                        <p className="mt-2 text-sm text-gray-600">{task.description}</p>
                      )}
                      {user?.role === 'ADMIN' && task.user?.email && (
                        <p className="mt-2 text-xs text-gray-500">Owner: {task.user.email}</p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(task)}
                        className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(task.id)}
                        className="rounded-md border border-red-300 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {confirmDeleteId === task.id && (
                    <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-4">
                      <p className="text-sm text-red-800">
                        Are you sure you want to delete this task?
                      </p>
                      <div className="mt-3 flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleDelete(task.id)}
                          className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
                        >
                          Yes, Delete
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(null)}
                          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
