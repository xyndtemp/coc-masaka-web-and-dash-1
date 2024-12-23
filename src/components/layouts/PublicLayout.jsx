import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu";

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">COC Masaka</Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className="px-4 py-2">Home</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/about" className="px-4 py-2">About</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/sermons" className="px-4 py-2">Sermons</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/radio" className="px-4 py-2">Let The Bible Speak</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/contact" className="px-4 py-2">Contact</Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center">© {new Date().getFullYear()} Church of Christ Masaka. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;