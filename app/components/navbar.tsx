"use client";
import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';

interface MenuItem {
    name: string;
    link: string;
}

interface MenuItemsProps {
    items: MenuItem[];
}

interface MobileMenuProps {
    items: MenuItem[];
    isOpen: boolean;
}

const MenuItems: React.FC<MenuItemsProps> = ({ items }) => {
    return (
        <ul className='flex gap-10 font-medium text-gray-600 text-2xl'>
            {items.map((item, index) => (
                <li key={index} className='transition transform hover:-translate-y-1 hover:text-red-600'>
                    <a href={item.link}>{item.name}</a>
                </li>
            ))}
        </ul>
    );
};

const MobileMenu: React.FC<MobileMenuProps> = ({ items, isOpen }) => {
    return (
        <div className={`xl:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
            <ul className='flex flex-col items-center gap-4 py-4 font-medium text-gray-600 text-lg'>
                {items.map((item, index) => (
                    <li key={index}>
                        <a href={item.link} className='w-full text-center'>{item.name}</a>
                    </li>
                ))}
                <li>
                    <div className='cursor-pointer rounded-full bg-gray-600 hover:bg-red-600 px-7 py-5 text-white font-bold text-lg transition-colors duration-300'>
                        ВИЖ КОМИКС
                    </div>
                </li>
            </ul>
        </div>
    );
};

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    const toggleMenu = (): void => {
        setMenuOpen(prevState => !prevState);
    };

    const menuItems: MenuItem[] = [
        { name: 'НАЧАЛО', link: '#' },
        { name: 'ЗА НАС', link: '#' },
        { name: 'КОМИКС', link: '#' },
        { name: 'БЛОГ', link: '#' },
        { name: 'КОНТАКТИ', link: '#' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`md:px-36 py-5 px-4 sticky top-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
            <div className='flex justify-between items-center'>
                <div className='w-40'>
                    <img src="/logo.png" alt="Logo" />
                </div>
                <div className='pt-10 pr-20 hidden xl:block'>
                    <MenuItems items={menuItems} />
                </div>
                <div className='pt-10 hidden xl:block'>
                    <div className='cursor-pointer rounded-full bg-gray-600 hover:bg-red-600 px-7 py-5 text-white font-bold text-lg transition-colors duration-300'>
                        ВИЖ КОМИКС
                    </div>
                </div>
                <div className='pt-10 block xl:hidden'>
                    <button 
                        className='cursor-pointer border border-gray-300 rounded-lg px-4 py-2 text-gray-600' 
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        <FaBars size={24} />
                    </button>
                </div>
            </div>
            <MobileMenu items={menuItems} isOpen={menuOpen} />
        </nav>
    );
};

export default Navbar;
