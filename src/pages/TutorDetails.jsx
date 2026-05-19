import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { FiGlobe, FiStar, FiDollarSign, FiArrowLeft, FiCheckCircle, FiMail, FiPhone, FiLinkedin } from 'react-icons/fi';
import { FaFacebookF } from 'react-icons/fa';
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
            .catch(error => console.error(error));
    }, [id]);

    const handleBookSession = () => {
        if (!user) {
            toast.error("Please login to book a session!");
            navigate('/login');
            return;
        }

        const sessionData = {
            tutorId: tutor._id,
            tutorName: tutor.name,
            image: tutor.image,
            language: tutor.language,
            price: tutor.price,
            tutorEmail: tutor.tutorEmail || tutor.email,
            userEmail: user.email
        };

        fetch('http://localhost:5000/book-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sessionData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    toast.success("Session booked successfully! 🎉");
                } else if (data.message === "Already booked") {
                    toast.warning("Already Exist! You have already booked this session.");
                } else {
                    toast.error("Failed to book session!");
                }
            })
            .catch(error => toast.error(error.message));
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#030712]">
                <span className="loading loading-spinner loading-md text-indigo-600 dark:text-indigo-400"></span>
            </div>
        );
    }

    if (!tutor) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#030712] text-slate-600 dark:text-slate-400">
                <h2 className="text-xl font-bold">Tutor not found!</h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-16 px-4 md:px-8 bg-[#F8FAFC] dark:bg-[#030712] transition-colors duration-500 flex items-center justify-center font-sans relative overflow-hidden z-0">

            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden hidden dark:block">
                <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-teal-500/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-4xl w-full">

                <button onClick={() => navigate(-1)} className="group flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-white font-bold mb-6 transition-colors cursor-pointer outline-none text-xs uppercase tracking-wider w-max">
                    <FiArrowLeft className="group-hover:-translate-x-0.5 transition-transform" /> Back
                </button>

                <div className="bg-white dark:bg-white/[0.04] backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] border border-slate-200/80 dark:border-white/[0.08] grid grid-cols-1 md:grid-cols-12 gap-8 p-5 md:p-8 transition-all duration-300">

                    <div className="col-span-1 md:col-span-5 w-full aspect-square relative rounded-[1.8rem] overflow-hidden bg-slate-100 dark:bg-[#050B14] border border-slate-200/60 dark:border-white/5">
                        <img src={tutor.image} alt={tutor.name} className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60"></div>
                        <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-[#030712]/80 backdrop-blur-md px-3 py-1 rounded-xl border border-slate-200 dark:border-white/10 flex items-center gap-1.5 shadow-sm">
                            <FiGlobe className="text-indigo-600 dark:text-indigo-400" size={12} />
                            <span className="text-[10px] font-black text-slate-800 dark:text-white uppercase tracking-widest">{tutor.language || tutor.subject || 'Universal'}</span>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-7 flex flex-col justify-center py-2">
                        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 w-max px-3 py-1 rounded-lg border border-emerald-100 dark:border-emerald-500/20 mb-4">
                            <FiCheckCircle size={12} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Verified Educator</span>
                        </div>

                        <h1 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight mb-3">
                            {tutor.name}
                        </h1>

                        <div className="flex items-center gap-2.5 mb-5">
                            <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-100 dark:border-amber-500/20">
                                <FiStar size={12} className="fill-current" />
                                <span className="text-xs font-black">{tutor.review || tutor.rating || 0}</span>
                            </div>
                            <div className="text-indigo-600 dark:text-indigo-400 font-bold text-xs bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-xl border border-indigo-100 dark:border-indigo-500/20">
                                ${tutor.price || tutor.fee || 0} <span className="opacity-60 font-medium">/ session</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6 border-t border-slate-100 dark:border-white/5 pt-5">
                            {(tutor.tutorEmail || tutor.email) && (
                                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-white/5 px-3 py-1.5 rounded-xl border border-slate-200/60 dark:border-white/5 max-w-[180px] truncate">
                                    <FiMail size={13} className="text-slate-400" /> {tutor.tutorEmail || tutor.email}
                                </span>
                            )}
                            {tutor.phone && (
                                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-white/5 px-3 py-1.5 rounded-xl border border-slate-200/60 dark:border-white/5">
                                    <FiPhone size={13} className="text-slate-400" /> {tutor.phone}
                                </span>
                            )}
                            {tutor.linkedin && (
                                <a href={tutor.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-center w-6 h-6 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-white/5 rounded-xl border border-blue-100 dark:border-white/5 hover:bg-blue-100 dark:hover:bg-white/10 transition-colors">
                                    <FiLinkedin size={13} />
                                </a>
                            )}
                            {tutor.facebook && (
                                <a href={tutor.facebook} target="_blank" rel="noreferrer" className="flex items-center justify-center w-6 h-6 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-white/5 rounded-xl border border-indigo-100 dark:border-white/5 hover:bg-indigo-100 dark:hover:bg-white/10 transition-colors">
                                    <FaFacebookF size={11} />
                                </a>
                            )}
                        </div>

                        <div className="mb-8">
                            <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-widest">About Educator</h3>
                            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                {tutor.description || "No description provided by the educator."}
                            </p>
                        </div>

                        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-white/5">
                            <button
                                onClick={handleBookSession}
                                className="w-full sm:w-auto bg-slate-900 hover:bg-indigo-600 dark:bg-white dark:text-slate-900 dark:hover:bg-white/90 text-white rounded-xl font-bold text-xs px-6 py-3 transition-all duration-300 hover:scale-[1.02] shadow-sm outline-none cursor-pointer"
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