"use client";
import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface MenuItem {
    name: string;
    link: string;
}

interface MenuItemsProps {
    items: MenuItem[];
    onItemClick: (link: string) => void;
}

interface MobileMenuProps {
    items: MenuItem[];
    isOpen: boolean;
    onItemClick: (link: string) => void;
}

const MenuItems: React.FC<MenuItemsProps> = ({ items, onItemClick }) => {
    return (
        <ul className='flex gap-10 font-medium text-gray-600 text-2xl'>
            {items.map((item, index) => (
                <li
                    key={index}
                    className='transition transform hover:-translate-y-1 hover:text-red-600 cursor-pointer'
                    onClick={() => onItemClick(item.link)}
                >
                    {item.name}
                </li>
            ))}
        </ul>
    );
};

const MobileMenu: React.FC<MobileMenuProps> = ({ items, isOpen, onItemClick }) => {
    return (
        <div className={`xl:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
            <ul className='flex flex-col items-center gap-4 py-4 font-medium text-gray-600 text-lg'>
                {items.map((item, index) => (
                    <li key={index} className='cursor-pointer' onClick={() => onItemClick(item.link)}>
                        {item.name}
                    </li>
                ))}
                <li>
                    <a href='https://issuu.com/averite/docs/1' target='_blank'>
                        <div className='cursor-pointer rounded-full bg-gray-600 hover:bg-red-600 px-7 py-5 text-white font-bold text-lg transition-colors duration-300'>
                            ВИЖ КОМИКС
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    );
};

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [lastScrollY, setLastScrollY] = useState<number>(0);
    const [isVisible, setIsVisible] = useState<boolean>(true);

    const toggleMenu = (): void => {
        setMenuOpen(prevState => !prevState);
    };

    const menuItems: MenuItem[] = [
        { name: 'НАЧАЛО', link: '/' },
        { name: 'ЗА НАС', link: '#whoweare' },
        { name: 'ТРЕЙЛЪР', link: '#trailer' },
        { name: 'БЛОГ', link: '/blog' },
        { name: 'КОНТАКТИ', link: '#footer' },
    ];

    const handleMenuItemClick = (link: string): void => {
        setMenuOpen(false);
        if (link.startsWith('#')) {
            const targetElement = document.querySelector(link);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.location.href = link;
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
            setIsScrolled(currentScrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <motion.nav
            initial={{ y: 0 }}
            animate={{ y: isVisible ? 0 : -480 }}
            transition={{ duration: 0.5 }}
            className={`md:px-36 py-5 px-4 sticky top-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}
        >
            <div className='flex justify-between items-center'>
                <a href='/'>
                    <div className='w-40'>
                        <img src="/logo.png" alt="Logo" />
                    </div>
                </a>
                <div className='pt-10 pr-20 hidden xl:block'>
                    <MenuItems items={menuItems} onItemClick={handleMenuItemClick} />
                </div>
                <div className='pt-10 hidden xl:block'>
                    <a href='https://issuu.com/averite/docs/1' target='_blank'>
                        <div className='cursor-pointer rounded-full bg-gray-600 hover:bg-red-600 px-7 py-5 text-white font-bold text-lg transition-colors duration-300'>
                            ВИЖ КОМИКС
                        </div>
                    </a>
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
            <MobileMenu items={menuItems} isOpen={menuOpen} onItemClick={handleMenuItemClick} />
        </motion.nav>
    );
};

export default Navbar;