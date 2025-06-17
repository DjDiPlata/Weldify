import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { APP_MODULES_LIST, APP_MODULES } from '../constants'; // Import APP_MODULES
import type { AppModule, ModuleFeature } from '../types';

const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const XMarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);


interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});
  const location = useLocation();

  const toggleModule = (moduleId: string) => {
    setOpenModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };
  
  const getPageTitle = () => {
    const currentPath = location.pathname;

    for (const module of APP_MODULES_LIST) {
      // Check features first
      for (const feature of module.features) {
        if (currentPath === feature.path) {
          return `${module.name} - ${feature.name}`;
        }
      }
      // Then, check module base path itself
      if (currentPath === module.path) {
        return module.name;
      }
    }

    // Special handling for sub-pages not directly in APP_MODULES_LIST features' paths
    // but part of a module conceptually.
    if (currentPath === '/my-story/origin' && APP_MODULES['my-story']) {
      return `${APP_MODULES['my-story'].name} - El Origen`;
    }
    if (currentPath === '/my-story/acknowledgements' && APP_MODULES['my-story']) {
      return `${APP_MODULES['my-story'].name} - Reconocimientos`;
    }
    
    return "Weldify"; // Default title
  }

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:block`}>
        <div className="flex items-center justify-between p-4 h-16 border-b border-gray-700">
          <Link to="/dashboard" className="text-2xl font-bold text-orange-500">Weldify</Link>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <nav className="py-4 px-2 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
          {APP_MODULES_LIST.map((moduleItem: AppModule) => (
            // For 'my-story' and 'dashboard', treat as direct links if they have no features or are special like dashboard
            (moduleItem.id === 'dashboard' || moduleItem.id === 'my-story') ? (
              <Link
                key={moduleItem.id}
                to={moduleItem.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150
                            ${location.pathname.startsWith(moduleItem.path) ? 'bg-orange-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
              >
                {moduleItem.icon}
                <span className="ml-3">{moduleItem.name}</span>
              </Link>
            ) : (
              <div key={moduleItem.id}>
                <button
                  onClick={() => toggleModule(moduleItem.id)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-150"
                >
                  <div className="flex items-center">
                    {moduleItem.icon}
                    <span className="ml-3">{moduleItem.name}</span>
                  </div>
                  <ChevronDownIcon className={`w-5 h-5 transform transition-transform duration-150 ${openModules[moduleItem.id] ? 'rotate-180' : ''}`} />
                </button>
                {openModules[moduleItem.id] && moduleItem.features && (
                  <div className="mt-1 ml-4 pl-3 border-l border-gray-700 space-y-1">
                    {moduleItem.features.map((feature: ModuleFeature) => (
                      <Link
                        key={feature.id}
                        to={feature.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150
                                    ${location.pathname === feature.path ? 'bg-orange-500 text-white' : 'text-gray-400 hover:bg-gray-600 hover:text-gray-100'}`}
                      >
                        {feature.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-6 bg-gray-800 border-b border-gray-700 shadow-md">
          <div className="flex items-center">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-400 hover:text-white mr-4">
              <MenuIcon className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold text-gray-100">{getPageTitle()}</h1>
          </div>
          {/* User profile placeholder removed */}
          <div>
            {/* <img src="https://picsum.photos/seed/metal-texture-avatar-background/40/40" alt="User Avatar" className="w-8 h-8 rounded-full" /> */}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-6">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;