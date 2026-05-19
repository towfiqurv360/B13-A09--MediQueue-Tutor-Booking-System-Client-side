import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { FiGlobe, FiStar, FiDollarSign, FiArrowLeft, FiCheckCircle, FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify';

const TutorDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [tutor, setTutor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/tutors/${id}`)
            .then(res => res.json())
            .then(data => {
                setTutor(data);
                setLoading(false);
            })
            .catch(error => console.error("Error fetching tutor details:", error));
    }, [id]);

    const handleBookSession = () => {
        toast.info("Booking feature coming in the next step!");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <span className="loading loading-spinner loading-lg text-indigo-600 dark:text-indigo-400"></span>
            </div>
        );
    }

    if (!tutor) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300">
                <h2>Tutor not found!</h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-10 px-4 md:px-8 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
            <div className="max-w-5xl mx-auto">

                <button onClick={() => navigate(-1)} className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 font-semibold mb-8 transition-colors cursor-pointer">
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Tutors
                </button>

                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row">

                    <div className="md:w-2/5 h-[300px] md:h-auto relative bg-slate-100 dark:bg-slate-800">
                        <img
                            src={tutor.image}
                            alt={tutor.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-6 left-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 shadow-lg border border-white/20 dark:border-slate-700">
                            <FiGlobe className="text-indigo-600 dark:text-indigo-400" size={16} />
                            <span className="text-sm font-black text-slate-800 dark:text-slate-200 tracking-wide uppercase">{tutor.language}</span>
                        </div>
                    </div>

                    <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 w-max px-3 py-1.5 rounded-xl border border-emerald-100 dark:border-emerald-500/20 mb-4">
                            <FiCheckCircle size={14} />
                            <span className="text-xs font-bold uppercase tracking-wider">Verified Tutor</span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white mb-4">
                            {tutor.name}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 mb-8">
                            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-slate-800 px-4 py-2 rounded-2xl border border-amber-100 dark:border-slate-700">
                                <FiStar size={18} className="fill-current" />
                                <span className="font-bold">{tutor.review || 0} Reviews</span>
                            </div>
                            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-slate-800 px-4 py-2 rounded-2xl border border-indigo-100 dark:border-slate-700">
                                <FiDollarSign size={18} />
                                <span className="font-bold">{tutor.price} / session</span>
                            </div>
                        </div>

                        <div className="mb-10">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3">About Tutor</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                {tutor.description}
                            </p>
                        </div>

                        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
                            <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                    <FiUser size={18} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider">Tutor Email</p>
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{tutor.email}</p>
                                </div>
                            </div>

                            <button
                                onClick={handleBookSession}
                                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-2xl font-bold text-base shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30 transition-all duration-300 cursor-pointer"
                            >
                                Book a Session
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorDetails;