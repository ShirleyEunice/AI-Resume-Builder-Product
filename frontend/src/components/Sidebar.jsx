import { sidebarLinks } from "@/constants/sidebarLinks";
import Logo, { ForgeMark } from "@/components/Logo";
import { logout } from "@/redux/slices/authSlice";
import { closeMobileSidebar } from "@/redux/slices/uiSlice";
import { LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const { user } = useSelector((state) => state.auth);
  const { sidebarCollapsed } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavClick = () => dispatch(closeMobileSidebar());

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/");
  };

  // Links this user is allowed to see, and the sections they fall into (in order)
  const links = sidebarLinks.filter((link) => link.role.includes(user?.role));
  const sections = [...new Set(links.map((l) => l.section))];

  // A link needs exact matching only when its path is a parent of another link
  // (e.g. /cover-letter vs /cover-letter/history) so both don't highlight at once.
  const needsExactMatch = (path) =>
    links.some((l) => l.path !== path && l.path.startsWith(`${path}/`));

  return (
    <aside
      className={`${sidebarCollapsed ? "w-20" : "w-64"} h-full flex flex-col
        bg-brand-dark transition-all duration-300`}
    >
      {/* BRAND */}
      <div className={`h-16 flex items-center border-b border-white/10 shrink-0 ${sidebarCollapsed ? "justify-center px-2" : "px-5"}`}>
        {sidebarCollapsed ? (
          <ForgeMark size={32} />
        ) : (
          <Logo textClassName="text-white" size={32} />
        )}
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {sections.map((section) => (
          <div key={section}>
            {!sidebarCollapsed && (
              <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                {section}
              </p>
            )}

            <div className="space-y-1">
              {links
                .filter((l) => l.section === section)
                .map((link) => {
                  const Icon = link.icon;
                  return (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      end={needsExactMatch(link.path)}
                      onClick={handleNavClick}
                      title={sidebarCollapsed ? link.title : undefined}
                      className={({ isActive }) =>
                        `flex items-center ${
                          sidebarCollapsed ? "justify-center" : "gap-3"
                        } px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-brand-primary/15 text-brand-primary"
                            : "text-gray-400 hover:bg-white/5 hover:text-gray-100"
                        }`
                      }
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      {!sidebarCollapsed && <span className="truncate">{link.title}</span>}
                    </NavLink>
                  );
                })}
            </div>
          </div>
        ))}
      </nav>

      {/* BOTTOM — user + logout */}
      <div className="border-t border-white/10 p-3 shrink-0">
        {!sidebarCollapsed && user && (
          <div className="flex items-center gap-3 px-2 py-2 mb-1">
            <div className="w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold shrink-0">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
              <p className="text-[11px] text-gray-400 capitalize truncate">{user?.role}</p>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          title={sidebarCollapsed ? "Logout" : undefined}
          className={`w-full flex items-center ${
            sidebarCollapsed ? "justify-center" : "gap-3"
          } px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors`}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!sidebarCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
