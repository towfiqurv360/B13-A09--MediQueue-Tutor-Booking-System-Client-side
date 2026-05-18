import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { FaSun, FaMoon, FaEdit, FaSignOutAlt, FaTimes, FaUser, FaLink } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { user, logOut, updateUserProfile } = useContext(AuthContext);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.setAttribute('data-theme', 'light');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const handleLogOut = () => {
        logOut()
            .then(() => toast.info("Logged out successfully"))
            .catch((err) => console.log(err));
    };

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;

        updateUserProfile(name, photo)
            .then(() => {
                toast.success("Profile updated successfully!");
                setIsEditModalOpen(false);
                window.location.reload();
            })
            .catch((err) => toast.error(err.message));
    };

    const links = (
        <>
            <li><NavLink to="/" className="rounded-xl font-semibold cursor-pointer dark:text-slate-200">Home</NavLink></li>
            <li><NavLink to="/tutors" className="rounded-xl font-semibold cursor-pointer dark:text-slate-200">Tutors</NavLink></li>
            {user && (
                <>
                    <li><NavLink to="/add-tutor" className="rounded-xl font-semibold cursor-pointer dark:text-slate-200">Add Tutor</NavLink></li>
                    <li><NavLink to="/my-tutors" className="rounded-xl font-semibold cursor-pointer dark:text-slate-200">My Tutors</NavLink></li>
                    <li><NavLink to="/my-booked-sessions" className="rounded-xl font-semibold cursor-pointer dark:text-slate-200">My Booked Sessions</NavLink></li>
                </>
            )}
        </>
    );

    return (
        <>
            <div className="navbar bg-base-100 dark:bg-slate-900 px-4 md:px-8 shadow-sm max-w-7xl mx-auto rounded-2xl mt-2 border border-base-200 dark:border-slate-800 transition-colors duration-300">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden cursor-pointer dark:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow-xl bg-base-100 dark:bg-slate-800 rounded-2xl w-52 gap-1 border border-base-200 dark:border-slate-700">
                            {links}
                        </ul>
                    </div>
                    <Link to="/" className="text-2xl font-black tracking-tight text-primary dark:text-indigo-400 cursor-pointer">MediQueue</Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2">
                        {links}
                    </ul>
                </div>

                <div className="navbar-end gap-2 md:gap-4 flex items-center">
                    <button onClick={toggleTheme} className="btn btn-ghost btn-circle text-slate-600 dark:text-slate-300 hover:bg-base-200 dark:hover:bg-slate-800 transition-colors">
                        {theme === 'light' ? <FaMoon size={18} /> : <FaSun size={18} />}
                    </button>

                    {user ? (
                        <div className="dropdown dropdown-end z-[50]">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online border-2 border-primary/20 dark:border-indigo-500/30 hover:border-primary/50 transition-all p-0.5 cursor-pointer">
                                <div className="w-10 rounded-full">
                                    <img alt="User Profile" src={user?.photoURL || "https://placehold.co/150"} />
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-3 shadow-2xl menu menu-sm dropdown-content bg-base-100 dark:bg-slate-800 rounded-2xl w-60 border border-base-200 dark:border-slate-700 gap-2">
                                <li className="px-3 py-3 border-b border-base-200 dark:border-slate-700 pointer-events-none">
                                    <p className="font-black text-slate-800 dark:text-slate-100 p-0 text-base">{user?.displayName || 'User Name'}</p>
                                    <p className="text-xs text-slate-400 dark:text-slate-400 p-0 truncate w-full mt-1">{user?.email}</p>
                                </li>
                                <li className="mt-2">
                                    <button onClick={() => setIsEditModalOpen(true)} className="flex items-center gap-3 text-slate-600 dark:text-slate-300 font-semibold hover:bg-base-200 dark:hover:bg-slate-700 rounded-xl py-2.5">
                                        <FaEdit size={16} className="text-primary dark:text-indigo-400" /> Update Profile
                                    </button>
                                </li>
                                <li>
                                    <button onClick={handleLogOut} className="flex items-center gap-3 text-rose-600 dark:text-rose-400 font-semibold hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl py-2.5">
                                        <FaSignOutAlt size={16} /> Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-primary bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 border-none text-white px-6 rounded-xl font-bold shadow-md shadow-indigo-600/20 cursor-pointer">
                            Login
                        </Link>
                    )}
                </div>
            </div>

            {isEditModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300">
                    <div className="bg-white dark:bg-slate-900 max-w-sm w-full p-8 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 relative scale-100 transition-transform duration-300 animate-in fade-in zoom-in-95">

                        <button onClick={() => setIsEditModalOpen(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors">
                            <FaTimes size={18} />
                        </button>

                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">Edit Profile</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Update your personal information</p>
                        </div>

                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <div className="form-control">
                                <label className="label pt-0 pb-1">
                                    <span className="label-text font-bold text-slate-700 dark:text-slate-300 text-xs uppercase tracking-wider">Name</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                        <FaUser size={14} />
                                    </span>
                                    <input type="text" name="name" defaultValue={user?.displayName} placeholder="Your Name" className="input input-bordered w-full pl-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-xl" required />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label pt-0 pb-1">
                                    <span className="label-text font-bold text-slate-700 dark:text-slate-300 text-xs uppercase tracking-wider">Photo URL</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                        <FaLink size={14} />
                                    </span>
                                    <input type="url" name="photo" defaultValue={user?.photoURL} placeholder="Image URL" className="input input-bordered w-full pl-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-xl" required />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary w-full bg-gradient-to-r from-indigo-600 to-violet-600 border-none text-white font-bold rounded-xl mt-2 shadow-lg shadow-indigo-600/20 cursor-pointer">
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;