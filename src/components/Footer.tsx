"use client";

import { Github, Linkedin, ExternalLink } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/fwwz-id",
      icon: Linkedin
    },
    {
      name: "GitHub", 
      url: "https://github.com/fwwz-id",
      icon: Github
    },
    {
      name: "Upwork",
      url: "https://www.upwork.com/freelancers/~0148ac91c35a54f2cd?mp_source=share", 
      icon: ExternalLink
    }
  ];

  return (
    <footer className="border-t border-foreground bg-background py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <Logo />

          {/* Built with */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="font-mono text-sm text-muted-foreground">
              © Fawwaz — built with React, Tailwind & lots of ☕
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