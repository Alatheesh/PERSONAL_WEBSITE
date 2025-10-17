
import React, { useState } from 'react';
import { Twitter, Instagram, Linkedin, Github, Mail, Globe } from 'lucide-react';

// Main profile data
const profileData = {
  name: "Lathu's Profile",
  tagline: "React Developer & Tech Enthusiast",
  bio: "Sharing my projects, insights, and connecting with the community. Find all my essential links below!",
  avatarUrl: "https://placehold.co/150x150/4f46e5/ffffff?text=L", // Placeholder for Lathu's Avatar
  links: [
    { name: "My Portfolio Website", url: "https://my-portfolio.com", icon: Globe, color: "bg-indigo-600 hover:bg-indigo-700" },
    { name: "Follow me on Twitter", url: "https://twitter.com/yourhandle", icon: Twitter, color: "bg-sky-500 hover:bg-sky-600" },
    { name: "Connect on LinkedIn", url: "https://linkedin.com/in/yourprofile", icon: Linkedin, color: "bg-blue-600 hover:bg-blue-700" },
    { name: "View GitHub Projects", url: "https://github.com/yourusername", icon: Github, color: "bg-gray-800 hover:bg-gray-900" },
    { name: "See My Instagram Snaps", url: "https://instagram.com/yourhandle", icon: Instagram, color: "bg-pink-600 hover:bg-pink-700" },
    { name: "Email Me Directly", url: "mailto:lathu@example.com", icon: Mail, color: "bg-green-600 hover:bg-green-700" },
  ]
};

// Component for a single link button
const LinkButton = ({ link }) => {
  const Icon = link.icon;
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-full ${link.color} text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-between text-lg md:text-xl`}
    >
      <div className="flex items-center">
        <Icon className="mr-4 h-6 w-6" />
        <span>{link.name}</span>
      </div>
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
      </svg>
    </a>
  );
};

// The main application component
const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      {/* Container for the link profile */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 space-y-6 transition-all duration-500">

        {/* Profile Header */}
        <header className="flex flex-col items-center text-center">
          <img
            src={profileData.avatarUrl}
            alt={`${profileData.name} Avatar`}
            className="w-32 h-32 rounded-full border-4 border-indigo-500 shadow-xl object-cover mb-4"
            onError={(e) => {
              e.target.onerror = null; // prevents looping
              e.target.src = "https://placehold.co/150x150/4f46e5/ffffff?text=L"; // Fallback placeholder
            }}
          />
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1 tracking-tight">
            {profileData.name}
          </h1>
          <p className="text-lg font-medium text-indigo-600 dark:text-indigo-400 mb-3">
            @{profileData.tagline}
          </p>
          <p className="text-gray-600 dark:text-gray-300 max-w-xs text-sm italic">
            {profileData.bio}
          </p>
        </header>

        {/* Links Section */}
        <section className="space-y-4">
          {profileData.links.map((link, index) => (
            <LinkButton key={index} link={link} />
          ))}
        </section>

        {/* Footer */}
        <footer className="text-center pt-4">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Built with React & Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
