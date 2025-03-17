import { useState, useEffect } from "react";
import { supabase } from "../../supaBaseClient";
import { Moon, Sun } from "lucide-react";

const Settings = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [autoArchive, setAutoArchive] = useState(false);
  const [taskReminders, setTaskReminders] = useState(false);
  
  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from('settings').select('*').single();
      if (data) {
        setUsername(data.username);
        setEmail(data.email);
        setDarkMode(data.darkMode);
        setAutoArchive(data.autoArchive);
        setTaskReminders(data.taskReminders);
      }
    };
    fetchSettings();
  }, []);

  const handleUpdateSettings = async () => {
    const { error } = await supabase.from('settings').update({
      username, email, darkMode, autoArchive, taskReminders
    }).match({ id: 1 });
    if (error) console.error("Error updating settings:", error);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };
  
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      
      <label>Username</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="block w-full p-2 border rounded" />
      
      <label>Email</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full p-2 border rounded" />
      
      <label>New Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full p-2 border rounded" />
      
      <label className="flex items-center mt-4">
        <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} className="mr-2" />
        Dark Mode {darkMode ? <Moon className="ml-2" size={16} /> : <Sun className="ml-2" size={16} />}
      </label>
      
      <label className="flex items-center mt-4">
        <input type="checkbox" checked={autoArchive} onChange={() => setAutoArchive(!autoArchive)} className="mr-2" />
        Auto-Archive Completed Tasks
      </label>
      
      <label className="flex items-center mt-4">
        <input type="checkbox" checked={taskReminders} onChange={() => setTaskReminders(!taskReminders)} className="mr-2" />
        Enable Task Reminders
      </label>
      
      
      <button onClick={handleUpdateSettings} className="mt-4 p-2 bg-blue-600 text-white rounded">Save Changes</button>
    </div>
  );
};

export default Settings;
