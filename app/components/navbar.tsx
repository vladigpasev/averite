"use client"
import React, { useState } from 'react';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div>
            <div className='md:px-36 py-5 px-4 sticky top-0 z-10'>
                <div className='flex justify-between items-center'>
                    <div className='w-40'><img src="/logo.png" alt="Logo" /></div>
                    <div className='pt-10 pr-20 hidden xl:block'>
                        <ul className='flex gap-10 font-medium text-[#696864] text-2xl font-Jura'>
                            <a href=""><li className='transition transform hover:-translate-y-1 hover:text-red-600'>НАЧАЛО</li></a>
                            <a href=""><li className='transition transform hover:-translate-y-1 hover:text-red-600'>ЗА НАС</li></a>
                            <a href=""><li className='transition transform hover:-translate-y-1 hover:text-red-600'>КОМИКС</li></a>
                            <a href=""><li className='transition transform hover:-translate-y-1 hover:text-red-600'>БЛОГ</li></a>
                            <a href=""><li className='transition transform hover:-translate-y-1 hover:text-red-600'>КОНТАКТИ</li></a>
                        </ul>
                    </div>
                    <div className='pt-10 cursor-pointer hidden xl:block '>
                        <div className='rounded-full bg-gray-600 hover:bg-red-600 px-7 py-5 text-white font-Jura font-bold text-lg transition-colors duration-300'>ВИЖ КОМИКС</div>
                    </div>
                    <div className='pt-10 block xl:hidden '>
                        <div 
                            className='cursor-pointer border border-gray-300 rounded-lg px-4 py-2 text-gray-600'
                            onClick={toggleMenu}
                        >        
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={24} >
                                <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" fill="currentColor"/>
                            </svg>
                        </div>
                    </div>
                </div>
                {/* Menu for Mobile */}
                <div 
                    className={`xl:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96' : 'max-h-0'}`}
                >
                    <ul className='flex flex-col items-center gap-4 py-4 font-Jura font-medium text-[#696864] text-lg'>
                        <a className='w-full text-center' href=""><li>НАЧАЛО</li></a>
                        <a className='w-full text-center' href=""><li>ЗА НАС</li></a>
                        <a className='w-full text-center' href=""><li>КОМИКС</li></a>
                        <a className='w-full text-center' href=""><li>БЛОГ</li></a>
                        <a className='w-full text-center' href=""><li>КОНТАКТИ</li></a>
                        <a href=""><li> <div className='rounded-full bg-gray-600 px-7 py-5 text-white font-Jura font-bold text-lg'>ВИЖ КОМИКС</div></li></a>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
