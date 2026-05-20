import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useTitle from '../hooks/useTitle';
import { FiClock, FiGlobe, FiDollarSign, FiInbox, FiCheckCircle, FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const Sessions = () => {
    useTitle('My Sessions');
    const { user } = useContext(AuthContext);
    const [bookedSessions, setBookedSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/booked-sessions?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setBookedSessions(data);
                } else {
                    setBookedSessions([]);
                }
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
            });
    }, [user?.email]);

    const handleRemoveSession = (id) => {
        Swal.fire({
            title: 'Cancel Session?',
            text: "Are you sure you want to remove this booked session?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#4b5563',
            confirmButtonText: 'Yes, remove it!',
            background: document.documentElement.classList.contains('dark') ? '#0B1120' : '#ffffff',
            color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/booked-sessions/${id}`, {
                    method: 'DELETE',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('access-token')}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            toast.success('Session removed successfully!');
                            const remaining = bookedSessions.filter(session => session._id !== id);
                            setBookedSessions(remaining);
                        }
                    });
            }
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#030712]">
                <span className="loading loading-spinner loading-lg text-indigo-600 dark:text-indigo-400"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-16 px-4 md:px-8 bg-[#F8FAFC] dark:bg-[#030712] transition-colors duration-500 font-sans relative z-0 overflow-hidden">

            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-[140px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-[140px]"></div>
            </div>

            <div className="max-w-7xl mx-auto pt-6 relative z-10">
                <div className="mb-12 text-center md:text-left">
                    <h2 className="text-4xl md:text-5xl font-light text-slate-900 dark:text-white tracking-tight mb-3">
                        My Booked <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-indigo-400 dark:to-teal-400 font-bold">Sessions</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
                        Review and manage your upcoming registered classes
                    </p>
                </div>

                {bookedSessions.length === 0 ? (
                    <div className="text-center py-24 bg-white/90 dark:bg-[#0B1120]/90 backdrop-blur-3xl rounded-[2.5rem] border border-slate-200/80 dark:border-white/10 shadow-xl shadow-slate-200/30 dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)] max-w-2xl mx-auto transition-all duration-500 hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5">
                        <div className="w-20 h-20 bg-indigo-50 dark:bg-white/5 text-indigo-400 dark:text-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-indigo-100/50 dark:border-white/10">
                            <FiInbox size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">No Sessions Booked</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium max-w-sm mx-auto">
                            You haven't registered for any classes yet. Explore our global network of educators to get started.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {bookedSessions.map((session) => (
                            <div key={session._id} className="group bg-white/90 dark:bg-[#0B1120]/90 rounded-[2rem] backdrop-blur-3xl border border-slate-200/80 dark:border-white/10 p-5 flex flex-col shadow-lg shadow-slate-200/30 dark:shadow-[0_10px_40px_rgba(0,0,0,0.4)] hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/10 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all duration-500">

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-sm shrink-0">
                                        <img src={session.image} alt={session.tutorName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 mb-1.5 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md w-max border border-emerald-100 dark:border-emerald-500/20">
                                            <FiCheckCircle size={10} />
                                            <span className="text-[9px] font-bold uppercase tracking-widest">Confirmed</span>
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{session.tutorName}</h3>
                                    </div>
                                </div>

                                <div className="bg-slate-50 dark:bg-[#111827] rounded-2xl p-4 flex justify-between items-center border border-slate-200/50 dark:border-white/5 mb-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Language</span>
                                        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                            <FiGlobe className="text-indigo-500" size={14} />
                                            <span className="text-sm font-bold">{session.language}</span>
                                        </div>
                                    </div>
                                    <div className="w-px h-8 bg-slate-200 dark:bg-white/10"></div>
                                    <div className="flex flex-col gap-1 items-end">
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Fee</span>
                                        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                            <FiDollarSign className="text-emerald-500" size={14} />
                                            <span className="text-sm font-bold">{session.price} / hr</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto pt-2">
                                    <button
                                        onClick={() => handleRemoveSession(session._id)}
                                        className="w-full flex items-center justify-center gap-2 text-rose-600 dark:text-rose-400 bg-rose-50 hover:bg-rose-600 hover:text-white dark:bg-rose-500/10 dark:hover:bg-rose-500 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-300 border border-rose-100 dark:border-rose-500/20 hover:border-transparent outline-none cursor-pointer shadow-sm hover:shadow-lg hover:shadow-rose-500/20"
                                    >
                                        <FiTrash2 size={14} /> Remove Session
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sessions;