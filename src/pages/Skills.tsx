
import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSkill from "@/components/AnimatedSkill";
import { ParticleField } from "@/components/ThreeScene";

const Skills = () => {
  useEffect(() => {
    document.title = "Skills | Kahan Jash";
  }, []);

  const programmingLanguages = [
    { name: "Python", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "Java", level: 80 },
    { name: "C/C++", level: 75 },
    { name: "SQL", level: 85 },
    { name: "HTML/CSS", level: 88 },
    { name: "PHP", level: 70 },
    { name: "Shell Script", level: 65 },
  ];

  const mlAndDataSkills = [
    { name: "TensorFlow", level: 85 },
    { name: "Scikit-learn", level: 90 },
    { name: "Keras", level: 85 },
    { name: "PyTorch", level: 75 },
    { name: "OpenCV", level: 80 },
    { name: "Data Analysis", level: 90 },
    { name: "Natural Language Processing", level: 80 },
    { name: "Reinforcement Learning", level: 85 },
  ];

  const databasesAndTools = [
    { name: "MySQL", level: 88 },
    { name: "MongoDB", level: 82 },
    { name: "PostgreSQL", level: 75 },
    { name: "Git/GitHub", level: 90 },
    { name: "Docker", level: 70 },
    { name: "AWS", level: 75 },
    { name: "Linux/Unix", level: 85 },
    { name: "Hadoop", level: 65 },
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
              EXPERTISE
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-8"
            >
              Technical Skills
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-muted-foreground mb-12"
            >
              A comprehensive overview of my technical toolkit and expertise.
            </motion.p>
            
            <div className="space-y-16">
              <section>
                <h2 className="text-2xl font-bold mb-6">Programming Languages</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {programmingLanguages.map((skill, index) => (
                    <AnimatedSkill
                      key={index}
                      name={skill.name}
                      level={skill.level}
                    />
                  ))}
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-6">Machine Learning & Data Science</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {mlAndDataSkills.map((skill, index) => (
                    <AnimatedSkill
                      key={index}
                      name={skill.name}
                      level={skill.level}
                    />
                  ))}
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-6">Databases & Tools</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {databasesAndTools.map((skill, index) => (
                    <AnimatedSkill
                      key={index}
                      name={skill.name}
                      level={skill.level}
                    />
                  ))}
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-6">Soft Skills</h2>
                <div className="glass-card p-6">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 list-disc ml-5 text-muted-foreground">
                    <li>Collaborative team player</li>
                    <li>Strategic thinking</li>
                    <li>Effective communication</li>
                    <li>Problem-solving</li>
                    <li>Adaptability</li>
                    <li>Time management</li>
                    <li>Attention to detail</li>
                    <li>Leadership</li>
                  </ul>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Skills;
