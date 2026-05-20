import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useTitle from '../hooks/useTitle';
import { FiClock, FiGlobe, FiDollarSign, FiInbox, FiCheckCircle } from 'react-icons/fi';

const Sessions = () => {
    useTitle('My Sessions');
    const { user } = useContext(AuthContext);
    const [bookedSessions, setBookedSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/booked-sessions?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setBookedSessions(data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, [user?.email]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#030712]">
                <span className="loading loading-spinner loading-md text-indigo-600 dark:text-indigo-400"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4 md:px-8 bg-[#F8FAFC] dark:bg-[#030712] transition-colors duration-500 font-sans relative z-0">

            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden hidden dark:block">
                <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-indigo-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-teal-500/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-7xl mx-auto pt-6">
                <div className="mb-10 text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-light text-slate-900 dark:text-white tracking-tight mb-2">
                        My Booked <span className="font-serif italic text-indigo-600 dark:text-indigo-400 font-bold">Sessions</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Review and manage your upcoming registered classes with our elite mentors.</p>
                </div>

                {bookedSessions.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-[#0A0F1D] rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm max-w-2xl mx-auto">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-slate-200 dark:border-white/10">
                            <FiInbox size={24} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">No Sessions Booked</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium max-w-xs mx-auto mb-6">
                            You haven't booked any sessions yet. Explore our global network of educators to get started.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookedSessions.map((session) => (
                            <div key={session._id} className="bg-white dark:bg-[#0A0F1D] rounded-[1.5rem] border border-slate-200 dark:border-white/5 p-4 flex flex-col shadow-sm hover:shadow-lg transition-shadow">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shrink-0">
                                        <img src={session.image} alt={session.tutorName} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 mb-1">
                                            <FiCheckCircle size={12} />
                                            <span className="text-[10px] font-bold uppercase tracking-wider">Confirmed</span>
                                        </div>
                                        <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight">{session.tutorName}</h3>
                                    </div>
                                </div>

                                <div className="bg-slate-50 dark:bg-[#111827] rounded-xl p-3 flex justify-between items-center border border-slate-100 dark:border-white/5 mb-4">
                                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                        <FiGlobe className="text-indigo-500" size={14} />
                                        <span className="text-xs font-bold">{session.language}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                        <FiDollarSign className="text-emerald-500" size={14} />
                                        <span className="text-xs font-bold">{session.price} / hr</span>
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

export default Sessions;