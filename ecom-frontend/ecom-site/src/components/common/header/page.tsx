"use client"
import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart, FaUser, FaShoppingBag, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

interface HeaderProps {
  onCartToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartToggle }) => {
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
      className={`fixed top-0 w-full bg-darkGray text-white flex justify-between items-center p-4 md:px-20 z-50 transition-opacity duration-300 ${
        isScrolled ? 'opacity-85' : 'opacity-100'
      }`}
    >
      <div className="flex items-center">
        <a href='#' className="font-medium text-xs">LOGO HERE</a>
      </div>

      <nav
        className={`fixed top-0 right-0 h-full w-full bg-darkGray text-white transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out flex flex-col items-center space-y-20 md:static md:flex md:flex-row md:space-x-8 md:space-y-0 md:w-auto md:translate-x-0`}
      >
          {isMenuOpen && (
          <button 
            className="self-end p-4 text-white hover:text-gray-300"
            onClick={toggleMenu}
          >
            <FaTimes  size={28} />
          </button>
        )}
        <a href="/products/newAndFeatured" className="hover:text-gray2 text-white text-xl md:text-xs font-medium">New & Featured</a>
        <a href="#" className="hover:text-gray2 text-white text-xl md:text-xs font-medium">Create Your Own</a>
        <a href="/products/men" className="hover:text-gray2 text-white text-xl md:text-xs font-medium">Men</a>
        <a href="/products/women" className="hover:text-gray2 text-white text-xl md:text-xs font-medium">Women</a>
        <a href="/products/kids" className="hover:text-gray2 text-white text-xl md:text-xs font-medium">Kids</a>
        <a href="/products/sale" className="hover:text-gray2 text-white text-xl md:text-xs font-medium">Sale</a>
      </nav>

      <div className="flex space-x-4 md:space-x-8">
        <button className="hover:text-gray2">
          <FaSearch size={14} />
        </button>
        <button className="hover:text-gray2">
          <FaRegHeart size={14} />
        </button>
        <Link href={`/auth`}>
          <button className="hover:text-gray2">
            <FaUser size={14} />
          </button>
        </Link>
        <button onClick={onCartToggle} className="hover:text-gray2">
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
