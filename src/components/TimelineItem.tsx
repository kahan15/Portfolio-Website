
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type TimelineItemProps = {
  title: string;
  organization: string;
  period: string;
  description: React.ReactNode;
  index: number;
  isLast?: boolean;
};

const TimelineItem = ({ title, organization, period, description, index, isLast = false }: TimelineItemProps) => {
  return (
    <div className={cn("relative pl-8 pb-8", !isLast && "border-l border-border")}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="relative"
        style={{ "--animation-order": index } as React.CSSProperties}
      >
        {/* Circle marker */}
        <div className="absolute w-4 h-4 rounded-full bg-accent -left-10 mt-1.5 transform -translate-x-1/2 border-4 border-background" />
        
        <div className="glass-card p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
            <h3 className="text-xl font-semibold">{title}</h3>
            <span className="text-sm text-muted-foreground">{period}</span>
          </div>
          
          <div className="text-lg font-medium text-accent mb-4">{organization}</div>
          
          <div className="prose text-muted-foreground">
            {description}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TimelineItem;
