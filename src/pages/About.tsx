
import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ParticleField } from "@/components/ThreeScene";

const About = () => {
  useEffect(() => {
    document.title = "About | Kahan Jash";
  }, []);

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
              ABOUT ME
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-8"
            >
              Data Engineer & AI Specialist
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="prose prose-lg text-foreground mb-8"
            >
              <p>
                I'm Kahan Jash, a data engineer and AI/ML specialist with a passion for leveraging artificial intelligence to solve complex problems. 
                My expertise lies at the intersection of machine learning, data engineering, and software development.
              </p>
              
              <p>
                With a B.Tech in Computer Science & Engineering from Nirma University, I've built a solid foundation 
                in computer science principles while focusing specifically on advanced topics like machine learning, 
                deep learning, and data mining.
              </p>
              
              <p>
                Throughout my career, I've worked on various projects involving reinforcement learning, blockchain technology, 
                sentiment analysis, and predictive modeling. I'm particularly interested in the ethical applications of AI 
                and how they can be used to create positive impacts across different industries.
              </p>
              
              <h2>Education</h2>
              <p>
                <strong>B.Tech - Computer Science & Engineering</strong><br />
                Nirma University, Ahmedabad<br />
                October 2020 - May 2024
              </p>
              <p>
                <strong>Relevant coursework:</strong> Data Structures & Algorithms, Operating System, DBMS, 
                Computer Networking, Machine Learning, Deep Learning, Data Mining
              </p>
              
              <h2>Certifications</h2>
              <ul>
                <li>AWS Solutions Architect Associate (Ongoing)</li>
                <li>Google Data Analytics Professional Certificate</li>
                <li>Machine Learning Specialization by Stanford University and DeepLearning.AI</li>
                <li>Google UX Design Professional Certificate</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
