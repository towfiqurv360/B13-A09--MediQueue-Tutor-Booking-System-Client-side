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
        `relative group font-bold text-sm tracking-wide transition-all duration-300 flex items-center gap-2.5 px-2 py-2 hover:-translate-y-1 ${isActive
            ? 'text-indigo-600 dark:text-indigo-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2.5px] after:bg-indigo-600 dark:after:bg-indigo-400 after:rounded-full'
            : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2.5px] after:bg-indigo-600 dark:after:bg-indigo-400 hover:after:w-full after:transition-all after:duration-300 after:rounded-full'
        }`;

    const iconStyles = "transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110";

    const links = (
        <>
            <li><NavLink to="/" onClick={closeMobileMenu} className={navLinkStyles}><FiHome size={18} className={iconStyles} /> Home</NavLink></li>
            <li><NavLink to="/tutors" onClick={closeMobileMenu} className={navLinkStyles}><FiUsers size={18} className={iconStyles} /> Tutors</NavLink></li>
            {user && (
                <>
                    <li><NavLink to="/add-tutor" onClick={closeMobileMenu} className={navLinkStyles}><FiPlusCircle size={18} className={iconStyles} /> Add Tutor</NavLink></li>
                    <li><NavLink to="/my-tutors" onClick={closeMobileMenu} className={navLinkStyles}><FiList size={18} className={iconStyles} /> My Tutors</NavLink></li>
                    <li><NavLink to="/my-booked-sessions" onClick={closeMobileMenu} className={navLinkStyles}><FiBookmark size={18} className={iconStyles} /> Sessions</NavLink></li>
                </>
            )}
        </>
    );

    return (
        <>
            <div className="sticky top-0 z-[100] bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300">
                <div className="navbar max-w-7xl mx-auto px-4 md:px-8 h-20">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden dark:text-white px-2 outline-none">
                                <FiMenu size={24} className="text-slate-800 dark:text-slate-200" />
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[50] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-white dark:bg-slate-900 rounded-3xl w-64 gap-3 border border-slate-100 dark:border-slate-800">
                                {links}
                            </ul>
                        </div>
                        <Link to="/" className="flex items-center gap-2.5 group ml-1 lg:ml-0 outline-none">
                            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                                <FiActivity size={20} strokeWidth={3} />
                            </div>
                            <span className="text-2xl md:text-3xl font-black tracking-tighter bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">MediQueue</span>
                        </Link>
                    </div>

                    <div className="navbar-center hidden lg:flex h-full">
                        <ul className="flex items-center gap-4 h-full">
                            {links}
                        </ul>
                    </div>

                    <div className="navbar-end gap-3 md:gap-5 flex items-center">

                        <button onClick={toggleTheme} className="relative w-11 h-11 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-slate-700 transition-all duration-300 cursor-pointer overflow-hidden group outline-none">
                            <div className={`absolute transition-all duration-500 transform ${theme === 'light' ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-10 opacity-0 rotate-90'}`}>
                                <FiMoon size={20} className="group-hover:scale-110 transition-transform" />
                            </div>
                            <div className={`absolute transition-all duration-500 transform ${theme === 'dark' ? 'translate-y-0 opacity-100 rotate-0' : '-translate-y-10 opacity-0 -rotate-90'}`}>
                                <FiSun size={20} className="group-hover:scale-110 transition-transform" />
                            </div>
                        </button>

                        {user ? (
                            <div className="relative" ref={profileRef}>
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="w-11 h-11 rounded-full border-2 border-transparent hover:border-indigo-500 transition-all cursor-pointer overflow-hidden outline-none flex-shrink-0 bg-slate-100 dark:bg-slate-800"
                                >
                                    <img alt="profile" src={displayPhoto} className="object-cover w-full h-full aspect-square hover:scale-110 transition-transform duration-300" />
                                </button>

                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-4 z-[100] w-72 bg-white dark:bg-slate-900 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-slate-100 dark:border-slate-800 overflow-hidden transform origin-top-right transition-all">
                                        <div className="px-4 py-6 border-b border-slate-100 dark:border-slate-800 text-center flex flex-col items-center">
                                            <div className="w-20 h-20 shrink-0 rounded-full ring-4 ring-indigo-50 dark:ring-slate-800 mb-3 overflow-hidden bg-slate-100 dark:bg-slate-800">
                                                <img src={displayPhoto} alt="profile" className="object-cover w-full h-full aspect-square" />
                                            </div>
                                            <p className="font-black text-slate-900 dark:text-white text-xl">{displayName}</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium truncate w-full px-4">{user?.email}</p>
                                        </div>
                                        <div className="p-2">
                                            <button onClick={() => { setIsEditModalOpen(true); setIsProfileOpen(false); }} className="w-full flex items-center gap-3 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl py-3.5 px-4 transition-all cursor-pointer outline-none group">
                                                <FiEdit size={18} className="text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
                                                Update Profile
                                            </button>
                                            <button onClick={handleLogOut} className="w-full flex items-center gap-3 text-rose-600 dark:text-rose-400 font-bold hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-2xl py-3.5 px-4 transition-all cursor-pointer outline-none group">
                                                <FiLogOut size={18} className="group-hover:translate-x-1 transition-transform" />
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="bg-slate-900 hover:bg-indigo-600 dark:bg-white dark:text-slate-900 dark:hover:bg-indigo-400 dark:hover:text-white text-white px-7 py-2.5 rounded-full font-bold shadow-lg shadow-slate-900/20 dark:shadow-white/10 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 cursor-pointer outline-none">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {isEditModalOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300">
                    <div className="bg-white dark:bg-slate-900 max-w-sm w-full p-8 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 relative scale-100 transition-transform duration-300">

                        <button onClick={() => setIsEditModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-rose-500 bg-slate-50 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-500/10 p-2.5 rounded-full transition-colors cursor-pointer outline-none hover:rotate-90 duration-300">
                            <FiX size={18} />
                        </button>

                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Edit Profile</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">Update your display name and photo</p>
                        </div>

                        <form onSubmit={handleUpdateProfile} className="space-y-5">
                            <div className="form-control">
                                <label className="label pt-0 pb-2">
                                    <span className="label-text font-bold text-slate-700 dark:text-slate-300 text-[11px] uppercase tracking-widest">Display Name</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                        <FiUser size={18} />
                                    </span>
                                    <input type="text" name="name" defaultValue={displayName} placeholder="Your Name" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-white rounded-2xl outline-none transition-all font-medium" required />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label pt-0 pb-2">
                                    <span className="label-text font-bold text-slate-700 dark:text-slate-300 text-[11px] uppercase tracking-widest">Photo URL</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                        <FiLink size={18} />
                                    </span>
                                    <input type="url" name="photo" defaultValue={displayPhoto} placeholder="Image URL" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-white rounded-2xl outline-none transition-all font-medium" required />
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-slate-900 hover:bg-indigo-600 dark:bg-white dark:text-slate-900 dark:hover:bg-indigo-400 dark:hover:text-white text-white font-bold rounded-2xl mt-4 py-4 shadow-xl hover:-translate-y-1 hover:shadow-indigo-500/20 cursor-pointer transition-all duration-300 tracking-wide outline-none">
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