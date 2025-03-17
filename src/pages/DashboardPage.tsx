import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, logoutUser } from "../utils/auth";
import React from "react";
import TaskItem from "../components/Tasks/TaskItem";
import TaskForm from "../components/Tasks/TaskForm";
import { Task } from "../types/Task";
import { Home, User, LogOut, Upload, Settings, Archive, Calendar, PanelLeftClose, ChevronDown, Search } from "lucide-react"; // Added icons
import { supabase } from "../supaBaseClient"; // Assuming you have this already set up
import SettingsPage from "../components/UI/Settings"

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("tasks");
  const [tasks, setTasks] = useState<Task[]>([]); // State to store tasks
  const [profile, setProfile] = useState({
    name: "John Doe",
    address: "123 Main St, City",
    password: "",
    profilePic: "",
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Set default state to closed
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // Profile dropdown state
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string>(""); // State to store the success message

  // Detect screen width to set sidebar state for smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 992) {
        setIsSidebarOpen(false); // Sidebar should be closed on smaller screens
      } else {
        setIsSidebarOpen(true); // Sidebar should be open on larger screens
      }
    };
  
    handleResize(); // Set initial state based on the current window size
    window.addEventListener("resize", handleResize); // Add event listener for window resize
  
    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Fetch tasks from Supabase
  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase.from('tasks').select('*');
      if (error) {
        console.error('Error fetching tasks:', error);
      } else {
        console.log('Fetched tasks:', data); // Log fetched tasks
        setTasks(data); // Set the tasks from Supabase to the state
      }
    };

    fetchTasks(); // Fetch tasks when the component mounts
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  const handleAddTask = async (task: Task) => {
    console.log('Adding task:', task); // Log task data to confirm it's correct
    setTasks((prevTasks) => [...prevTasks, task]);
  
    // Insert task into Supabase storage
    try {
      const { data, error } = await supabase.from('tasks').insert([task]).select().single();
      if (error) throw error;
  
      // Here we assume that Supabase returns the full task with an `id` (or the task is updated with an id)
      if (data) {
        setTasks((prevTasks) => prevTasks.map((t) => (t.id === task.id ? { ...t, ...data } : t)));
      }
  
      setSuccessMessage("Task has been added successfully!");
      console.log("Task added to Supabase:", data);
    } catch (error) {
      console.error("Error adding task:", error);
      setSuccessMessage("Failed to add task.");
    }
  
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
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
    if (window.innerWidth > 992) {
      setIsSidebarOpen(!isSidebarOpen); // Only allow toggle if the screen width is larger than 992px
    }
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
          isSidebarOpen ? "md:w-64" : "w-[5rem]"
        } bg-[#001514] text-white p-4 flex flex-col justify-between shadow-lg rounded-tr-2xl transition-all duration-300 ease-in-out`}
      >
        <div className={`${isSidebarOpen ? "flex" : "hidden"} flex-col items-center mb-4`}>
          <label htmlFor="profilePic" className="cursor-pointer relative hidden md:flex">
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
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${isSidebarOpen ? "justify-start" : "justify-center"} ${activeTab === "tasks" ? "bg-[#FBFAF8] text-[#0A122A]" : "hover:bg-[#FBFAF8] hover:text-[#0A122A]"}`}
          >
            <Home size={20} />
            {isSidebarOpen && <span>Tasks</span>}
          </button>

          <button
            onClick={() => setActiveTab("storage")}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${isSidebarOpen ? "justify-start" : "justify-center"} ${activeTab === "storage" ? "bg-[#FBFAF8] text-[#0A122A]" : "hover:bg-[#FBFAF8] hover:text-[#0A122A]"}`}
          >
            <Archive size={20} />
            {isSidebarOpen && <span>Task Storage</span>}
          </button>

          <button
            onClick={() => setActiveTab("calendar")}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${isSidebarOpen ? "justify-start" : "justify-center"} ${activeTab === "calendar" ? "bg-[#FBFAF8] text-[#0A122A]" : "hover:bg-[#FBFAF8] hover:text-[#0A122A]"}`}
          >
            <Calendar size={20} />
            {isSidebarOpen && <span>Calendar</span>}
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${isSidebarOpen ? "justify-start" : "justify-center"} ${activeTab === "settings" ? "bg-[#FBFAF8] text-[#0A122A]" : "hover:bg-[#FBFAF8] hover:text-[#0A122A]"}`}
          >

            <Settings size={20}/>
            {isSidebarOpen && <span>Settings</span>}
          </button>

        </nav>

        {/* Logout */}
        <button onClick={handleLogout} className={`${isSidebarOpen ? "justify-start" : "justify-center"} flex items-center gap-3 w-full p-3 rounded-lg transition mt-auto bg-[#A3320B] hover:bg-white text-white hover:text-[#001514]`}>
          <LogOut size={20} />
          {isSidebarOpen && <span>Logout</span>}
        </button>
      </div>

      {/* Close Sidebar Button */}
      <div className="relative top-4 left-[1rem] transform -translate-x-1/2 z-10">
        <button onClick={toggleSidebar} className="inline-flex items-center justify-center text-[#001514] bg-transparent p-2">
          <PanelLeftClose size={24} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 pl-0 md:pl-3 p-6">
        {/* Top Navigation */}
        <div className="flex justify-between md:justify-end mb-4">
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
            {successMessage && (
              <div className="mt-4 text-green-500">{successMessage}</div> // Show success message
            )}
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

      {activeTab === "settings" && <SettingsPage  />}

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
