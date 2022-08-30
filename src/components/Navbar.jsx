import React, { useState } from "react";
import { Link } from "react-router-dom";
import {FaBars, FaTimes} from 'react-icons/fa'

const Navbar = () => {
  const [togle, setTogle] = useState(false);
  const handleTogle = () => {
    setTogle(!togle);
  };
  return (
    <div className="nav-container flex justify-between items-center px-8 py-4 font-bold fixed top-0 left-0 right-0 bg-transparent backdrop-filter backdrop-blur-lg z-30">
      <div className="logo-container">
        <h1 className="bg-clip-text text-transparent bg-[#0080ff] font-extrabold text-3xl md:text-4xl flex flex-col justify-center items-center cursor-pointer">
          <Link to='/'>
            CryptoTracker
          </Link>
        </h1>
      </div>
      <ul className="link-container gap-5 hidden md:flex md:gap-4 md:text-xl cursor-pointer">
        <Link className="flex items-center gap-1 hover:text-blue-500" to="/">
          Home
        </Link>
        <Link className="flex items-center gap-1 hover:text-blue-500" to="/exchanges">
          Exchanges
        </Link>
        <Link className="flex items-center gap-1 hover:text-blue-500" to="/cryptocurrencies">
          Cryptocurrencies
        </Link>
        <Link className="flex items-center gap-1 hover:text-blue-500" to="/news">
          News
        </Link>
      </ul>
      {/* hamburger */}
      <div onClick={() => handleTogle()} className="md:hidden z-10">
        {!togle ? <FaBars size={28} /> : <FaTimes size={28} />}
      </div>
      <ul
        className={
          !togle
            ? "hidden"
            : "absolute top-0 left-0 w-full h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-black to-blue-600"
        }
      >
        <li className='py-6 text-3xl'>
          <Link
            className=" hover:text-blue-500"
            to="/"
            onClick={() => handleTogle()}
          >
            Home
          </Link>
        </li>
        <li className='py-6 text-3xl'>
          <Link
            className=" hover:text-blue-500"
            to="exchanges"
            onClick={() => handleTogle()}
          >
            Exchanges
          </Link>
        </li>
        <li className='py-6 text-3xl'>
          <Link
            className=" hover:text-blue-500"
            to="cryptocurrencies"
            onClick={() => handleTogle()}
          >
            Cryptocurrencies
          </Link>
        </li>
        <li className='py-6 text-3xl'>
          <Link
            className=" hover:text-blue-500"
            to="news"
            onClick={() => handleTogle()}
          >
            News
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
