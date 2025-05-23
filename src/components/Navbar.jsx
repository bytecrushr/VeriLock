import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSidebarHam } from "../redux/slice/uiSlice";

const Navbar = ({ path, display }) => {
    const { sidebarHam } = useSelector((state) => state.ui);
    const dispatch = useDispatch();

    return (
        <nav className="flex items-center justify-between sm:justify-start w-full h-[66px] px-4 sm:px-6 bg-gray-950/90 backdrop-blur-md shadow-md border-b border-gray-800">
            {/* Hamburger Menu */}
            <button
                onClick={() => dispatch(setSidebarHam(true))}
                className={`sm:hidden ${display} p-2 rounded-md hover:bg-gray-800 transition`}
                aria-label="Open Menu"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.6}
                >
                    <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {/* Logo and Brand */}
            <div className="flex items-center gap-3 ml-2 sm:ml-4">
                <img src={path} alt="Logo" className="w-10 h-10 rounded-md object-cover" />
                <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                    VeriLock
                </h1>
            </div>
        </nav>
    );
};

export default Navbar;
