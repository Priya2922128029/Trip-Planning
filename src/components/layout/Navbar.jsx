import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { HiMenu, HiX, HiSearch, HiUserCircle, HiCog } from 'react-icons/hi';
import { useTrips } from '../../context/TripContext';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { settings } = useTrips();

    return (
        <nav className="navbar glass">
            <div className="container flex justify-between align-center">
                <Link to="/" className="logo flex align-center">
                    <span className="logo-icon">✈️</span>
                    <span className="logo-text">TravelPlanner</span>
                </Link>

                {/* Desktop Links */}
                <div className="nav-links flex align-center">
                    <NavLink to="/" end>Home</NavLink>
                    <NavLink to="/destinations">Destinations</NavLink>
                    <NavLink to="/profile">My Trips</NavLink>

                    <div className="nav-icons flex align-center">
                        <Link to="/profile" title="Profile"><HiUserCircle size={24} /></Link>
                        <Link to="/settings" title="Settings"><HiCog size={24} /></Link>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="mobile-menu glass fade-in">
                    <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
                    <NavLink to="/destinations" onClick={() => setIsOpen(false)}>Destinations</NavLink>
                    <NavLink to="/profile" onClick={() => setIsOpen(false)}>My Trips</NavLink>
                    <NavLink to="/settings" onClick={() => setIsOpen(false)}>Settings</NavLink>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
