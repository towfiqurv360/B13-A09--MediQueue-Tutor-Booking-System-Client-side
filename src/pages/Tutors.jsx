import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useTitle from '../hooks/useTitle';
import { FiSearch, FiCalendar, FiArrowRight, FiStar, FiMail, FiPhone } from 'react-icons/fi';

const Tutors = () => {
    useTitle('Tutors');
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const fetchTutors = () => {
        setLoading(true);
        let url = `https://b13-a09-mediqueue-tutor-booking-system.onrender.com/tutors`;

        const queryParams = [];
        if (searchQuery) queryParams.push(`search=${searchQuery}`);
        if (selectedDate) queryParams.push(`date=${selectedDate}`);

        if (queryParams.length > 0) {
            url += `?${queryParams.join('&')}`;
        }

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setTutors(data);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchTutors();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchTutors();
    };

    const handleReset = () => {
        setSearchQuery('');
        setSelectedDate('');
        setLoading(true);
        fetch('https://b13-a09-mediqueue-tutor-booking-system.onrender.com/tutors')
            .then(res => res.json())
            .then(data => {
                setTutors(data);
                setLoading(false);
            });
    };

    return (
        <div className="w-full min-h-screen bg-[#F8FAFC] dark:bg-[#030712] transition-colors duration-500 font-sans relative overflow-hidden z-0">

            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute top-[-15%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-[140px]"></div>
                <div className="absolute bottom-[-15%] right-[-10%] w-[60vw] h-[60vw] bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-[140px]"></div>
            </div>

            <div className="max-w-7xl mx-auto pt-10 px-4 md:px-8 pb-20">
                <div className="flex flex-col items-center text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-light text-slate-900 dark:text-white tracking-tight mb-3">
                        Elite <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-indigo-400 dark:to-teal-400 font-bold">Mentors</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-[0.25em]">
                        Explore our global network of verified educators
                    </p>
                </div>

                <div className="flex justify-center mb-14">
                    <div className="w-full max-w-4xl bg-white/90 dark:bg-[#0B1120]/90 backdrop-blur-3xl border border-slate-200/80 dark:border-white/10 p-4 md:p-5 rounded-3xl shadow-xl shadow-slate-200/30 dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search mentor by name..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-[#111827] border border-slate-200/80 dark:border-white/5 rounded-2xl text-sm outline-none text-slate-900 dark:text-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                                />
                            </div>

                            <div className="w-full md:w-56 relative">
                                <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-[#111827] border border-slate-200/80 dark:border-white/5 rounded-2xl text-sm outline-none text-slate-900 dark:text-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium cursor-pointer"
                                />
                            </div>

                            <div className="flex gap-3 shrink-0">
                                <button type="button" onClick={handleReset} className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 rounded-2xl text-sm font-bold transition-all cursor-pointer outline-none">
                                    Reset
                                </button>
                                <button type="submit" className="px-8 py-3.5 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-indigo-600 hover:to-indigo-700 dark:from-white dark:to-slate-200 dark:hover:from-indigo-400 dark:hover:to-indigo-500 dark:text-slate-900 dark:hover:text-white text-white rounded-2xl text-sm font-bold transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 cursor-pointer outline-none">
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <span className="loading loading-spinner loading-lg text-indigo-600 dark:text-indigo-400"></span>
                    </div>
                ) : tutors.length === 0 ? (
                    <div className="text-center py-24 text-slate-500">
                        <p className="text-lg font-medium">No mentors found matching your criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {tutors.map((tutor) => (
                            <div key={tutor._id || tutor.id} className="group bg-white dark:bg-white/[0.03] rounded-[2rem] backdrop-blur-3xl border border-slate-200/80 dark:border-white/[0.08] p-4 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all duration-500 flex flex-col shadow-sm cursor-pointer">

                                <div className="w-full h-52 rounded-[1.5rem] bg-slate-100 dark:bg-[#050B14] mb-5 overflow-hidden relative border border-slate-200/50 dark:border-white/5">
                                    <img src={tutor.image} alt={tutor.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>

                                    <div className="absolute top-4 left-4 bg-white/95 dark:bg-[#030712]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 flex items-center gap-2 shadow-sm">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                        <span className="text-[10px] font-black text-slate-800 dark:text-white uppercase tracking-widest">{tutor.language || tutor.subject || 'Universal'}</span>
                                    </div>
                                </div>

                                <div className="px-2 flex-grow flex flex-col">
                                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-3 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{tutor.name}</h3>

                                    <div className="flex flex-wrap items-center gap-3 mb-5">
                                        <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-100 dark:border-amber-500/20">
                                            <FiStar size={12} className="fill-current" />
                                            <span className="text-xs font-bold">{tutor.review || tutor.rating || 0}</span>
                                        </div>
                                        <div className="text-indigo-700 dark:text-indigo-300 font-black text-xs bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-xl border border-indigo-100 dark:border-indigo-500/20">
                                            ${tutor.price || tutor.fee || 0} <span className="opacity-70 font-medium">/ session</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-6 border-t border-slate-100 dark:border-white/5 pt-5">
                                        {(tutor.tutorEmail || tutor.email) && (
                                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-white/5 px-2.5 py-1.5 rounded-lg border border-slate-200/60 dark:border-white/5 max-w-[150px] truncate">
                                                <FiMail size={12} className="text-slate-400" /> {tutor.tutorEmail || tutor.email}
                                            </span>
                                        )}
                                        {tutor.phone && (
                                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-white/5 px-2.5 py-1.5 rounded-lg border border-slate-200/60 dark:border-white/5">
                                                <FiPhone size={12} className="text-slate-400" /> {tutor.phone}
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-auto">
                                        <Link to={`/tutor/${tutor._id || tutor.id}`} className="w-full flex items-center justify-center gap-2 text-slate-700 dark:text-slate-200 bg-slate-50 hover:bg-indigo-600 hover:text-white dark:bg-white/[0.05] dark:hover:bg-indigo-500 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 border border-slate-200 dark:border-transparent outline-none group/btn cursor-pointer shadow-sm hover:shadow-md">
                                            View Profile <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tutors;