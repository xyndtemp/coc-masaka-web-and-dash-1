import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu";

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/coc.png" 
                alt="COC Masaka Logo" 
                className="w-10 h-10 rounded-lg object-contain transition-transform hover:scale-105"
              />
              <span className="text-2xl font-bold">COC Masaka</span>
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className="px-4 py-2 hover:text-primary transition-colors">Home</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/about" className="px-4 py-2 hover:text-primary transition-colors">About</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/sermons" className="px-4 py-2 hover:text-primary transition-colors">Sermons</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/radio" className="px-4 py-2 hover:text-primary transition-colors">Let The Bible Speak</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/contact" className="px-4 py-2 hover:text-primary transition-colors">Contact</Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
      </header>
      <main className="flex-1 bg-background">
        {children}
      </main>
      <footer className="border-t bg-card">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">© {new Date().getFullYear()} Church of Christ Masaka. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;