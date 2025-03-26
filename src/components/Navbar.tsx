
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Experience", path: "/experience" },
    { name: "Projects", path: "/projects" },
    { name: "Skills", path: "/skills" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-gradient">
          Kahan Jash
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              active={location.pathname === item.path}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col space-y-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={cn(
              "h-0.5 w-6 bg-foreground transition-transform duration-300",
              isMobileMenuOpen && "translate-y-2 rotate-45"
            )}
          ></span>
          <span
            className={cn(
              "h-0.5 w-6 bg-foreground transition-opacity duration-300",
              isMobileMenuOpen && "opacity-0"
            )}
          ></span>
          <span
            className={cn(
              "h-0.5 w-6 bg-foreground transition-transform duration-300",
              isMobileMenuOpen && "-translate-y-2 -rotate-45"
            )}
          ></span>
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed inset-0 top-16 bg-background z-40 md:hidden"
        >
          <div className="flex flex-col space-y-4 p-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "py-2 text-lg transition-colors hover:text-accent",
                  location.pathname === item.path
                    ? "text-accent font-medium"
                    : "text-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
};

const NavLink = ({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) => (
  <Link
    to={to}
    className={cn(
      "relative font-medium transition-colors hover:text-accent",
      active ? "text-accent" : "text-foreground"
    )}
  >
    {children}
    {active && (
      <motion.span
        layoutId="navIndicator"
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
      />
    )}
  </Link>
);

export default Navbar;
