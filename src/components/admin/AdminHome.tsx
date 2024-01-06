'use client';
import React, { useEffect } from 'react'
import { GrMenu } from 'react-icons/gr'
import BottomNavigationBar from '../reusable/BottomNavigationBar'
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { selectAuth } from '@/redux/features/auth/authSlice';

const AdminHome = () => {
  const { user } = useAppSelector(selectAuth);
  const router = useRouter();

  useEffect(() => {
    if(!user){
router.push('/init');
    }
  }, [user])
  return (
    <div className="drawer-content ">
        {/* <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button top-1 lg:hidden"><GrMenu/></label> */}
        <div className="mt-7 px-3 mb-7 ml-5">
            <h1 className="text-center font-bold text-2xl text-red-300">Welcome to admin Dashboard</h1>
            <div className="mt-9 text-black-200">
                <h2 className='text-green-500'>Admin permission:</h2>
                <li>Can Edit/Delete Donar</li>
                {/* <li>Can Delete Hospital</li>
                <li>Can Delete Organisation</li> */}
            </div>
        </div>
        <hr />
        <div className="mt-7 px-3 mb-7 ml-5">
                <h2 className='text-red-500'>Admin Concern:</h2>
                <li>Before delete any user please check first</li>
                <p className='font-sm mt-7 italic'><span className='font-bold'>N.B:</span> You can't restore deleted user information</p>
            </div>
            <hr />
            <BottomNavigationBar/>
    </div>
  )
}

export default AdminHome