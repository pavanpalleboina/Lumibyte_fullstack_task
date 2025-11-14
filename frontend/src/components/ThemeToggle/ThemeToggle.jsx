
function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-1 rounded"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? "Light Theme" : "Dark Theme"}
    </button>
  );
}

export default ThemeToggle;
