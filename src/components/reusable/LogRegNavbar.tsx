import Link from 'next/link'
import React from 'react'
import heroImage from '@/assets/blood-bank.png';
const LogRegNavbar = () => {
  return (
    <div className="navbar bg-base-200 px-5 border-b border-b-red-600 shadow-b-xl fixed">
  <div className="flex-1">
  <div className="flex items-center justify-start gap-2">
        <img src={heroImage.src} alt='Nil Blood Bank' className="max-w-md rounded-lg shadow-2xl w-[50px]" />
          <a className="normal-case text-lg md:text-xl lg:text-2xl text-red-600 font-semibold cursor-pointer">Nil Blood Bank</a>
        </div>
  </div>
  {/* <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li><Link href={'/login'}>Login</Link></li>
      <li><Link href={'/register'}>Register</Link></li>
    </ul>
  </div> */}
</div>
  )
}

export default LogRegNavbar