import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import {
    HiCalendar, HiCurrencyDollar, HiBriefcase,
    HiMap, HiTicket, HiDocumentText
} from 'react-icons/hi';
import './Sidebar.css';

const Sidebar = () => {
    const { id } = useParams(); // trip id

    const navItems = [
        { name: 'Day Planner', path: `/trip/${id}/plan`, icon: <HiCalendar /> },
        { name: 'Budget', path: `/trip/${id}/budget`, icon: <HiCurrencyDollar /> },
        { name: 'Packing List', path: `/trip/${id}/packing`, icon: <HiBriefcase /> },
        { name: 'Map View', path: `/trip/${id}/map`, icon: <HiMap /> },
        { name: 'Bookings', path: `/trip/${id}/bookings`, icon: <HiTicket /> },
        { name: 'Summary', path: `/trip/${id}/summary`, icon: <HiDocumentText /> },
    ];

    return (
        <aside className="sidebar glass slide-in">
            <div className="sidebar-header">
                <h3>Trip Planning</h3>
            </div>
            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => isActive ? 'side-link active' : 'side-link'}
                    >
                        <span className="icon">{item.icon}</span>
                        <span className="name">{item.name}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
