import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto px-6 py-6 border-t border-gray-200 bg-white/50 backdrop-blur-md">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Copyright Section */}
        <div className="text-sm text-gray-500">
          © {currentYear} <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ERP System</span>. 
          All rights reserved.
        </div>

        {/* Links Section */}
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <a href="#" className="hover:text-blue-600 transition-colors">Documentation</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Support</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
        </div>

        {/* Branding/Status Section */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Enterprise
          </span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span className="text-green-500 font-medium">v2.1.0</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;