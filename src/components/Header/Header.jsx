import React, { useState } from 'react';
import { Container, LogoutBtn } from '../index.js';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HiMenu, HiX } from 'react-icons/hi';
// import LogoImg from '../assets/94aba737-8d83-4a38-afaf-f0da75fb087e.png'; // adjust path if needed

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ];

  const isActive = (slug) => location.pathname === slug;

  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md">
      <Container>
        <nav className="flex items-center justify-between py-4 relative">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://cdn.dribbble.com/users/3512994/screenshots/6459452/bloggersunited_4x.jpg"
              alt="Logo"
              className="w-10 h-10 rounded-full shadow-md object-cover"
            />
            <span className="text-white font-bold text-xl hidden sm:inline">MyBlog</span>
          </Link>


          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className={`px-5 py-2 rounded-full font-medium transition duration-200 ${isActive(item.slug)
                          ? 'bg-white text-indigo-700 shadow'
                          : 'text-white hover:bg-white/20'
                        }`}
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white text-3xl focus:outline-none"
            >
              {menuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>

          {/* Mobile Dropdown */}
          {menuOpen && (
            <div className="absolute top-full left-0 w-full bg-white shadow-md z-50 rounded-b-xl px-4 py-6 md:hidden">
              <ul className="flex flex-col gap-4">
                {navItems.map(
                  (item) =>
                    item.active && (
                      <li key={item.name}>
                        <button
                          onClick={() => {
                            navigate(item.slug);
                            setMenuOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 rounded-lg font-medium transition duration-200 ${isActive(item.slug)
                              ? 'bg-indigo-100 text-indigo-700'
                              : 'text-indigo-600 hover:bg-indigo-50'
                            }`}
                        >
                          {item.name}
                        </button>
                      </li>
                    )
                )}
                {authStatus && (
                  <li>
                    <LogoutBtn />
                  </li>
                )}
              </ul>
            </div>
          )}
        </nav>
      </Container>
    </header>
  );
}

export default Header;
