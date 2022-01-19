import React from 'react';
import SearchModal from './header/SearchModal';
import UserMenu from './header/UserMenu';
import { Link } from 'react-router-dom';

function Header({
  sidebarOpen,
  setSidebarOpen
}) {
  return (
    <header className="sticky top-0 inset-0 bg-gray-300 text-gray-700 shadow-md border-b z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">

          {/* Header: Left side */}
          <div className="flex justify-items-end">
            
            {/* Hamburger button */}
            <button
              className="text-gray-700 hover:text-gray-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => {
                setSidebarOpen(!sidebarOpen)
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>

            </button>

          </div>

          {/* Header: Right side */}
          <div className="flex items-center">
            <div  style={{width: '2.5rem',height: '2.5rem', padding: '0.5rem',backgroundColor:'#ffb45c',borderRadius: '10px'}}>
                
                
              <button onClick={() => {
                  let route = window.location;
                  route['hash'] = '#/home'; 
              }}>                  
                <img src="https://img.icons8.com/external-becris-lineal-becris/64/000000/external-back-arrow-mintab-for-ios-becris-lineal-becris.png"/>
              </button>
            </div>

            {/*  Divider */}
            <hr className="w-px h-6 bg-gray-800 mx-3" />
            <UserMenu />

          </div>

        </div>
      </div>
    </header >
  );
}

export default Header;