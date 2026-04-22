import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">

      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r p-5">
        <h2 className="text-xl font-bold mb-6">AI Resume</h2>

        <nav className="space-y-2">
          <Link to="/" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
            Dashboard
          </Link>

          <Link to="/create" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
            Create Resume
          </Link>
        </nav>
      </div>

      {/* Main */}
      <div className="flex-1 p-6">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <Outlet />
      </div>
    </div>
  );
}