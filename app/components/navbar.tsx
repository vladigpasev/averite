"use client";
import React, { useState, useCallback } from 'react';
import { FaBars } from 'react-icons/fa';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = useCallback(() => {
        setMenuOpen(prevState => !prevState);
    }, []);

    const menuItems = [
        { name: 'НАЧАЛО', link: '#' },
        { name: 'ЗА НАС', link: '#' },
        { name: 'КОМИКС', link: '#' },
        { name: 'БЛОГ', link: '#' },
        { name: 'КОНТАКТИ', link: '#' },
    ];

    return (
        <nav className='md:px-36 py-5 px-4 sticky top-0 z-10'>
            <div className='flex justify-between items-center'>
                <div className='w-40'><img src="/logo.png" alt="Logo" /></div>
                <div className='pt-10 pr-20 hidden xl:block'>
                    <ul className='flex gap-8 font-medium text-gray-600 text-lg'>
                        {menuItems.map((item, index) => (
                            <li key={index}><a href={item.link}>{item.name}</a></li>
                        ))}
                    </ul>
                </div>
                <div className='pt-10 cursor-pointer hidden xl:block'>
                    <div className='rounded-full bg-gray-600 px-7 py-5 text-white font-medium'>ВИЖ КОМИКС</div>
                </div>
                <div className='pt-10 block xl:hidden'>
                    <div 
                        className='cursor-pointer border border-gray-300 rounded-lg px-4 py-2 text-gray-600' 
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        role="button"
                    >
                        <FaBars size={24} />
                    </div>
                </div>
            </div>
            {/* Menu for Mobile */}
            <div 
                className={`xl:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96' : 'max-h-0'}`}
            >
                <ul className='flex flex-col items-center gap-4 py-4 font-medium text-gray-600 text-lg'>
                    {menuItems.map((item, index) => (
                        <li key={index}><a href={item.link}>{item.name}</a></li>
                    ))}
                    <li>
                        <div className='rounded-full bg-gray-600 px-7 py-5 text-white font-medium'>ВИЖ КОМИКС</div>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;