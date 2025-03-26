
import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TimelineItem from "@/components/TimelineItem";
import { ParticleField } from "@/components/ThreeScene";

const Experience = () => {
  useEffect(() => {
    document.title = "Experience | Kahan Jash";
  }, []);

  const experiences = [
    {
      title: "Data Engineer - Generative AI / ML",
      organization: "Sarjen Systems Pvt. Ltd., Ahmedabad",
      period: "November 2024 - Present",
      description: (
        <ul className="list-disc ml-5 space-y-2">
          <li>Develop algorithms in the domain of Machine Learning and AI.</li>
          <li>Work closely with data scientists, engineers, and product managers to identify business problems and develop solutions.</li>
          <li>Collect, analyze, and interpret data using statistical and data analysis tools.</li>
          <li>Research and prototype state-of-the-art AI/NLP models and techniques.</li>
        </ul>
      ),
    },
    {
      title: "Research Assistant (CSE Dept.)",
      organization: "Nirma University, Ahmedabad",
      period: "July 2024 - January 2025",
      description: (
        <ul className="list-disc ml-5 space-y-2">
          <li>Collaborated with the Head of the CSE department to conduct research on autonomous vehicle training using Reinforcement Learning (RL) to improve adaptability and safety in real-world driving scenarios.</li>
          <li>Designed and simulated RL environments, optimizing vehicle performance in varied and dynamic environments, using Python, TensorFlow, and OpenAI Gym.</li>
          <li>Conducted research on Low-Rate and High-Rate DDoS attacks in Software-Defined Networks (SDN), applying deep learning techniques to a comprehensive dataset.</li>
          <li>Developed a blockchain-based smart contract for secure telesurgery operations using UAVs, integrating entities like patients, doctors, caregivers, pharmacies, and medical equipment.</li>
          <li>Utilized Solidity and Ethereum smart contracts to demonstrate proficiency in decentralized application development for the healthcare domain.</li>
        </ul>
      ),
    },
    {
      title: "AI & ML Intern",
      organization: "Cygnet One, Ahmedabad",
      period: "January 2024 – June 2024",
      description: (
        <ul className="list-disc ml-5 space-y-2">
          <li>Developed an end-to-end project titled AI Enabled HR Analytics, leveraging NLP and sentiment analysis to enhance the project.</li>
          <li>Utilized MongoDB, Flask, PHP, HTML, CSS, JavaScript, and Python to develop and deploy the application.</li>
          <li>Implemented machine learning algorithms to analyze HR data, providing actionable insights for HR's data-driven decision-making.</li>
          <li>Conducted user testing and iteratively improved the application, leading to a 25% increase in user satisfaction.</li>
        </ul>
      ),
    },
    {
      title: "AI & ML Intern",
      organization: "Cygnet One, Ahmedabad",
      period: "June 2023 – July 2023",
      description: (
        <ul className="list-disc ml-5 space-y-2">
          <li>Developed a prototype that provided sentiment analysis insights for various keywords, aiding in content creation and market research.</li>
          <li>Analyzed data from Google Search Console and Google Analytics 4 to identify trends.</li>
          <li>Communicated effectively with non-technical teams to ensure a minimal learning curve for the product, resulting in a smoother adoption process.</li>
          <li>Achieved a 15% improvement in sentiment analysis accuracy through iterative model enhancements.</li>
        </ul>
      ),
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
              PROFESSIONAL JOURNEY
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-8"
            >
              Work Experience
            </motion.h1>
            
            <div className="mt-12">
              {experiences.map((exp, index) => (
                <TimelineItem
                  key={index}
                  title={exp.title}
                  organization={exp.organization}
                  period={exp.period}
                  description={exp.description}
                  index={index}
                  isLast={index === experiences.length - 1}
                />
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-20"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                Activities & Leadership
              </h2>
              
              <div className="glass-card p-6 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">Association of Computer Engineering Students</h3>
                  <span className="text-sm text-muted-foreground">November 2022 - November 2023</span>
                </div>
                
                <div className="text-lg font-medium text-accent mb-4">Organizing Secretary</div>
                
                <ul className="list-disc ml-5 text-muted-foreground space-y-2">
                  <li>Managed the organization and execution of all technical and non-technical events, including annual orientations, conferences, career fairs and workshops.</li>
                  <li>Organized an educational workshop which discovered the area of research by Dr. Sudeep Tanwar who is one of the most respected and honoured research scientists in the world with over 10,000 citations, h-index of 56 on Google.</li>
                </ul>
              </div>
              
              <div className="glass-card p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">National Service Scheme</h3>
                  <span className="text-sm text-muted-foreground">March 2022 - December 2023</span>
                </div>
                
                <div className="text-lg font-medium text-accent mb-4">Volunteer</div>
                
                <ul className="list-disc ml-5 text-muted-foreground space-y-2">
                  <li>Actively participated in Corporate Social Responsibility (CSR) initiatives, including the adoption of a local village.</li>
                  <li>Engaged in regular visits to the village which focused on imparting moral values and ethical principles to primary school students.</li>
                  <li>Promoted importance of academic education and sports education to support holistic development of community.</li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Experience;
