import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade, Keyboard, Mousewheel } from 'swiper/modules';
import { FiSearch, FiCalendar, FiArrowRight, FiStar, FiGlobe, FiPlayCircle, FiAward, FiShield, FiClock, FiCheckCircle, FiMail, FiPhone, FiBookOpen, FiCpu } from 'react-icons/fi';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import useTitle from '../hooks/useTitle';

const Home = () => {
    useTitle('Home');
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/tutors')
            .then(res => res.json())
            .then(data => {
                setTutors(data);
                setLoading(false);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="w-full min-h-screen bg-[#F8FAFC] dark:bg-[#030712] transition-colors duration-500 font-sans relative overflow-hidden z-0">

            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-[140px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-[140px]"></div>
            </div>

            <section className="relative w-full max-w-7xl mx-auto pt-6 px-4 md:px-8">
                <div className="h-[520px] md:h-[580px] w-full rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-white to-indigo-50/30 dark:from-[#0B1120]/80 dark:to-transparent backdrop-blur-3xl border border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:border-white/10 dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)] relative">

                    <Swiper
                        spaceBetween={0}
                        centeredSlides={true}
                        effect={'fade'}
                        fadeEffect={{ crossFade: true }}
                        autoplay={{ delay: 6000, disableOnInteraction: false }}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        keyboard={{ enabled: true }}
                        mousewheel={{ forceToAxis: true }}
                        grabCursor={true}
                        modules={[Autoplay, Pagination, EffectFade, Keyboard, Mousewheel]}
                        className="w-full h-full cursor-grab active:cursor-grabbing"
                    >
                        <SwiperSlide className="w-full h-full">
                            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 h-full w-full px-6 md:px-16 relative">
                                <div className="lg:col-span-7 flex flex-col items-start text-left relative z-20">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100/50 dark:bg-white/5 border border-indigo-200/50 dark:border-white/10 text-indigo-700 dark:text-indigo-400 text-[10px] font-bold uppercase tracking-wider mb-4">
                                        <FiGlobe size={12} /> Global Analytics Network
                                    </div>
                                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 dark:text-white mb-4 tracking-tight leading-tight max-w-2xl">
                                        Elevate your <span className="font-serif italic text-indigo-600 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-indigo-400 dark:to-teal-400 font-bold tracking-normal pr-1">intellect</span>
                                    </h2>
                                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-xl font-medium leading-relaxed">
                                        Engage with industry-leading mentors through high-fidelity virtual spaces. A structure engineered specifically for deep technological and academic expansion.
                                    </p>
                                    <Link to="/tutors" className="group flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white rounded-xl font-bold text-xs px-6 py-3.5 transition-all duration-300 shadow-lg hover:shadow-indigo-500/30 outline-none cursor-pointer">
                                        Explore Mentors <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                                <div className="lg:col-span-5 hidden lg:grid grid-cols-2 gap-4 relative z-20 pr-4">
                                    <div className="p-5 rounded-2xl bg-white/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between h-36">
                                        <FiBookOpen className="text-indigo-500" size={24} />
                                        <div>
                                            <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">150+</p>
                                            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide mt-1">Specialized Tracks</p>
                                        </div>
                                    </div>
                                    <div className="p-5 rounded-2xl bg-white/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between h-36 mt-6">
                                        <FiCpu className="text-teal-500" size={24} />
                                        <div>
                                            <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">99.4%</p>
                                            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide mt-1">Success Matrix</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide className="w-full h-full">
                            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 h-full w-full px-6 md:px-16 relative">
                                <div className="lg:col-span-7 flex flex-col items-start text-left relative z-20">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/50 dark:bg-white/5 border border-teal-200/50 dark:border-white/10 text-teal-700 dark:text-teal-400 text-[10px] font-bold uppercase tracking-wider mb-4">
                                        <FiPlayCircle size={12} /> Real-Time Workspace
                                    </div>
                                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 dark:text-white mb-4 tracking-tight leading-tight max-w-2xl">
                                        Mastery <span className="font-serif italic text-teal-500 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-teal-400 dark:to-indigo-400 font-bold tracking-normal pr-1">redefined</span>
                                    </h2>
                                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-xl font-medium leading-relaxed">
                                        Break localized borders instantly. Connect with certified professionals globally and accelerate your production deployment capability.
                                    </p>
                                    <Link to="/tutors" className="group flex items-center gap-2 bg-slate-900 hover:bg-teal-600 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white rounded-xl font-bold text-xs px-6 py-3.5 transition-all duration-300 shadow-lg hover:shadow-teal-500/30 outline-none cursor-pointer">
                                        Find Mentors <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                                <div className="lg:col-span-5 hidden lg:grid grid-cols-2 gap-4 relative z-20 pr-4">
                                    <div className="p-5 rounded-2xl bg-white/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between h-36">
                                        <FiStar className="text-amber-500" size={24} />
                                        <div>
                                            <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">4.9★</p>
                                            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide mt-1">Platform Rating</p>
                                        </div>
                                    </div>
                                    <div className="p-5 rounded-2xl bg-white/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between h-36 mt-6">
                                        <FiAward className="text-indigo-500" size={24} />
                                        <div>
                                            <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">24/7</p>
                                            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide mt-1">Support Architecture</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide className="w-full h-full">
                            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 h-full w-full px-6 md:px-16 relative">
                                <div className="lg:col-span-7 flex flex-col items-start text-left relative z-20">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/50 dark:bg-white/5 border border-purple-200/50 dark:border-white/10 text-purple-700 dark:text-purple-400 text-[10px] font-bold uppercase tracking-wider mb-4">
                                        <FiCpu size={12} /> Advanced Engineering
                                    </div>
                                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 dark:text-white mb-4 tracking-tight leading-tight max-w-2xl">
                                        Optimize your <span className="font-serif italic text-purple-500 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-purple-400 dark:to-pink-500 font-bold tracking-normal pr-1">pipeline</span>
                                    </h2>
                                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-xl font-medium leading-relaxed">
                                        Construct comprehensive system designs and optimize code scalability with mentors specializing in modern frontend frameworks.
                                    </p>
                                    <Link to="/tutors" className="group flex items-center gap-2 bg-slate-900 hover:bg-purple-600 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white rounded-xl font-bold text-xs px-6 py-3.5 transition-all duration-300 shadow-lg hover:shadow-purple-500/30 outline-none cursor-pointer">
                                        Explore Frameworks <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                                <div className="lg:col-span-5 hidden lg:grid grid-cols-2 gap-4 relative z-20 pr-4">
                                    <div className="p-5 rounded-2xl bg-white/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between h-36">
                                        <FiShield className="text-blue-500" size={24} />
                                        <div>
                                            <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">100%</p>
                                            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide mt-1">Secure Routing</p>
                                        </div>
                                    </div>
                                    <div className="p-5 rounded-2xl bg-white/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between h-36 mt-6">
                                        <FiGlobe className="text-teal-500" size={24} />
                                        <div>
                                            <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">120+</p>
                                            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide mt-1">Countries Synced</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 md:px-8 py-24 relative">
                <div className="flex flex-col items-center text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-light text-slate-900 dark:text-white tracking-tight mb-3">
                        Elite <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-indigo-400 dark:to-teal-400 font-bold">Mentors</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-[0.25em]">
                        Direct synchronization with our verified educator database
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <span className="loading loading-spinner loading-lg text-indigo-600 dark:text-indigo-400"></span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {tutors.slice(0, 6).map((tutor) => (
                            <div key={tutor._id || tutor.id} className="group bg-white dark:bg-white/[0.03] rounded-[2rem] backdrop-blur-3xl border border-slate-200/80 dark:border-white/[0.08] p-4 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/10 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all duration-500 flex flex-col shadow-sm cursor-pointer">

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
                                        {tutor.linkedin && (
                                            <a href={tutor.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-center w-8 h-8 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-white/5 rounded-lg border border-blue-100 dark:border-white/5 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition-colors cursor-pointer outline-none">
                                                <FaLinkedinIn size={12} />
                                            </a>
                                        )}
                                        {tutor.facebook && (
                                            <a href={tutor.facebook} target="_blank" rel="noreferrer" className="flex items-center justify-center w-8 h-8 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-white/5 rounded-lg border border-indigo-100 dark:border-white/5 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition-colors cursor-pointer outline-none">
                                                <FaFacebookF size={12} />
                                            </a>
                                        )}
                                    </div>

                                    <div className="mt-auto">
                                        <Link to={`/tutor/${tutor._id || tutor.id}`} className="w-full flex items-center justify-center gap-2 text-slate-700 dark:text-slate-200 bg-slate-50 hover:bg-indigo-600 hover:text-white dark:bg-white/[0.05] dark:hover:bg-indigo-500 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 border border-slate-200 dark:border-transparent outline-none group/btn cursor-pointer shadow-sm hover:shadow-lg hover:shadow-indigo-500/25 dark:hover:shadow-indigo-500/20">
                                            View Profile <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section className="relative py-20 border-t border-slate-200/80 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        <div className="p-8 md:p-10 bg-white dark:bg-[#0B1120]/80 backdrop-blur-3xl rounded-[2rem] border border-slate-200/80 dark:border-white/[0.05] hover:border-indigo-500/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 overflow-hidden cursor-pointer">
                            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-6 border border-indigo-100/50 dark:border-indigo-500/20">
                                <FiSearch size={20} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">Discover</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm font-medium">
                                Filter networks seamlessly to retrieve verified specialist mentors matching your direct stack parameters.
                            </p>
                        </div>

                        <div className="p-8 md:p-10 bg-white dark:bg-[#0B1120]/80 backdrop-blur-3xl rounded-[2rem] border border-slate-200/80 dark:border-white/[0.05] hover:border-teal-500/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-teal-500/5 hover:-translate-y-1 overflow-hidden cursor-pointer">
                            <div className="w-12 h-12 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center mb-6 border border-teal-100/50 dark:border-teal-500/20">
                                <FiCalendar size={20} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">Schedule</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm font-medium">
                                Lock data allocations and interactive temporal blocks instantly without collision risk or runtime state failures.
                            </p>
                        </div>

                        <div className="p-8 md:p-10 bg-white dark:bg-[#0B1120]/80 backdrop-blur-3xl rounded-[2rem] border border-slate-200/80 dark:border-white/[0.05] hover:border-purple-500/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-1 overflow-hidden cursor-pointer">
                            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-6 border border-purple-100/50 dark:border-purple-500/20">
                                <FiAward size={20} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">Ascend</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm font-medium">
                                Engage deeply inside clean workspaces structured precisely to acquire production-grade execution models.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-4xl mx-auto px-4 md:px-8 py-20 text-center border-t border-slate-200/80 dark:border-white/5">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-3">Why Choose Us?</h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto mb-10 text-sm leading-relaxed">
                    A conflict-free micro-architecture planned strictly for production-grade scale and response synchronization.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <div className="flex items-center gap-2.5 bg-white dark:bg-[#0B1120] border border-slate-200/80 dark:border-white/10 px-5 py-3 rounded-full shadow-sm text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider cursor-default hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-colors">
                        <FiCheckCircle className="text-indigo-600 dark:text-indigo-400" size={16} /> Verified Educators
                    </div>
                    <div className="flex items-center gap-2.5 bg-white dark:bg-[#0B1120] border border-slate-200/80 dark:border-white/10 px-5 py-3 rounded-full shadow-sm text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider cursor-default hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-colors">
                        <FiClock className="text-indigo-600 dark:text-indigo-400" size={16} /> Zero Overlaps
                    </div>
                    <div className="flex items-center gap-2.5 bg-white dark:bg-[#0B1120] border border-slate-200/80 dark:border-white/10 px-5 py-3 rounded-full shadow-sm text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider cursor-default hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-colors">
                        <FiCalendar className="text-indigo-600 dark:text-indigo-400" size={16} /> Premium Sync
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;