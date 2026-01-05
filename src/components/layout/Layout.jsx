import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = () => {
    const location = useLocation();

    // Decide whether to show sidebar (only on trip-specific pages)
    const isTripPage = location.pathname.includes('/trip/');

    return (
        <div className={`app-layout ${isTripPage ? 'has-sidebar' : ''}`}>
            <Navbar />
            <div className="main-content">
                {isTripPage && <Sidebar />}
                <main className={`page-content ${isTripPage ? 'with-sidebar' : ''}`}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
