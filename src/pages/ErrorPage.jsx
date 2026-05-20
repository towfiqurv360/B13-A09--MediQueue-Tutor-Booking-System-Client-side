import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import useTitle from '../hooks/useTitle';

const ErrorPage = () => {
    useTitle('404 - Page Not Found');

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#030712] flex items-center justify-center p-4 relative overflow-hidden font-sans z-0">

            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute bottom-[-10%] left-[50%] -translate-x-1/2 w-[120vw] h-[40vh] bg-blue-500/10 dark:bg-blue-500/5 rounded-t-[100%] blur-[80px]"></div>
            </div>

            <div className="bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-3xl border border-slate-200/50 dark:border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)] text-center max-w-lg w-full relative">

                <div className="relative w-full h-48 mx-auto mb-8 flex flex-col items-center justify-end overflow-hidden">

                    <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 flex flex-col items-center animate-[bounce_3s_ease-in-out_infinite]">
                        <div className="w-[2px] h-28 bg-slate-400 dark:bg-slate-600"></div>

                        <div className="w-6 h-6 border-b-[3px] border-l-[3px] border-slate-500 dark:border-slate-400 rounded-bl-full -ml-5 -mt-1 transform rotate-12"></div>

                        <div className="absolute top-28 -right-14 flex flex-col items-center rotate-[15deg]">
                            <div className="animate-pulse flex items-center justify-center relative">
                                <span className="text-6xl drop-shadow-xl filter grayscale-[20%]">🐟</span>
                                <span className="absolute z-10 text-xl font-black text-white bg-rose-500 px-2 py-0.5 rounded-lg border-2 border-white/50 -rotate-12 shadow-lg tracking-wider">
                                    404
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-6xl z-10 animate-[bounce_4s_ease-in-out_infinite] drop-shadow-lg">
                        🛶
                    </div>

                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-10 bg-blue-400/20 dark:bg-blue-500/20 rounded-[100%] blur-md animate-pulse"></div>
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-3">
                    Oops! Caught a <span className="text-rose-500">404</span>
                </h1>
                <h2 className="text-lg md:text-xl font-bold text-slate-700 dark:text-slate-300 mb-4">
                    Looks like this page swam away!
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 font-medium leading-relaxed">
                    The page you are looking for has drifted into deep waters. Let us guide you back to the shore.
                </p>

                <Link to="/" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-indigo-600 hover:to-indigo-700 dark:from-white dark:to-slate-200 dark:hover:from-indigo-400 dark:hover:to-indigo-500 dark:text-slate-900 dark:hover:text-white text-white rounded-2xl text-sm font-bold transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 outline-none cursor-pointer">
                    <FiHome size={18} /> Return Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;