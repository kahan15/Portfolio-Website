
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Create a fallback component that will be shown if ThreeScene fails
const ThreeFallback = () => (
  <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background/10 to-background/80" />
);

// Lazy load the ThreeScene component
const ThreeSceneLoader = () => {
  const { ThreeScene } = require("@/components/ThreeScene");
  return <ThreeScene />;
};

const Index = () => {
  useEffect(() => {
    document.title = "Kahan Jash | Portfolio";
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <ErrorBoundary FallbackComponent={ThreeFallback}>
        {/* Wrap the ThreeScene in a try-catch like wrapper */}
        <ThreeFallback />
      </ErrorBoundary>
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto pt-16 md:pt-32"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span variants={itemVariants} className="text-sm font-medium text-accent inline-block mb-2">
              DATA ENGINEER & AI/ML SPECIALIST
            </motion.span>
            
            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl xl:text-7xl font-bold mb-6">
              Kahan Jash
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl leading-relaxed">
              Transforming data into insights and artificial intelligence into solutions. 
              Specialized in machine learning, deep learning, and data engineering with a 
              passion for solving complex problems.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4">
              <Link 
                to="/contact" 
                className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Get in Touch
              </Link>
              <Link 
                to="/experience" 
                className="bg-muted hover:bg-muted/80 text-foreground px-8 py-3 rounded-lg font-medium transition-colors"
              >
                View Experience
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-24 md:mt-40 max-w-4xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Recent Experience
            </h2>
            
            <div className="glass-card p-6 mb-8 hover:shadow-lg transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                <h3 className="text-xl font-semibold">Data Engineer - Generative AI / ML</h3>
                <span className="text-sm text-muted-foreground">Nov 2024 - Present</span>
              </div>
              
              <div className="text-lg font-medium text-accent mb-4">Sarjen Systems Pvt. Ltd.</div>
              
              <ul className="list-disc ml-5 text-muted-foreground space-y-2">
                <li>Develop algorithms in the domain of Machine Learning and AI</li>
                <li>Work with data scientists and engineers to identify business problems and develop solutions</li>
                <li>Research and prototype state-of-the-art AI/NLP models and techniques</li>
              </ul>
            </div>
            
            <div className="flex justify-center mt-8">
              <Link to="/experience" className="text-accent hover:text-accent/80 font-medium flex items-center gap-2 transition-colors">
                View All Experience
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
