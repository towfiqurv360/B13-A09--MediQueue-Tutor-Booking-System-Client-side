import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiGlobe, FiStar, FiArrowRight, FiDollarSign, FiSearch, FiFilter } from 'react-icons/fi';

const Tutors = () => {
    const [allTutors, setAllTutors] = useState([]);
    const [filteredTutors, setFilteredTutors] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchText, setSearchText] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/tutors')
            .then(res => res.json())
            .then(data => {
                setAllTutors(data);
                setFilteredTutors(data);
                setLoading(false);
            })
            .catch(error => console.error("Error fetching tutors:", error));
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
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <span className="loading loading-spinner loading-lg text-indigo-600 dark:text-indigo-400"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4 md:px-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/60 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500">
            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white tracking-tight mb-4">
                        Find Your Perfect Tutor
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-medium">
                        Browse through our global network of expert language tutors. Learn a new language, explore cultures, and achieve your goals.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-4 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700">

                    <div className="relative w-full md:w-auto flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-2 text-slate-600 dark:text-slate-300 font-bold text-xs uppercase tracking-widest pl-2">
                            <FiFilter size={16} /> Filter
                        </div>
                        <select
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                            className="select w-full md:w-52 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-white rounded-2xl transition-all font-medium shadow-sm cursor-pointer"
                        >
                            <option value="">All Languages</option>
                            <option value="English">English</option>
                            <option value="Spanish">Spanish</option>
                            <option value="French">French</option>
                            <option value="German">German</option>
                            <option value="Japanese">Japanese</option>
                            <option value="Arabic">Arabic</option>
                        </select>
                    </div>

                    <div className="relative w-full md:max-w-md">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-300">
                            <FiSearch size={18} />
                        </span>
                        <input
                            type="text"
                            placeholder="Search by name or language..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-white rounded-2xl transition-all font-medium shadow-sm cursor-text"
                        />
                    </div>
                </div>

                {filteredTutors.length === 0 ? (
                    <div className="text-center py-24 bg-white dark:bg-slate-800 rounded-[3rem] border border-slate-200 dark:border-slate-700 shadow-sm">
                        <div className="w-24 h-24 bg-indigo-50 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-500 dark:text-indigo-400 shadow-inner">
                            <FiSearch size={36} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 dark:text-white">No tutors found</h3>
                        <p className="text-slate-600 dark:text-slate-300 mt-2 font-medium max-w-md mx-auto">We couldn't find any tutors matching your criteria. Try adjusting your search or filters.</p>
                        <button
                            onClick={() => { setSearchText(''); setSelectedLanguage(''); }}
                            className="btn btn-primary mt-8 rounded-2xl px-8 shadow-lg shadow-indigo-500/20 cursor-pointer"
                        >
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {filteredTutors.map(tutor => (
                            <div key={tutor._id} className="group bg-white dark:bg-slate-800 rounded-[2rem] p-2 shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-700 transition-all duration-500 flex flex-col hover:-translate-y-2">

                                <div className="h-56 overflow-hidden relative rounded-[1.5rem] bg-slate-100 dark:bg-slate-700">
                                    <img
                                        src={tutor.image}
                                        alt={tutor.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    <div className="absolute top-3 right-3 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-white/20 dark:border-slate-600">
                                        <FiGlobe className="text-indigo-600 dark:text-indigo-400" size={14} />
                                        <span className="text-xs font-black text-slate-800 dark:text-white tracking-wide uppercase">{tutor.language}</span>
                                    </div>
                                </div>

                                <div className="p-5 flex flex-col flex-grow">
                                    <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                        {tutor.name}
                                    </h3>

                                    <div className="flex items-center gap-3 mt-1 mb-4">
                                        <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-slate-700 px-2.5 py-1.5 rounded-xl border border-amber-100 dark:border-slate-600">
                                            <FiStar size={14} className="fill-current" />
                                            <span className="text-sm font-bold">{tutor.review || 0}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-slate-700 px-2.5 py-1.5 rounded-xl border border-emerald-100 dark:border-slate-600">
                                            <FiDollarSign size={14} />
                                            <span className="text-sm font-bold">{tutor.price}</span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-6 font-medium leading-relaxed">
                                        {tutor.description}
                                    </p>

                                    <div className="mt-auto">
                                        <Link
                                            to={`/tutor/${tutor._id}`}
                                            className="w-full py-3.5 px-4 bg-slate-50 hover:bg-indigo-600 dark:bg-slate-700 dark:hover:bg-indigo-600 text-slate-700 hover:text-white dark:text-slate-200 rounded-[1.2rem] flex items-center justify-center gap-2 font-bold text-sm transition-all duration-300 border border-slate-200 dark:border-slate-600 hover:border-indigo-600 dark:hover:border-indigo-600 group/btn shadow-sm hover:shadow-lg hover:shadow-indigo-600/20 cursor-pointer"
                                        >
                                            View Details
                                            <FiArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
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