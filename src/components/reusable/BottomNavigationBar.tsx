import Link from 'next/link';
import React from 'react'
type MyProps= {
    usingFor?: string;
    handleOpen?:()=>void;
    handleSearchOpen?:()=>void;
}
export default function BottomNavigationBar(props:MyProps) {
    const {usingFor, handleOpen, handleSearchOpen}=props;
  return (
    <div className="fixed z-50 w-[340px] h-16 -translate-x-1/2 overflow-hidden bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 bg-gray-700 dark:border-gray-600 md:hidden block">
    <div className="grid h-full max-w-lg grid-cols-5 mx-auto fixed">
    <Link href={'/'}>
        <button data-tooltip-target="tooltip-home" type="button" className="mt-5 inline-flex flex-col items-center justify-center px-5 rounded-s-full   group">
            <svg className="w-5 h-5 mb-1 text-red-600 dark:text-red-600 group-hover:text-red-600 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
            </svg>
            <span className="sr-only">Home</span>
        </button>
        </Link>
        <div id="tooltip-home" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300  rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700 bg-gray-700">
            Home
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <Link href={'/donar-list'}>
        <button data-tooltip-target="tooltip-settings" type="button" className="mt-5 inline-flex flex-col items-center justify-center px-5   group">
            <svg className="w-5 h-5 mb-1 text-red-600 dark:text-red-600 group-hover:text-red-600 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"/>
            </svg>
            <span className="sr-only">Donor List</span>
        </button>
        </Link>
        <div id="tooltip-wallet" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300  rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700 bg-gray-700">
        Donor List
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <div className="flex items-center justify-center">
            {usingFor==='donor' ?
            <button onClick={handleOpen} data-tooltip-target="tooltip-new" type="button" className="inline-flex items-center justify-center w-10 h-10 font-medium bg-red-600 rounded-full  group focus:ring-4  focus:outline-none dark:focus:ring-red-600">
                <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                </svg>
                <span className="sr-only">New Donor</span>
            </button>
            : 
            <button data-tooltip-target="tooltip-profile" type="button" className="inline-flex flex-col items-center justify-center p-4   group">
            <svg className="w-5 h-5 mb-1 text-red-600 dark:text-red-600 group-hover:text-red-600 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
            </svg>
            <span className="sr-only">Admin</span>
        </button>
}
        </div>
        <div id="tooltip-new" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300  rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700 bg-gray-700">
            {usingFor === 'donor' ? 'Add New Donor' : 'Admin'}
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <button onClick={handleSearchOpen} data-tooltip-target="tooltip-search" type="button" className="inline-flex flex-col items-center justify-center p-4   group">
            <svg className="w-5 h-5 mb-1 text-red-600 dark:text-red-600 group-hover:text-red-600 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <span className="sr-only">Search</span>
        </button>
        <div id="tooltip-search" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300  rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700 bg-gray-700">
            Search
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <Link href={'/logout'}>
        <button  data-tooltip-target="tooltip-profile" type="button" className="inline-flex flex-col items-center justify-center px-5 rounded-e-full   group">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5 mt-5 mbtext-red-600 dark:text-red-600 group-hover:text-red-600 "><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            <span className="sr-only">Log out</span>
        </button>
        </Link>
        <div id="tooltip-profile" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300  rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700 bg-gray-700">
            Log out
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
    </div>
</div>

  )
}
