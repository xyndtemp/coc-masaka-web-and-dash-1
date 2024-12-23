import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "../../context/AuthContext";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu";

const AdminLayout = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-gray-100">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <Link to="/admin" className="text-2xl font-bold">Admin Dashboard</Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/admin/members" className="px-4 py-2">Members</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/admin/attendance" className="px-4 py-2">Attendance</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/admin/sermons" className="px-4 py-2">Sermons</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/admin/radio" className="px-4 py-2">Radio</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button onClick={handleLogout} variant="outline">Logout</Button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;