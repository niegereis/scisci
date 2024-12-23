'use client';
import React from 'react';
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaTwitch,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-[#02044A] text-gray py-8 px-2">
      <section className="text-white max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-6 border-b-2 border-gray-600 py-4">
        <div>
          <h6 className="font-bold uppercase py-2">Solutions</h6>
          <ul>
            <li className="py-1">Marketing</li>
            <li className="py-1">Marketing</li>
            <li className="py-1">Marketing</li>
            <li className="py-1">Marketing</li>
            <li className="py-1">Marketing</li>
            <li className="py-1">Marketing</li>
          </ul>
        </div>

        <div>
          <h6 className="font-bold uppercase py-2">Solutions</h6>
          <ul>
            <li className="py-1">Marketing</li>
            <li className="py-1">Marketing</li>
            <li className="py-1">Marketing</li>
            <li className="py-1">Marketing</li>
            <li className="py-1">Marketing</li>
            <li className="py-1">Marketing</li>
          </ul>
        </div>

        <div>
          <h6 className="font-bold uppercase py-2">Solutions</h6>
          <ul>
            <li className="py-1">Marketing</li>
            <li className="py-1">Marketing</li>
            <li className="py-1">Marketing</li>
            <li className="py-1">Marketing</li>
            <li className="py-1">Marketing</li>
            <li className="py-1">Marketing</li>
          </ul>
        </div>

        <div>
          <h6 className="font-bold uppercase py-2">Solutions</h6>
          <ul>
            <li className="py-1">Marketing</li>
            <li className="py-1">Marketing</li>
            <li className="py-1">Marketing</li>
            <li className="py-1">Marketing</li>
            <li className="py-1">Marketing</li>
            <li className="py-1">Marketing</li>
          </ul>
        </div>

        <div className="col-span-2 pt-2 md:pt-2">
          <p className="font-bold uppercase">Subscribe To Our Newsletter</p>
          <p className="py-4">
            Subscribe To Our Newsletter Subscribe To Our Newsletter Subscribe To
            Our Newslettern Subscribe To Our Newsletter
          </p>

          <form className="flex flex-col sm:flex-row">
            <input
              className="w-full p-2 mr-4 rounded-md mb-2"
              type="email"
              placeholder="Enter email"
            />
            <button className="p-2 mb-2 bg-[#00B86E]"> Subscribe</button>
          </form>
        </div>
      </section>

      <section className="flex flex-col max-w-[1240px] px-2 py-4 m-auto justify-between sm:flex-row text-center text-gray-500 items-center">
        <p>2024 SciSci, DECOM All rights reserved.</p>
        <nav className="flex justify-between sm:w-[300px] pt-4 text-2xl gap-2">
          <FaFacebook />
          <FaGithub />
          <FaInstagram />
          <FaTwitter />
          <FaTwitch />
        </nav>
      </section>
    </footer>
  );
};

export default Footer;