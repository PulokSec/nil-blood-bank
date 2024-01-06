import Link from 'next/link';
import React from 'react';
import heroImage from '@/assets/blood-bank.png';

const InitialPage = () => {
  return (
    <>
      <div className="navbar bg-base-200 px-10">
        <div className="flex-1 hidden md:block">
        <div className="flex items-center justify-start gap-2">
        <img src={heroImage.src} alt='Nil Blood Bank' className="max-w-md rounded-lg shadow-2xl w-[50px]" />
          <a className="normal-case text-lg md:text-xl lg:text-2xl text-red-600 font-semibold cursor-pointer">Nil Blood Bank</a>
        </div>
        </div>
        <div className="flex-none hidden md:block">
          <ul className="menu menu-horizontal">
          <li className="text-sm  text-center"><span className='font-semibold'>Made By</span><a href="mailto:riopulok@gmail.com"> Pulok Chowdhury</a></li>
          </ul>
        </div>
      </div>
      <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img src={heroImage.src} alt='Nil Blood Bank' className="max-w-md rounded-lg shadow-2xl w-full" />
            <div>
              <h1 className="md:text-5xl font-bold text-red-300 drop-shadow-lg text-xl">Welcome to Nil Blood Bank</h1>
              <p className="py-6 text-dark-50 md:text-md text-sm w-full"><span className=' text-[#FF0000] font-medium'>"Be a Lifesaver: Donate Blood Today!"</span><br/>

              Welcome to our Nil Blood Bank Center, where heroes like you make a life-saving difference.<br/> Join us in the noble mission of saving lives. Your single donation can impact countless lives. Step up, donate, and be a hero today!</p>
                  <Link href='/login'><button className="btn bg-[#FF0000] hover:bg-red-600 text-white">Get Started</button></Link>
            </div>
          </div>
        </div>
    </>
    
  );
};

export default InitialPage;
