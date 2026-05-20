import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiGlobe, FiStar, FiArrowRight, FiSearch, FiSliders, FiInbox } from 'react-icons/fi';
import useTitle from '../hooks/useTitle';

const Tutors = () => {
    const [allTutors, setAllTutors] = useState([]);
    const [filteredTutors, setFilteredTutors] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchText, setSearchText] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    useTitle("Find Tutors");

    useEffect(() => {
        fetch('http://localhost:5000/tutors')
            .then(res => res.json())
            .then(data => {
                setAllTutors(data);
                setFilteredTutors(data);
                setLoading(false);
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        let result = allTutors;

        if (searchText) {
            const lowerSearch = searchText.toLowerCase();
            result = result.filter(tutor =>
                tutor.name.toLowerCase().includes(lowerSearch) ||
                tutor.language.toLowerCase().includes(lowerSearch)
            );
        }

        if (selectedLanguage) {
            result = result.filter(tutor => tutor.language === selectedLanguage);
        }

        setFilteredTutors(result);
    }, [searchText, selectedLanguage, allTutors]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#030712]">
                <span className="loading loading-spinner loading-md text-indigo-600 dark:text-indigo-400"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4 md:px-8 bg-[#F8FAFC] dark:bg-[#030712] transition-colors duration-500 font-sans relative overflow-hidden z-0">

            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden hidden dark:block">
                <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-indigo-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-teal-500/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-7xl mx-auto pt-6">

                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 dark:text-white tracking-tight mb-4">
                        Discover your <span className="font-serif italic text-indigo-600 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-indigo-400 dark:to-teal-400 font-bold tracking-normal pr-1">Mentor</span>
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                        Navigate through our strictly verified global network of expert educators. Select your preferred parameters to initiate your cognitive expansion.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto mb-14 bg-white/60 dark:bg-white/[0.02] backdrop-blur-2xl p-3 md:p-4 rounded-[2rem] shadow-lg shadow-slate-200/40 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] border border-slate-200/80 dark:border-white/[0.08] flex flex-col md:flex-row items-center gap-3 md:gap-4 transition-all">

                    <div className="relative w-full md:w-2/5 flex items-center bg-slate-50 dark:bg-black/20 rounded-[1.5rem] border border-slate-200/50 dark:border-white/5 overflow-hidden">
                        <div className="pl-4 pr-2 text-indigo-500 dark:text-indigo-400">
                            <FiSliders size={16} />
                        </div>
                        <select
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                            className="w-full bg-transparent border-none focus:ring-0 text-slate-700 dark:text-slate-300 text-sm font-semibold py-4 pr-4 cursor-pointer outline-none appearance-none"
                        >
                            <option value="" className="bg-white dark:bg-slate-900">All Languages</option>
                            <option value="English" className="bg-white dark:bg-slate-900">English</option>
                            <option value="Spanish" className="bg-white dark:bg-slate-900">Spanish</option>
                            <option value="French" className="bg-white dark:bg-slate-900">French</option>
                            <option value="German" className="bg-white dark:bg-slate-900">German</option>
                            <option value="Japanese" className="bg-white dark:bg-slate-900">Japanese</option>
                            <option value="Arabic" className="bg-white dark:bg-slate-900">Arabic</option>
                        </select>
                    </div>

                    <div className="relative w-full md:w-3/5 flex items-center bg-slate-50 dark:bg-black/20 rounded-[1.5rem] border border-slate-200/50 dark:border-white/5 overflow-hidden focus-within:border-indigo-500/50 dark:focus-within:border-indigo-500/50 transition-colors">
                        <span className="pl-4 pr-2 text-slate-400">
                            <FiSearch size={16} />
                        </span>
                        <input
                            type="text"
                            placeholder="Search by educator name or language..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="w-full bg-transparent border-none focus:ring-0 text-slate-700 dark:text-white text-sm font-medium py-4 pr-4 outline-none placeholder:text-slate-400/70"
                        />
                    </div>
                </div>

                {filteredTutors.length === 0 ? (
                    <div className="text-center py-20 bg-white/40 dark:bg-white/[0.02] backdrop-blur-xl rounded-[2.5rem] border border-slate-200/60 dark:border-white/[0.05] shadow-sm max-w-2xl mx-auto">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-slate-200 dark:border-white/10">
                            <FiInbox size={24} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">No educators found</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium max-w-xs mx-auto mb-6">
                            We couldn't find any mentor matching your specific parameters. Please adjust your criteria.
                        </p>
                        <button
                            onClick={() => { setSearchText(''); setSelectedLanguage(''); }}
                            className="bg-slate-900 dark:bg-white text-white dark:text-[#030712] hover:scale-105 transition-transform duration-300 font-bold text-xs px-6 py-3 rounded-xl shadow-md outline-none cursor-pointer"
                        >
                            Reset Parameters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredTutors.map(tutor => (
                            <div key={tutor._id} className="group bg-white dark:bg-white/[0.04] rounded-[1.5rem] backdrop-blur-2xl border border-slate-200/80 dark:border-white/[0.08] p-3 hover:-translate-y-1 transition-transform duration-300 flex flex-col shadow-sm hover:shadow-xl shadow-slate-200/30 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">

                                <div className="w-full aspect-[4/3] rounded-[1.2rem] bg-slate-100 dark:bg-[#050B14] mb-4 overflow-hidden relative border border-slate-200/50 dark:border-white/5">
                                    <img
                                        src={tutor.image}
                                        alt={tutor.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80"></div>

                                    <div className="absolute top-3 right-3 bg-white/95 dark:bg-[#030712]/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-200 dark:border-white/10 flex items-center gap-1.5 shadow-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></div>
                                        <span className="text-[9px] font-bold text-slate-800 dark:text-white uppercase tracking-widest">{tutor.language || 'Universal'}</span>
                                    </div>
                                </div>

                                <div className="px-2 flex flex-col flex-grow">
                                    <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight mb-2 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                        {tutor.name}
                                    </h3>

                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-100 dark:border-amber-500/20">
                                            <FiStar size={10} className="fill-current" />
                                            <span className="text-[11px] font-bold">{tutor.review || 0}</span>
                                        </div>
                                        <div className="text-indigo-600 dark:text-indigo-400 font-bold text-[11px] bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-500/20">
                                            ${tutor.price} <span className="opacity-70 font-medium">/ session</span>
                                        </div>
                                    </div>

                                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-5 font-medium leading-relaxed flex-grow">
                                        {tutor.description}
                                    </p>

                                    <div className="mt-auto">
                                        <Link
                                            to={`/tutor/${tutor._id}`}
                                            className="w-full flex items-center justify-center gap-1.5 text-slate-700 dark:text-slate-200 bg-slate-50 hover:bg-slate-900 hover:text-white dark:bg-white/[0.03] dark:hover:bg-white/10 py-2.5 rounded-xl font-bold text-xs transition-colors duration-200 border border-slate-200 dark:border-white/5 outline-none group/btn"
                                        >
                                            View Profile <FiArrowRight className="group-hover/btn:translate-x-0.5 transition-transform" />
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