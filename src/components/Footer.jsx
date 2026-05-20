import React from 'react';
import { Link } from 'react-router-dom';
import { FiActivity, FiFacebook, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer className="relative bg-white dark:bg-[#050B14] border-t border-slate-200 dark:border-white/5 pt-16 pb-8 overflow-hidden font-sans z-10">

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-50%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-500/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] bg-teal-500/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">

                    <div className="lg:col-span-4 flex flex-col">
                        <Link to="/" className="flex items-center gap-2.5 group w-max mb-6 outline-none">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-300">
                                <FiActivity size={20} strokeWidth={3} />
                            </div>
                            <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">MediQueue</span>
                        </Link>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8 pr-4">
                            Your trusted platform for finding the best tutors and managing learning sessions efficiently. Empowering education through seamless digital connectivity.
                        </p>
                        <div className="flex items-center gap-3">
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition-all duration-300 hover:-translate-y-1 outline-none">
                                <FiFacebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-teal-600 hover:text-white dark:hover:bg-teal-500 transition-all duration-300 hover:-translate-y-1 outline-none">
                                <FiTwitter size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-rose-600 hover:text-white dark:hover:bg-rose-500 transition-all duration-300 hover:-translate-y-1 outline-none">
                                <FiInstagram size={18} />
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-2 lg:col-start-6">
                        <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6">Services</h3>
                        <ul className="flex flex-col gap-4">
                            <li>
                                <Link to="/tutors" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 group outline-none">
                                    <FiArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-indigo-600 dark:text-indigo-400" />
                                    Find Tutors
                                </Link>
                            </li>
                            <li>
                                <Link to="/sessions" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 group outline-none">
                                    <FiArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-indigo-600 dark:text-indigo-400" />
                                    Book Sessions
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 group outline-none">
                                    <FiArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-indigo-600 dark:text-indigo-400" />
                                    Online Learning
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="lg:col-span-4 lg:col-start-9">
                        <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6">Contact Us</h3>
                        <ul className="flex flex-col gap-5">
                            <li className="flex items-start gap-3 text-sm text-slate-500 dark:text-slate-400 group">
                                <div className="mt-0.5 w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 border border-indigo-100 dark:border-indigo-500/20">
                                    <FiMail size={16} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">Email Support</span>
                                    <a href="mailto:support@mediqueue.com" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">support@mediqueue.com</a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-500 dark:text-slate-400 group">
                                <div className="mt-0.5 w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 border border-teal-100 dark:border-teal-500/20">
                                    <FiPhone size={16} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">Phone Inquiries</span>
                                    <a href="tel:+880123456789" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-medium">+880 123 456 789</a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-500 dark:text-slate-400 group">
                                <div className="mt-0.5 w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 border border-rose-100 dark:border-rose-500/20">
                                    <FiMapPin size={16} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">Headquarters</span>
                                    <span className="font-medium">Dhaka, Bangladesh</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 text-center md:text-left">
                        Copyright © {new Date().getFullYear()} - All rights reserved by <span className="font-bold text-slate-700 dark:text-slate-300">MediQueue Tutors</span>
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors outline-none">Privacy Policy</a>
                        <a href="#" className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors outline-none">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;