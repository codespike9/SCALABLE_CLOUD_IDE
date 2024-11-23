// components/Sidebar.js
import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-1/6 bg-gray-800 text-white p-4 2xl:h-screen">
      <h3 className="text-xl font-bold mb-6">Sidebar</h3>
      <ul>
        <li className="mb-4 cursor-pointer hover:bg-gray-600 p-2 rounded">
          Project Files
        </li>
        <li className="mb-4 cursor-pointer hover:bg-gray-600 p-2 rounded">
          Settings
        </li>
        <li className="mb-4 cursor-pointer hover:bg-gray-600 p-2 rounded">
          Documentation
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
