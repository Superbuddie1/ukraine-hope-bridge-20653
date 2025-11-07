import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary rounded-full p-2 group-hover:scale-110 transition-transform">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Ukraine aid in prosthetics</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <Link to="/about">
              <Button 
                variant={isActive("/about") ? "default" : "ghost"}
                size="sm"
              >
                About
              </Button>
            </Link>
            <Link to="/upap">
              <Button 
                variant={isActive("/upap") ? "default" : "ghost"}
                size="sm"
              >
                UPAP
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
