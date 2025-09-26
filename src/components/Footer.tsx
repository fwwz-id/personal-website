import { Github, Linkedin, ExternalLink } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/fwwz",
      icon: Linkedin
    },
    {
      name: "GitHub", 
      url: "https://github.com/fwwz",
      icon: Github
    },
    {
      name: "Upwork",
      url: "https://upwork.com/freelancers/fwwz", 
      icon: ExternalLink
    }
  ];

  return (
    <footer className="border-t border-foreground bg-background py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="font-grotesk font-bold text-2xl uppercase tracking-tight">
            FWWZ
          </div>

          {/* Built with */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="font-mono text-sm text-muted-foreground">
              © fwwz — built with React, Tailwind & lots of ☕
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:text-accent transition-colors group"
                    aria-label={link.name}
                  >
                    <IconComponent 
                      size={20} 
                      className="group-hover:scale-110 transition-transform" 
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;