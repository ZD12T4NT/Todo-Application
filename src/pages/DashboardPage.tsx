import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import { logoutUser } from "../utils/auth";
import TaskItem from "../components/Tasks/TaskItem";
import TaskForm from "../components/Tasks/TaskForm";
import { Task } from "../types/Task";  // Assuming Task type is defined

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("tasks"); // Track the active tab
  const [tasks, setTasks] = useState<Task[]>([]); // Manage tasks state
  const navigate = useNavigate();

  // Check authentication on page load
  useEffect(() => {
    const checkAuth = async () => {
      const auth = await isAuthenticated();
      if (!auth) {
        navigate("/login");
      } else {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  // Handle logout
  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  // Add new task to the list
  const handleAddTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);  // Add new task to the tasks list
  };

  // Remove task by id
  const handleRemoveTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));  // Remove task by id
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#0A122A] flex flex-col justify-between text-white min-h-screen p-4 rounded-tr-2xl">
        <ul>
          <li
            onClick={() => setActiveTab("tasks")}
            className={`cursor-pointer transition-all p-2 rounded-md text-white hover:bg-[#FBFAF8] hover:text-[#0A122A] ${activeTab === "tasks" ? "bg-transparent" : ""}`}
          >
            Tasks
          </li>
          <li
            onClick={() => setActiveTab("profile")}
            className={`cursor-pointer transition-all p-2 rounded-md text-white hover:bg-[#FBFAF8] hover:text-[#0A122A] ${activeTab === "profile" ? "bg-transparent" : ""}`}
          >
            Profile
          </li>
        
        </ul>
       <ul>
       <li
            onClick={handleLogout}
            className="cursor-pointer p-2 transition-all rounded-md hover:bg-[#804E49] hover:text-white mt-4"
          >
            Logout
          </li>
       </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Render different content based on the active tab */}
        {activeTab === "tasks" && (
          <div>
            <h1 className="text-3xl mb-6">Your Tasks</h1>

            {/* Task Form to Add New Task */}
            <TaskForm onAddTask={handleAddTask} />

            {/* Task List */}
            <div className="mt-6">
              {tasks.length === 0 ? (
                <p>No tasks added yet.</p>
              ) : (
                tasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onRemove={handleRemoveTask}
                  />
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div>
            <h1 className="text-3xl mb-6">Your Profile</h1>
            <p>Here you can manage your profile settings.</p>
            {/* Add your profile content here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
