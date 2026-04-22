export default function Header() {
  return (
    <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 shadow">
      <h2 className="text-lg font-semibold">Dashboard</h2>

      <button
        onClick={() =>
          document.documentElement.classList.toggle("dark")
        }
        className="border px-3 py-1 rounded"
      >
        Toggle Theme
      </button>
    </div>
  );
}