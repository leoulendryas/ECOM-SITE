import React from 'react';
import { FaYoutube, FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-whiter py-8 w-full mt-auto">
      <div className="container mx-auto px-4">
        {/* Top Section: Links */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          {/* Support Links */}
          <div className="mb-6 md:mb-0">
            <h4 className="font-semibold text-lg mb-2">SUPPORT</h4>
            <ul className="space-y-2 text-sm text-darkGray font-medium">
              <li><a href="#" className="hover:underline">FAQ</a></li>
              <li><a href="#" className="hover:underline">Payment options</a></li>
              <li><a href="#" className="hover:underline">Delivery information</a></li>
              <li><a href="#" className="hover:underline">Orders</a></li>
              <li><a href="#" className="hover:underline">Contact brand</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="mb-6 md:mb-0">
            <h4 className="font-semibold text-lg mb-2">COMPANY</h4>
            <ul className="space-y-2 text-sm text-darkGray font-medium">
              <li><a href="#" className="hover:underline">About brand</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">Investors</a></li>
            </ul>
          </div>

          {/* My Account Links */}
          <div className="mb-6 md:mb-0">
            <h4 className="font-semibold text-lg mb-2">MY ACCOUNT</h4>
            <ul className="space-y-2 text-sm text-darkGray font-medium">
              <li><a href="#" className="hover:underline">Login</a></li>
              <li><a href="#" className="hover:underline">Register</a></li>
            </ul>
          </div>
        </div>

        {/* Payment and Social Media Icons */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          {/* Payment Methods */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gray"></div>
            <div className="w-8 h-8 bg-gray"></div>
            <div className="w-8 h-8 bg-gray"></div>
            <div className="w-8 h-8 bg-gray"></div>
          </div>
          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a href="#" className="text-black hover:text-gray-600">
              <FaYoutube className="w-5 h-5" />
            </a>
            <a href="#" className="text-black hover:text-gray-600">
              <FaTwitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-black hover:text-gray-600">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-black hover:text-gray-600">
              <FaFacebook className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-t border-gray-300 mb-6" />

        {/* Bottom Section: Copyright and Links */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <span className="text-darkGray font-medium text-base mb-4 md:mb-0">
            &copy; 2024 brand.inc. All Rights Reserved
          </span>
          <div className="flex space-x-4">
            <a href="#" className="hover:underline text-darkGray font-medium text-base">Privacy Policy</a>
            <a href="#" className="hover:underline text-darkGray font-medium text-base">Terms of Use</a>
            <a href="#" className="hover:underline text-darkGray font-medium text-base">Site Map</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
