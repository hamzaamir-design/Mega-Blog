import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gradient-to-tr from-purple-700 to-indigo-700 text-white pt-10 pb-6 border-t-4 border-indigo-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap -mx-6">
          {/* Left Section */}
          <div className="w-full md:w-1/2 lg:w-5/12 px-6 mb-8 md:mb-0">
            <div className="mb-4 flex items-center">
              <Link to="/" className="inline-flex items-center">
                <img
                  src="https://cdn.dribbble.com/users/3512994/screenshots/6459452/bloggersunited_4x.jpg"
                  alt="Logo"
                  className="w-[100px] h-auto rounded-full shadow-md"
                />
              </Link>

              <span className="ml-3 font-bold text-xl">MyBlog</span>
            </div>
            <p className="text-sm text-indigo-100">
              Your daily dose of quality content. Blog smarter, write better.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-indigo-300">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-indigo-300">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-indigo-300">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-indigo-300">
                <FaGithub />
              </a>
            </div>
            <p className="text-sm mt-6 text-indigo-200">
              &copy; 202 MyBlog. All rights reserved.
            </p>
          </div>

          {/* Column 1 */}
          <div className="w-full md:w-1/2 lg:w-2/12 px-6 mb-8 md:mb-0">
            <h3 className="uppercase text-sm font-semibold mb-4 text-indigo-100">Company</h3>
            <ul>
              {['Features', 'Pricing', 'Affiliate Program', 'Press Kit'].map((item) => (
                <li key={item} className="mb-3">
                  <Link
                    to="/"
                    className="text-indigo-100 hover:text-white transition duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 */}
          <div className="w-full md:w-1/2 lg:w-2/12 px-6 mb-8 md:mb-0">
            <h3 className="uppercase text-sm font-semibold mb-4 text-indigo-100">Support</h3>
            <ul>
              {['Account', 'Help', 'Contact Us', 'Customer Support'].map((item) => (
                <li key={item} className="mb-3">
                  <Link
                    to="/"
                    className="text-indigo-100 hover:text-white transition duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div className="w-full md:w-1/2 lg:w-3/12 px-6">
            <h3 className="uppercase text-sm font-semibold mb-4 text-indigo-100">Legals</h3>
            <ul>
              {['Terms & Conditions', 'Privacy Policy', 'Licensing'].map((item) => (
                <li key={item} className="mb-3">
                  <Link
                    to="/"
                    className="text-indigo-100 hover:text-white transition duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
