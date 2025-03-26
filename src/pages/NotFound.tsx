
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ParticleField } from "@/components/ThreeScene";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "404 | Not Found";
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <ParticleField />
      
      <main className="flex-1 flex items-center justify-center">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto text-center glass-card p-10"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-4 text-gradient">404</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Oops! It seems like you've ventured into uncharted territory.
            </p>
            <Link to="/" className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block">
              Return to Home
            </Link>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
