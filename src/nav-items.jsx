import { HomeIcon, Users, Calendar, Radio, Mic, Printer } from "lucide-react";
import AdminDashboard from "./pages/admin/Dashboard";
import Members from "./pages/admin/Members";
import Attendance from "./pages/admin/Attendance";
import Sermons from "./pages/admin/Sermons";
import RadioRecordings from "./pages/admin/RadioRecordings";
import PrintIDs from "./pages/admin/PrintIDs";

export const adminNavItems = [
  {
    title: "Dashboard",
    to: "/admin",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <AdminDashboard />,
  },
  {
    title: "Members",
    to: "/admin/members",
    icon: <Users className="h-4 w-4" />,
    page: <Members />,
  },
  {
    title: "Attendance",
    to: "/admin/attendance",
    icon: <Calendar className="h-4 w-4" />,
    page: <Attendance />,
  },
  {
    title: "Sermons",
    to: "/admin/sermons",
    icon: <Mic className="h-4 w-4" />,
    page: <Sermons />,
  },
  {
    title: "Radio",
    to: "/admin/radio",
    icon: <Radio className="h-4 w-4" />,
    page: <RadioRecordings />,
  },
  {
    title: "Print IDs",
    to: "/admin/print-ids",
    icon: <Printer className="h-4 w-4" />,
    page: <PrintIDs />,
  },
];