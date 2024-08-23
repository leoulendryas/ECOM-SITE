"use client"
import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart, FaUser, FaShoppingBag, FaSearch, FaBars, FaTimes } from 'react-icons/fa';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 w-full bg-darkGray text-white flex justify-between items-center p-2 md:px-14 z-50 transition-opacity duration-300 ${
        isScrolled ? 'opacity-85' : 'opacity-100'
      }`}
    >
      {/* Left Section: Logo */}
      <div className="flex items-center">
        <a href='#' className="font-medium text-xs">LOGO HERE</a>
      </div>

      {/* Middle Section: Navigation Links */}
      <nav
        className={`fixed top-0 right-0 h-full w-3/4 bg-darkGray text-white transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out flex flex-col items-center space-y-6 md:static md:flex md:flex-row md:space-x-8 md:space-y-0 md:w-auto md:translate-x-0`}
      >
        {/* Conditionally Render Close Button */}
          {isMenuOpen && (
          <button 
            className="self-end p-4 text-white hover:text-gray-300"
            onClick={toggleMenu}
          >
            <FaTimes  size={14} />
          </button>
        )}
        <a href="#" className="hover:text-gray2 text-white text-xs font-medium">New & Featured</a>
        <a href="#" className="hover:text-gray2 text-white text-xs font-medium">Create Your Own</a>
        <a href="#" className="hover:text-gray2 text-white text-xs font-medium">Men</a>
        <a href="#" className="hover:text-gray2 text-white text-xs font-medium">Women</a>
        <a href="#" className="hover:text-gray2 text-white text-xs font-medium">Kids</a>
        <a href="#" className="hover:text-gray2 text-white text-xs font-medium">Sale</a>
      </nav>

      {/* Right Section: Icons */}
      <div className="flex space-x-6">
        <button className="hover:text-gray2">
          <FaSearch size={14} />
        </button>
        <button className="hover:text-gray2">
          <FaRegHeart size={14} />
        </button>
        <button className="hover:text-gray2">
          <FaUser size={14} />
        </button>
        <button className="hover:text-gray2">
          <FaShoppingBag size={14} />
        </button>
        <button className="hover:text-gray2 md:hidden" onClick={toggleMenu}>
          <FaBars size={14} />
        </button>
      </div>
    </header>
  );
};

export default Header;
