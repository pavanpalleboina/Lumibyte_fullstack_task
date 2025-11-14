import { useState } from "react";

function Sidebar({ sessions, onSessionClick, onNewChat, currentSessionId, darkMode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`${collapsed ? "w-16" : "w-64"} bg-gray-200 dark:bg-gray-800 transition-width duration-300 flex flex-col`}>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-2 border-b border-gray-400 dark:border-gray-600"
      >
        {collapsed ? "→" : "←"}
      </button>

      {!collapsed && (
        <>
          <div className="p-4 border-b border-gray-400 dark:border-gray-600">
            <button onClick={onNewChat} className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
              + New Chat
            </button>
          </div>
          <div className="flex-grow overflow-auto">
            <h2 className="p-3 font-semibold border-b border-gray-400 dark:border-gray-600">Sessions</h2>
            <ul>
              {sessions.map(({ sessionId, title }) => (
                <li
                  key={sessionId}
                  onClick={() => onSessionClick(sessionId)}
                  className={`cursor-pointer px-4 py-2 hover:bg-blue-400 hover:text-white ${
                    sessionId === currentSessionId ? "bg-blue-600 text-white" : ""
                  }`}
                >
                  {title}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-3 border-t border-gray-400 dark:border-gray-600">
            <div>User: Guest</div>
          </div>
        </>
      )}
    </div>
  );
}

export default Sidebar;
