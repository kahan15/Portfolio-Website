
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedSkillProps = {
  name: string;
  icon?: React.ReactNode;
  level?: number;
  className?: string;
};

const AnimatedSkill = ({ name, icon, level = 85, className }: AnimatedSkillProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const skillRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={skillRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "glass-card p-4 transition-all duration-300 hover:shadow-xl",
        isHovered ? "scale-105" : "scale-100",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-2">
        {icon && <span className="text-accent">{icon}</span>}
        <h3 className="font-semibold text-base">{name}</h3>
      </div>
      
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="h-full bg-accent rounded-full"
        />
      </div>
    </motion.div>
  );
};

export default AnimatedSkill;
