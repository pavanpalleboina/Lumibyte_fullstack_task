import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import ChatArea from "./components/ChatArea/ChatArea";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";

function App() {
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Fetch session list
  const fetchSessions = async () => {
    const res = await fetch("http://localhost:5000/api/sessions");
    const data = await res.json();
    setSessions(data);
  };

  // Fetch chat history for a session
  const fetchHistory = async (sessionId) => {
    const res = await fetch(`http://localhost:5000/api/session/${sessionId}`);
    if (res.ok) {
      const data = await res.json();
      setChatHistory(data);
      setCurrentSessionId(sessionId);
      window.history.replaceState(null, "", `/?session=${sessionId}`);
    }
  };

  // Start new chat session
  const startNewChat = async () => {
    const res = await fetch("http://localhost:5000/api/start", {
      method: "POST",
    });
    const data = await res.json();
    await fetchSessions();
    await fetchHistory(data.sessionId);
  };

  // On load: get sessions and url session param
  useEffect(() => {
    fetchSessions();
    const params = new URLSearchParams(window.location.search);
    const urlSession = params.get("session");
    if (urlSession) {
      fetchHistory(urlSession);
    }
  }, []);

  return (
    <div className={`${darkMode ? "dark" : ""} flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
      <Sidebar
        sessions={sessions}
        onSessionClick={fetchHistory}
        onNewChat={startNewChat}
        currentSessionId={currentSessionId}
        darkMode={darkMode}
      />
      <div className="flex flex-col flex-grow">
        <header className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
          <h1 className="text-xl font-bold">ChatGPT Clone</h1>
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </header>
        <ChatArea
          sessionId={currentSessionId}
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
        />
      </div>
    </div>
  );
}

export default App;
