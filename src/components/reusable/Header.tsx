'use client'
import { selectAuth } from '@/redux/features/auth/authSlice';
import { useAppSelector } from '@/redux/hooks';
import Link from 'next/link';
import React from 'react';
import toast from 'react-hot-toast';
import heroImage from '@/assets/blood-bank.png';



const Header = () => {
    const {user}=useAppSelector(selectAuth)
  return (
    <div className="navbar  text-[#FFFFFF] border-b border-b-red-600">
    <div className="flex-1">
  <div className="flex items-center justify-start gap-2">
        <img src={heroImage.src} alt='Nil Blood Bank' className="max-w-md rounded-lg shadow-2xl w-[50px]" />
          <a className="normal-case text-lg md:text-xl lg:text-2xl text-red-600 font-semibold cursor-pointer">Nil Blood Bank</a>
        </div>
  </div>
    <div className="flex-none hidden md:block">
      <ul className="menu menu-horizontal px-1">
        <li><a><div className="badge h-6">{user?.role}</div></a></li>
        <li><a>{user?.name || user?.hospitalName || user?.organisationName}</a></li>
        <li><Link href={'/logout'}>Logout</Link> </li>
      </ul>
    </div>
  </div>
  );
};

export default Header;
