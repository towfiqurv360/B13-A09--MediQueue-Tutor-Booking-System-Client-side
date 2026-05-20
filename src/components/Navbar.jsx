import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { FiSun, FiMoon, FiEdit, FiLogOut, FiX, FiUser, FiLink, FiMenu, FiHome, FiUsers, FiPlusCircle, FiList, FiBookmark, FiActivity } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { user, logOut, updateUserProfile } = useContext(AuthContext);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);

    const [displayName, setDisplayName] = useState('');
    const [displayPhoto, setDisplayPhoto] = useState('https://placehold.co/150');

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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success("Logged out successfully!");
                setIsProfileOpen(false);
            })
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

    const closeMobileMenu = () => {
        const elem = document.activeElement;
        if (elem) {
            elem?.blur();
        }
    };

    const navLinkStyles = ({ isActive }) =>
        `relative group font-bold text-sm tracking-wide transition-all duration-300 flex items-center gap-2.5 px-2 py-2 hover:-translate-y-1 outline-none ${isActive
            ? 'text-indigo-600 dark:text-indigo-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2.5px] after:bg-indigo-600 dark:after:bg-indigo-400 after:rounded-full'
            : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2.5px] after:bg-indigo-600 dark:after:bg-indigo-400 hover:after:w-full after:transition-all after:duration-300 after:rounded-full'
        }`;

    const iconStyles = "transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110";

    const links = (
        <>
            <li><NavLink to="/" onClick={closeMobileMenu} className={navLinkStyles}><FiHome size={16} className={iconStyles} /> Home</NavLink></li>
            <li><NavLink to="/tutors" onClick={closeMobileMenu} className={navLinkStyles}><FiUsers size={16} className={iconStyles} /> Tutors</NavLink></li>
            {user && (
                <>
                    <li><NavLink to="/add-tutor" onClick={closeMobileMenu} className={navLinkStyles}><FiPlusCircle size={16} className={iconStyles} /> Add Tutor</NavLink></li>
                    <li><NavLink to="/my-tutors" onClick={closeMobileMenu} className={navLinkStyles}><FiList size={16} className={iconStyles} /> My Tutors</NavLink></li>
                    <li><NavLink to="/sessions" onClick={closeMobileMenu} className={navLinkStyles}><FiBookmark size={16} className={iconStyles} /> Sessions</NavLink></li>
                </>
            )}
        </>
    );

    return (
        <>
            <div className="sticky top-0 z-[100] bg-white/70 dark:bg-[#030712]/70 backdrop-blur-2xl border-b border-slate-200/50 dark:border-white/[0.05] transition-colors duration-500">
                <div className="navbar max-w-7xl mx-auto px-4 md:px-8 h-20">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden dark:text-white px-2 outline-none">
                                <FiMenu size={24} className="text-slate-800 dark:text-slate-200" />
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[50] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-none bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-3xl rounded-3xl w-64 gap-3 border border-slate-200 dark:border-white/10">
                                {links}
                            </ul>
                        </div>
                        <Link to="/" className="flex items-center gap-2.5 group ml-1 lg:ml-0 outline-none">
                            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-tr from-indigo-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-300">
                                <FiActivity size={18} strokeWidth={3} />
                            </div>
                            <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">MediQueue</span>
                        </Link>
                    </div>

                    <div className="navbar-center hidden lg:flex h-full">
                        <ul className="flex items-center gap-6 h-full">
                            {links}
                        </ul>
                    </div>

                    <div className="navbar-end gap-3 md:gap-4 flex items-center">
                        <button onClick={toggleTheme} className="relative w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-white/10 transition-colors duration-300 cursor-pointer overflow-hidden group outline-none border border-transparent dark:border-white/5">
                            <div className={`absolute transition-all duration-500 transform ${theme === 'light' ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-10 opacity-0 rotate-90'}`}>
                                <FiMoon size={18} className="group-hover:scale-110 transition-transform" />
                            </div>
                            <div className={`absolute transition-all duration-500 transform ${theme === 'dark' ? 'translate-y-0 opacity-100 rotate-0' : '-translate-y-10 opacity-0 -rotate-90'}`}>
                                <FiSun size={18} className="group-hover:scale-110 transition-transform" />
                            </div>
                        </button>

                        {user ? (
                            <div className="relative" ref={profileRef}>
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors cursor-pointer overflow-hidden outline-none flex-shrink-0 bg-slate-100 dark:bg-slate-800"
                                >
                                    <img alt="profile" src={displayPhoto} className="object-cover w-full h-full aspect-square" />
                                </button>

                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-4 z-[100] w-64 bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-3xl rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-none border border-slate-200 dark:border-white/10 overflow-hidden transform origin-top-right transition-all">
                                        <div className="px-4 py-5 border-b border-slate-100 dark:border-white/5 text-center flex flex-col items-center">
                                            <div className="w-16 h-16 shrink-0 rounded-full border border-slate-200 dark:border-white/10 mb-3 overflow-hidden bg-slate-100 dark:bg-slate-800 p-0.5">
                                                <img src={displayPhoto} alt="profile" className="object-cover w-full h-full aspect-square rounded-full" />
                                            </div>
                                            <p className="font-black text-slate-900 dark:text-white text-base truncate w-full">{displayName}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium truncate w-full px-2">{user?.email}</p>
                                        </div>
                                        <div className="p-2">
                                            <button onClick={() => { setIsEditModalOpen(true); setIsProfileOpen(false); }} className="w-full flex items-center gap-2.5 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl py-3 px-3 transition-colors cursor-pointer outline-none text-xs">
                                                <FiEdit size={14} className="text-indigo-600 dark:text-indigo-400" />
                                                Update Profile
                                            </button>
                                            <button onClick={handleLogOut} className="w-full flex items-center gap-2.5 text-rose-600 dark:text-rose-400 font-bold hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl py-3 px-3 transition-colors cursor-pointer outline-none text-xs">
                                                <FiLogOut size={14} />
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="bg-slate-900 hover:bg-indigo-600 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 text-white px-6 py-2 rounded-full font-bold shadow-sm transition-colors duration-300 cursor-pointer outline-none text-sm">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {isEditModalOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/40 dark:bg-[#030712]/80 backdrop-blur-sm transition-opacity duration-300">
                    <div className="bg-white dark:bg-[#0B1120] max-w-sm w-full p-8 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-white/10 relative">

                        <button onClick={() => setIsEditModalOpen(false)} className="absolute top-5 right-5 text-slate-400 hover:text-rose-500 bg-slate-50 dark:bg-white/5 hover:bg-rose-50 dark:hover:bg-rose-500/10 p-2 rounded-full transition-colors cursor-pointer outline-none">
                            <FiX size={16} />
                        </button>

                        <div className="text-center mb-6">
                            <h3 className="text-xl font-black text-slate-900 dark:text-white">Edit Profile</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-medium">Update your display name and photo</p>
                        </div>

                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <div className="form-control">
                                <label className="label pt-0 pb-1.5">
                                    <span className="label-text font-bold text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-widest">Display Name</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                                        <FiUser size={16} />
                                    </span>
                                    <input type="text" name="name" defaultValue={displayName} placeholder="Your Name" className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 focus:border-indigo-500 text-slate-900 dark:text-white rounded-xl outline-none transition-colors text-sm" required />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label pt-0 pb-1.5">
                                    <span className="label-text font-bold text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-widest">Photo URL</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                                        <FiLink size={16} />
                                    </span>
                                    <input type="url" name="photo" defaultValue={displayPhoto} placeholder="Image URL" className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 focus:border-indigo-500 text-slate-900 dark:text-white rounded-xl outline-none transition-colors text-sm" required />
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-slate-900 hover:bg-indigo-600 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 text-white font-bold rounded-xl mt-2 py-3 shadow-sm transition-colors duration-300 outline-none text-sm">
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