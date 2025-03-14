import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, logoutUser } from "../utils/auth";
import React from "react";
import TaskItem from "../components/Tasks/TaskItem";
import TaskForm from "../components/Tasks/TaskForm";
import { Task } from "../types/Task";
import { Home, User, LogOut, Upload, Settings, Archive, Calendar, PanelLeftClose, ChevronDown, Search } from "lucide-react"; // Added icons

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to control sidebar visibility
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // Profile dropdown state
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

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile((prev) => ({ ...prev, profilePic: event.target?.result as string }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen); // Toggle profile dropdown visibility
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-[7%]"
        } bg-[#001514] text-white p-4 flex flex-col justify-between shadow-lg rounded-tr-2xl transition-all duration-300 ease-in-out`}
      >
        <div className={`${isSidebarOpen ? "flex" : "hidden"} flex-col items-center mb-4`}>
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
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${activeTab === "tasks" ? "bg-[#FBFAF8] text-[#0A122A]" : "hover:bg-[#FBFAF8] hover:text-[#0A122A]"}`}
          >
            <Home size={20} />
            {isSidebarOpen && <span>Tasks</span>}
          </button>

          <button
            onClick={() => setActiveTab("storage")}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${activeTab === "storage" ? "bg-[#FBFAF8] text-[#0A122A]" : "hover:bg-[#FBFAF8] hover:text-[#0A122A]"}`}
          >
            <Archive size={20} />
            {isSidebarOpen && <span>Task Storage</span>}
          </button>

          <button
            onClick={() => setActiveTab("calendar")}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${activeTab === "calendar" ? "bg-[#FBFAF8] text-[#0A122A]" : "hover:bg-[#FBFAF8] hover:text-[#0A122A]"}`}
          >
            <Calendar size={20} />
            {isSidebarOpen && <span>Calendar</span>}
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${activeTab === "settings" ? "bg-[#FBFAF8] text-[#0A122A]" : "hover:bg-[#FBFAF8] hover:text-[#0A122A]"}`}
          >
            <Settings size={20} />
            {isSidebarOpen && <span>Settings</span>}
          </button>
        </nav>

        {/* Logout */}
        <button onClick={handleLogout} className="flex items-center gap-3 w-full p-3 rounded-lg transition mt-auto bg-[#A3320B] hover:bg-white text-white hover:text-[#001514]">
          <LogOut size={20} />
          {isSidebarOpen && <span>Logout</span>}
        </button>
      </div>

      {/* Close Sidebar Button */}
      <div className="relative top-4 left-[2%] transform -translate-x-1/2 z-10">
        <button onClick={toggleSidebar} className="inline-flex items-center justify-center text-[#001514] bg-transparent p-2">
          <PanelLeftClose size={24} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Top Navigation */}
        <div className="flex justify-end mb-4">
          <div className="w-1/2 mb-4 mr-[5rem] relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 pl-10 pr-4 text-black rounded-lg focus:outline-none bg-gray-100" // Add left padding to make space for the icon
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          </div>
          <div className="relative">
            <button onClick={toggleProfileDropdown} className="flex items-center gap-2 text-black">
              <img
                src={profile.profilePic || "https://images.pexels.com/photos/27797840/pexels-photo-27797840/free-photo-of-the-columns-of-an-ancient-temple-in-athens.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <ChevronDown size={16} />
            </button>
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg w-48">
                <button className="w-full text-left p-2 hover:bg-gray-200" onClick={() => setActiveTab("profile")}>Profile Settings</button>
                <button className="w-full text-left p-2 hover:bg-gray-200" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>

        {activeTab === "tasks" && (
          <>
            <TaskForm onAddTask={handleAddTask} />
            <div className="mt-4">
              {tasks.map((task) => (
                <TaskItem key={task.id} task={task} onRemove={handleRemoveTask} />
              ))}
            </div>
          </>
        )}
        {activeTab === "profile" && (
          <div>
            <input type="text" name="name" value={profile.name} onChange={handleProfileChange} placeholder="Enter your name" className="p-2 border rounded" />
          </div>
        )}
      </div>

      {/* Right-side icons when sidebar is closed */}
      <div className={`fixed top-1/2 right-4 flex flex-col gap-4 ${isSidebarOpen ? "hidden" : "block"}`}>
        <button onClick={() => setActiveTab("tasks")}>
          <Home size={24} className="text-white" />
        </button>
        <button onClick={() => setActiveTab("profile")}>
          <User size={24} className="text-white" />
        </button>
        <button onClick={() => setActiveTab("storage")}>
          <Archive size={24} className="text-white" />
        </button>
        <button onClick={() => setActiveTab("calendar")}>
          <Calendar size={24} className="text-white" />
        </button>
        <button onClick={() => setActiveTab("settings")}>
          <Settings size={24} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
