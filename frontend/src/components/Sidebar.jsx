import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 p-5 shadow">
      <h1 className="text-xl font-bold mb-6">AI Resume</h1>

      <nav className="space-y-3">
        <Link to="/" className="block">Dashboard</Link>
        <Link to="/resumes" className="block">My Resumes</Link>
        <Link to="/create" className="block">Create Resume</Link>
        <Link to="/ai-tools" className="block">AI Tools</Link>
        <Link to="/history" className="block">History</Link>
      </nav>
    </div>
  );
}