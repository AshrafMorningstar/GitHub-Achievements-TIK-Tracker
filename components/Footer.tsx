import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-github-card border-t border-github-border mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-github-muted text-sm">Made with</span>
          <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
          <span className="text-github-muted text-sm">by</span>
          <span className="text-github-accent font-semibold text-sm">Ashraf Morningstar</span>
        </div>
        <p className="text-github-muted text-xs max-w-2xl mx-auto leading-relaxed opacity-75">
          This project is a visual guide to GitHub Achievements and is not affiliated with GitHub, Inc. 
          All achievement images and names are property of GitHub.
        </p>
        <div className="mt-4 text-xs text-github-muted">
          &copy; {new Date().getFullYear()} Ashraf Morningstar. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;