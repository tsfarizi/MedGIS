// hooks/useSidebar.js
import { useState } from 'react';

const useSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handlePageChange = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  return { sidebarOpen, activePage, toggleSidebar, handlePageChange };
};

export default useSidebar;
