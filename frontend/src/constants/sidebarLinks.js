import {
  FileClock,
  FileSignature,
  FileText,
  FolderKanban,
  History,
  LayoutDashboard,
  MessageSquare,
  MessagesSquare,
  ScanSearch,
  Settings,
  ShieldCheck,
} from "lucide-react";

export const sidebarLinks = [
  // Main
  { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard", section: "Main", role: ["admin", "user"] },

  // Tools
  { title: "ATS Analyzer", icon: ScanSearch, path: "/ats", section: "Tools", role: ["admin", "user"] },
  { title: "Resume Builder", icon: FileText, path: "/resume/start", section: "Tools", role: ["admin", "user"] },
  { title: "Cover Letter", icon: FileSignature, path: "/cover-letter", section: "Tools", role: ["admin", "user"] },
  { title: "Interview Chat", icon: MessageSquare, path: "/interview-chat", section: "Tools", role: ["admin", "user"] },

  // Library
  { title: "Resume Manager", icon: FolderKanban, path: "/resume-manager", section: "Library", role: ["admin", "user"] },
  { title: "Scan History", icon: History, path: "/ats-manager", section: "Library", role: ["admin", "user"] },
  { title: "Letter History", icon: FileClock, path: "/cover-letter/history", section: "Library", role: ["admin", "user"] },
  { title: "Interview History", icon: MessagesSquare, path: "/interview-history", section: "Library", role: ["admin", "user"] },

  // System
  { title: "Admin Panel", icon: ShieldCheck, path: "/admin", section: "System", role: ["admin"] },
  { title: "Settings", icon: Settings, path: "/settings", section: "System", role: ["admin", "user"] },
];
