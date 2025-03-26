
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  title: string;
  description: string;
  technologies: string[];
  period: string;
  index: number;
  link?: string;
};

const ProjectCard = ({ title, description, technologies, period, index, link }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "glass-card p-6 transition-all duration-300 hover:shadow-xl project-item",
        isHovered ? "scale-[1.02]" : "scale-100"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ "--animation-order": index } as React.CSSProperties}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold">{title}</h3>
        <span className="text-sm text-muted-foreground whitespace-nowrap ml-2">{period}</span>
      </div>
      
      <p className="text-muted-foreground mb-4">{description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech, i) => (
          <span key={i} className="skill-tag">{tech}</span>
        ))}
      </div>
      
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline text-sm font-medium"
        >
          View Project →
        </a>
      )}
    </motion.div>
  );
};

export default ProjectCard;
