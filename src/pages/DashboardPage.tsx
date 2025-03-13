import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, logoutUser } from "../utils/auth";
import TaskItem from "../components/Tasks/TaskItem";
import TaskForm from "../components/Tasks/TaskForm";
import { Task } from "../types/Task";
import { Home, User, LogOut, Upload } from "lucide-react"; // Import icons

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("tasks");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [profile, setProfile] = useState({
    name: "John Doe",
    address: "123 Main St, City",
    password: "",
    profilePic: "",
  });

  const navigate = useNavigate();

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

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  const handleAddTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const handleRemoveTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Handle profile updates
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle profile picture upload
  const handleProfilePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile((prev) => ({ ...prev, profilePic: event.target?.result as string }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-[#0A122A] text-white p-4 flex flex-col justify-between shadow-lg rounded-tr-2xl">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-4">
          <label htmlFor="profilePic" className="cursor-pointer relative">
            <img
              src={profile.profilePic || "https://images.pexels.com/photos/27797840/pexels-photo-27797840/free-photo-of-the-columns-of-an-ancient-temple-in-athens.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-white"
            />
            <Upload className="absolute bottom-0 right-0 bg-gray-700 p-1 rounded-full" size={16} />
          </label>
          <input type="file" id="profilePic" className="hidden" onChange={handleProfilePicUpload} />
          <p className="mt-2 text-lg font-semibold">{profile.name}</p>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab("tasks")}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${
              activeTab === "tasks" ? "bg-[#FBFAF8] text-[#0A122A]" : "hover:bg-[#FBFAF8] hover:text-[#0A122A]"
            }`}
          >
            <Home size={20} />
            Tasks
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${
              activeTab === "profile" ? "bg-[#FBFAF8] text-[#0A122A]" : "hover:bg-[#FBFAF8] hover:text-[#0A122A]"
            }`}
          >
            <User size={20} />
            Profile
          </button>
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-3 rounded-lg transition mt-auto bg-[#804E49] hover:bg-[#a05e5a] text-white"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {activeTab === "tasks" && (
          <div>
            <h1 className="text-3xl font-semibold mb-6">Your Tasks</h1>
            <TaskForm onAddTask={handleAddTask} />
            <div className="mt-6 space-y-4">
              {tasks.length === 0 ? <p>No tasks added yet.</p> : tasks.map((task) => <TaskItem key={task.id} task={task} onRemove={handleRemoveTask} />)}
            </div>
          </div>
        )}

        {/* Profile Section */}
        {activeTab === "profile" && (
          <div>
            <h1 className="text-3xl font-semibold mb-6">Your Profile</h1>

            {/* Profile Form */}
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
              <div className="mb-4">
                <label className="block font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleProfileChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              {/* Change Password */}
              <div className="mb-4">
                <label className="block font-semibold mb-1">New Password</label>
                <input
                  type="password"
                  name="password"
                  value={profile.password}
                  onChange={handleProfileChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter new password"
                />
              </div>

              <button className="w-full bg-blue-600 text-white py-2 rounded-lg mt-2 hover:bg-blue-700 transition">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
