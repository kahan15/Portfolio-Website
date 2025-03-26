
import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { ParticleField } from "@/components/ThreeScene";

const Projects = () => {
  useEffect(() => {
    document.title = "Projects | Kahan Jash";
  }, []);

  const projects = [
    {
      title: "Attendance Management System using Face Detection",
      description: "Developed a Face Attendance System for automated recognition and attendance tracking.",
      technologies: ["Python", "OpenCV", "MySQL", "Tkinter", "LBHP classifier"],
      period: "July 2023 - December 2023",
    },
    {
      title: "E-commerce Website",
      description: "Built a full-featured e-commerce platform with product listings, shopping cart, and order management.",
      technologies: ["HTML", "CSS", "Bootstrap", "PHP", "MySQL"],
      period: "March 2022",
    },
    {
      title: "Diabetes Prediction System",
      description: "Created a predictive model to identify diabetes risk based on medical indicators and demographic data.",
      technologies: ["PCA", "Correlation Analysis", "Logistic Regression", "KNN", "SVM", "Decision Tree", "Random Forest"],
      period: "March 2022",
    },
    {
      title: "Blockchain-Based Smart Contract for Telesurgery",
      description: "Implemented a security mechanism to detect communication threats in telesurgery operations using UAVs.",
      technologies: ["Blockchain", "Ethereum", "Solidity", "Smart Contracts"],
      period: "October 2024 - December 2024",
    },
    {
      title: "AI Enabled HR Analytics",
      description: "Leveraged NLP and sentiment analysis to provide actionable insights for HR decision-making.",
      technologies: ["MongoDB", "Flask", "PHP", "JavaScript", "Python", "NLP"],
      period: "January 2024 - May 2024",
    },
    {
      title: "DDoS Attack Detection in SDN",
      description: "Applied deep learning to detect both Low-Rate and High-Rate DDoS attacks in Software-Defined Networks.",
      technologies: ["Deep Learning", "Keras Tuner", "Python", "SDN"],
      period: "August 2024 - November 2024",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <ParticleField />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto pt-16"
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm font-medium text-accent inline-block mb-2"
            >
              MY WORK
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-8"
            >
              Projects
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-muted-foreground mb-12"
            >
              A selection of projects I've worked on throughout my academic and professional career.
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  title={project.title}
                  description={project.description}
                  technologies={project.technologies}
                  period={project.period}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Projects;
