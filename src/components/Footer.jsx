import React from "react";
import { assets } from "../assets/assets.js";
import { motion } from "motion/react";

const Footer = () => {
  return (
    <motion.div
     initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6,}}
    className="px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500">
      <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1,delay:0.2 }}
      className="flex flex-wrap justify-between items-start gap-8 pb-6 border-borderColor border-">
        <div>
          <motion.img
          initial={{opacity: 0 }}
          whileInView={{opacity: 1 }}
          transition={{ duration: 0.5, delay:0.3}}
          src={assets.logo} alt="logo" className="h-8 md:h-9" />
          <motion.p 
          initial={{opacity: 0 }}
          whileInView={{opacity: 1 }}
          transition={{ duration: 0.5,delay:0.4}}
          className="max-w-80 mt-3">
            Premium car service with a wide selection of luxury and everyday
            vehicals for all your driving needs.
          </motion.p>
          <motion.div
          initial={{opacity: 0 }}
          whileInView={{opacity: 1 }}
          transition={{ duration: 0.5,delay:0.5}}
          className="flex items-center gap-3 mt-6">
            <a href="#">
              <img src={assets.facebook_logo} alt="" className="w-5 h-5" />
            </a>
            <a href="#">
              <img src={assets.instagram_logo} alt="" className="w-5 h-5" />
            </a>
            <a href="#">
              <img src={assets.twitter_logo} alt="" className="w-5 h-5" />
            </a>
            <a href="#">
              <img src={assets.gmail_logo} alt="" className="w-5 h-5" />
            </a>
          </motion.div>
        </div>

        <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6,delay:0.4}}
        className="flex flex-wrap justify-between w-1/2 gap-8">
        <div>
          <h2 className="text-base font-medium text-gray-800 uppercase">
            Quick Links
          </h2>
          <ul className="mt-3 flex flex-col gap-1.5 ">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Browse Cars</a>
            </li>
            <li>
              <a href="#">List Your Car</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
          </ul>
        </div>
         <div>
          <h2 className="text-base font-medium text-gray-800 uppercase">
            Resources
          </h2>
          <ul className="mt-3 flex flex-col gap-1.5 ">
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
            <li>
              <a href="#">Privacy policy</a>
            </li>
            <li>
              <a href="#">Insurance</a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-base font-medium text-gray-800 uppercase">
            Contect
          </h2>
          <ul className="mt-3 flex flex-col gap-1.5 ">
            <li>1234 Luxury Drive</li>
            <li>San Francisco, CA 94107</li>
            <li>+1 234567890</li>
            <li>info@luxurycars.com</li>
          </ul>
        </div>
        </motion.div>
        
       
        
      </motion.div>
      <hr className="border-gray-300" />
      <motion.div
          initial={{opacity: 0, y:10}}
          whileInView={{opacity: 1,y:0 }}
          transition={{ duration: 0.6,delay:0.6}}
      className="flex flex-col md:flex-row gap-2 items-center justify-between py-5">
        <p>© {new Date().getFullYear()} All rights reserved.</p>
        <ul className="flex items-center gap-4">
          <li>
            <a href="#">Privacy</a>
            <span> | </span>
          </li>
          <li>
            <a href="#">Terms</a>
            <span> | </span>
          </li>
          <li>
            <a href="#">Cookies</a>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default Footer;
