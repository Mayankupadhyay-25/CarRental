import { useLocation, useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";

const Navbar = () => {
  const { setShowLogin, user, logout, isOwner, changeRole } = useAppContext();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all ${
        location.pathname === "/" ? "bg-light" : "bg-white"
      }`}
    >
      <Link to="/" className="flex items-center">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={assets.logo}
          alt="logo"
          className="h-8 w-auto object-contain"
        />
      </Link>

      <div
        className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor 
       right-0 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 max-sm:p-6 transition-all 
       duration-300 z-50 ${location.pathname === "/" ? "bg-light" : "bg-white"}
        ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-9 font-medium text-base md:text-[17px]">
          {menuLinks.map((link, index) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={index}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`transition-colors hover:text-primary ${
                  isActive ? "text-primary font-semibold" : "text-gray-600"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="flex max-sm:flex-col max-sm:items-start sm:items-center gap-4 sm:gap-6">
          {isOwner && (
            <button
              onClick={() => {
                setOpen(false);
                navigate("/owner");
              }}
              className="cursor-pointer text-base md:text-[17px] font-medium text-gray-700 hover:text-primary transition-colors py-2"
            >
              Dashboard
            </button>
          )}

          <button
            onClick={() => {
              setOpen(false);
              user ? logout() : setShowLogin(true);
            }}
            className="cursor-pointer px-7 py-2.5 text-base font-medium bg-primary hover:bg-primary-dull transition-all text-white rounded-lg shadow-sm"
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
      </div>

      <button
        className="sm:hidden cursor-pointer p-1"
        aria-label="menu"
        onClick={() => setOpen(!open)}
      >
        <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" className="w-6 h-6" />
      </button>
    </motion.nav>
  );
};

export default Navbar;
