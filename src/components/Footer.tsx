
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 py-8 mt-12">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            &copy; {currentYear} Kahan Jash. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-4">
            <a 
              href="mailto:kahanjash15@gmail.com" 
              className="text-primary hover:text-primary-light transition-colors"
            >
              Email
            </a>
            <a 
              href="https://www.linkedin.com/in/kahan-jash" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:text-primary-light transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com/kahan15" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:text-primary-light transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
