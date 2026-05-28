import { sidebarLinks } from "@/constants/sidebarLinks";
import { logout } from "@/redux/slices/authSlice";
import { LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const {user} = useSelector((state)=> state.auth);
  const {sidebarCollapsed} = useSelector((state)=> state.ui);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/");
  }
  return (
    <aside className={`

  ${
    sidebarCollapsed
    ? "w-20"
    : "w-56"
  }

  bg-brand-dark
  border-r
  flex
  flex-col
  justify-between
  transition-all
  duration-300
  h-full
`}>
      {/*Top */}
      <div>
        {/*Logo */}
        

        {/*Naviagtion */}
        <nav className="p-4 space-y-2">
          {
            sidebarLinks.filter((link)=> link.role.includes(user?.role)).map((link, i)=>{
              const Icon = link.icon;
              return (
                <NavLink

  key={i}

  to={link.path}

  className={({isActive})=>

    `
    flex
    items-center

    ${
      sidebarCollapsed
      ? "justify-center"
      : "gap-3"
    }

    px-4
    py-3
    rounded-2xl
    transition
    font-medium

    ${
      isActive
      ? "bg-brand-primary/20 text-brand-primary"
      : "text-gray-300 hover:bg-white/10"
    }
    `
  }
>

  <Icon className="
    w-5
    h-5
    shrink-0
  " />

  {
    !sidebarCollapsed && (
      <span className="text-sm">
        {link.title}
      </span>
    )
  }

</NavLink>
              );
            })
          }
        </nav>
      </div>

      {/* BOTTOM SECTION */}
<div className="
  p-4
  border-t
  space-y-3
">

  {/* LOGOUT */}
<button

  onClick={handleLogout}

  className={`
    w-full
    flex
    items-center

    ${
      sidebarCollapsed
      ? "justify-center"
      : "gap-3"
    }

    px-4
    py-3
    rounded-2xl
    transition
    font-medium
    text-red-600
    hover:bg-red-50
  `}
>

  <LogOut className="
    w-5
    h-5
    shrink-0
  " />

  {
    !sidebarCollapsed && (
      <span>
        Logout
      </span>
    )
  }

</button>

</div>
    </aside>
  );
}