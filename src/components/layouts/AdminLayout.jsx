import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "../../context/AuthContext";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Mic, 
  Radio, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  Printer
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const AdminLayout = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Users, label: "Members", path: "/admin/members" },
    { icon: Calendar, label: "Attendance", path: "/admin/attendance" },
    { icon: Mic, label: "Sermons", path: "/admin/sermons" },
    { icon: Radio, label: "Radio", path: "/admin/radio" },
    { icon: Printer, label: "Print IDs", path: "/admin/print-ids" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className={cn(
        "bg-gray-900 text-white transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}>
        <div className="p-4 flex justify-between items-center">
          <h2 className={cn("font-bold transition-all", 
            collapsed ? "scale-0" : "scale-100"
          )}>
            Admin Panel
          </h2>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </div>
        <nav className="mt-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800"
            >
              <item.icon className="h-5 w-5" />
              <span className={cn(
                "ml-3 transition-all",
                collapsed ? "hidden" : "block"
              )}>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-4 w-full px-4">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-300 hover:bg-gray-800"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            <span className={cn(
              "ml-3 transition-all",
              collapsed ? "hidden" : "block"
            )}>
              Logout
            </span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;