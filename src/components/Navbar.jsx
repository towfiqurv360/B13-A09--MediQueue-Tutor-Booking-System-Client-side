import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { FiSun, FiMoon, FiEdit, FiLogOut, FiX, FiUser, FiLink, FiMenu } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { user, logOut, updateUserProfile } = useContext(AuthContext);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [displayName, setDisplayName] = useState('');
    const [displayPhoto, setDisplayPhoto] = useState('');

    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName || 'User Name');
            setDisplayPhoto(user.photoURL || 'https://placehold.co/150');
        }
    }, [user]);

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
            .then(() => toast.success("Logged out successfully!"))
            .catch((err) => toast.error(err.message));
    };

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;

        updateUserProfile(name, photo)
            .then(() => {
                setDisplayName(name);
                setDisplayPhoto(photo);
                toast.success("Profile updated successfully!");
                setIsEditModalOpen(false);
            })
            .catch((err) => toast.error(err.message));
    };

    const navLinkStyles = ({ isActive }) =>
        `rounded-xl font-semibold cursor-pointer transition-all duration-300 px-4 py-2 flex items-center gap-2 ${isActive
            ? 'bg-indigo-50 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400'
            : 'text-slate-700 dark:text-slate-200 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-slate-800 dark:hover:text-indigo-400'
        }`;

    const links = (
        <>
            <li><NavLink to="/" className={navLinkStyles}>Home</NavLink></li>
            <li><NavLink to="/tutors" className={navLinkStyles}>Tutors</NavLink></li>
            {user && (
                <>
                    <li><NavLink to="/add-tutor" className={navLinkStyles}>Add Tutor</NavLink></li>
                    <li><NavLink to="/my-tutors" className={navLinkStyles}>My Tutors</NavLink></li>
                    <li><NavLink to="/my-booked-sessions" className={navLinkStyles}>My Booked Sessions</NavLink></li>
                </>
            )}
        </>
    );

    return (
        <>
            <div className="navbar bg-base-100 dark:bg-slate-900 px-4 md:px-8 shadow-sm max-w-7xl mx-auto rounded-2xl mt-2 border border-base-200 dark:border-slate-800 transition-colors duration-300">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden cursor-pointer dark:text-white px-2">
                            <FiMenu size={22} className="text-slate-700 dark:text-slate-200 hover:text-indigo-600 transition-colors" />
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow-xl bg-base-100 dark:bg-slate-800 rounded-2xl w-60 gap-1 border border-base-200 dark:border-slate-700">
                            {links}
                        </ul>
                    </div>
                    <Link to="/" className="text-2xl font-black tracking-tight text-primary dark:text-indigo-400 cursor-pointer ml-1 lg:ml-0 hover:opacity-80 transition-opacity">MediQueue</Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2">
                        {links}
                    </ul>
                </div>

                <div className="navbar-end gap-2 md:gap-4 flex items-center">
                    <button onClick={toggleTheme} className="btn btn-ghost btn-circle text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-all duration-300">
                        {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
                    </button>

                    {user ? (
                        <div className="dropdown dropdown-end z-[50]">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors p-0.5 cursor-pointer">
                                <div className="w-10 rounded-full">
                                    <img alt="User Profile" src={displayPhoto} className="object-cover" />
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-3 shadow-2xl menu menu-sm dropdown-content bg-base-100 dark:bg-slate-800 rounded-3xl w-64 border border-base-200 dark:border-slate-700 gap-2">
                                <li className="px-3 py-4 border-b border-base-200 dark:border-slate-700 pointer-events-none text-center flex flex-col items-center">
                                    <div className="avatar mb-3">
                                        <div className="w-16 h-16 rounded-full ring ring-indigo-50 dark:ring-slate-700 ring-offset-base-100 ring-offset-2">
                                            <img src={displayPhoto} alt="Profile" className="object-cover" />
                                        </div>
                                    </div>
                                    <p className="font-black text-slate-800 dark:text-slate-100 p-0 text-lg">{displayName}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 p-0 truncate w-full mt-0.5 font-medium">{user?.email}</p>
                                </li>
                                <li className="mt-2">
                                    <button onClick={() => setIsEditModalOpen(true)} className="group flex items-center gap-3 text-slate-600 dark:text-slate-300 font-semibold hover:bg-indigo-50 dark:hover:bg-slate-700 rounded-xl py-3 transition-all duration-300">
                                        <FiEdit size={16} className="text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                                        <span className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Update Profile</span>
                                    </button>
                                </li>
                                <li>
                                    <button onClick={handleLogOut} className="group flex items-center gap-3 text-slate-600 dark:text-slate-300 font-semibold hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl py-3 transition-all duration-300">
                                        <FiLogOut size={16} className="text-slate-400 group-hover:text-rose-500 transition-colors" />
                                        <span className="group-hover:text-rose-500 transition-colors">Logout</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-primary bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 border-none text-white px-7 rounded-xl font-bold shadow-md shadow-indigo-600/20 cursor-pointer">
                            Login
                        </Link>
                    )}
                </div>
            </div>

            {isEditModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md transition-opacity duration-300">
                    <div className="bg-white dark:bg-slate-900 max-w-sm w-full p-8 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 relative scale-100 transition-transform duration-300 animate-in fade-in zoom-in-95">

                        <button onClick={() => setIsEditModalOpen(false)} className="absolute top-5 right-5 text-slate-400 hover:text-rose-500 cursor-pointer transition-colors bg-slate-50 dark:bg-slate-800 p-2 rounded-full">
                            <FiX size={18} />
                        </button>

                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">Edit Profile</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Update your personal information</p>
                        </div>

                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <div className="form-control">
                                <label className="label pt-0 pb-1.5">
                                    <span className="label-text font-bold text-slate-700 dark:text-slate-300 text-xs uppercase tracking-wider">Display Name</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                        <FiUser size={16} />
                                    </span>
                                    <input type="text" name="name" defaultValue={displayName} placeholder="Your Name" className="input input-bordered w-full pl-11 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/80 focus:border-indigo-500 focus:ring-0 text-slate-800 dark:text-slate-200 rounded-2xl transition-colors" required />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label pt-0 pb-1.5">
                                    <span className="label-text font-bold text-slate-700 dark:text-slate-300 text-xs uppercase tracking-wider">Photo URL</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                        <FiLink size={16} />
                                    </span>
                                    <input type="url" name="photo" defaultValue={displayPhoto} placeholder="Image URL" className="input input-bordered w-full pl-11 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/80 focus:border-indigo-500 focus:ring-0 text-slate-800 dark:text-slate-200 rounded-2xl transition-colors" required />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 border-none text-white font-bold rounded-2xl mt-3 shadow-lg shadow-indigo-600/20 cursor-pointer transition-all">
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