import { title } from "framer-motion/client";
import { FileText, FolderKanban, History, LayoutDashboard, MessageSquare, ScanSearch, Settings, ShieldCheck } from "lucide-react";

export const sidebarLinks = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        path:"/dashboard",
        role: ["admin", "user"]
    },
    {
        title: "ATS Analyzer",
        icon: ScanSearch,
        path: "/ats",
        role: ["admin", "user"]
    },
    {
        title: "Resume Builder",
        icon: FileText,
        path: "/resume/start",
        role: ["admin", "user"]
    },
    {
        title: "Resume Manager",
        icon: FolderKanban,
        path: "/resume-manager",
        role: ["admin", "user"]
    },
    {
        title: "Scan History",
        icon: History,
        path: "/ats-manager",
        role: ["admin", "user"]
    },
    {
        title: "Interview Chat",
        icon:  MessageSquare,
        path: "/interview-chat",
        role: ["admin", "user"]
    },
    {
        title: "Admin Panel",
        icon: ShieldCheck,
        path:"/admin",
        role: ["admin"]
    },
    {
        title: "Settings",
        icon: Settings,
        path: "/settings",
        role: ["admin", "user"]
    }
]