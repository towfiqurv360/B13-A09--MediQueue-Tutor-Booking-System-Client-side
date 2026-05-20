import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useTitle from '../hooks/useTitle';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiPhone, FiGlobe, FiLinkedin, FiImage, FiDollarSign, FiFileText } from 'react-icons/fi';
import { FaFacebookF } from 'react-icons/fa';

const AddTutor = () => {
    useTitle('Add Tutor');
    const { user } = useContext(AuthContext);

    const handleAddTutor = (e) => {
        e.preventDefault();
        const form = e.target;

        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const language = form.language.value;
        const linkedin = form.linkedin.value;
        const facebook = form.facebook.value;
        const image = form.image.value;
        const price = form.price.value;
        const description = form.description.value;

        const newTutor = {
            name,
            email,
            phone,
            language,
            linkedin,
            facebook,
            image,
            price: parseInt(price),
            description,
            userEmail: user?.email,
            review: 0,
        };

        fetch('https://b13-a09-mediqueue-tutor-booking-system.onrender.com/tutors', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('access-token')}`
            },
            body: JSON.stringify(newTutor)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    toast.success('Tutor added successfully to the global network!');
                    form.reset();
                }
            })
            .catch(error => {
                toast.error('Failed to add tutor. Please try again.');
            });
    };

    return (
        <div className="min-h-screen py-16 px-4 md:px-8 bg-[#F8FAFC] dark:bg-[#030712] transition-colors duration-500 font-sans relative z-0 overflow-hidden">

            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-[140px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-[140px]"></div>
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="mb-12 text-center">
                    <h2 className="text-4xl md:text-5xl font-light text-slate-900 dark:text-white tracking-tight mb-3">
                        Register an <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-indigo-400 dark:to-teal-400 font-bold">Educator</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
                        Deploy a new professional profile to the global network
                    </p>
                </div>

                <div className="bg-white/90 dark:bg-[#0B1120]/90 backdrop-blur-3xl rounded-[2.5rem] shadow-xl shadow-slate-200/30 dark:shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-slate-200/80 dark:border-white/10 p-8 md:p-12 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5 hover:border-indigo-500/30 dark:hover:border-indigo-500/30">
                    <form onSubmit={handleAddTutor} className="space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className="relative">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                                <div className="relative">
                                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input type="text" name="name" placeholder="E.g. Alexander Pierce" className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-[#111827] border border-slate-200/80 dark:border-white/5 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium" required />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Business Email</label>
                                <div className="relative">
                                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input type="email" name="email" placeholder="contact@educator.com" className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-[#111827] border border-slate-200/80 dark:border-white/5 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium" required />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Phone Number</label>
                                <div className="relative">
                                    <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input type="text" name="phone" placeholder="+1 (555) 000-0000" className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-[#111827] border border-slate-200/80 dark:border-white/5 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium" required />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Specialty Language</label>
                                <div className="relative">
                                    <FiGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10" size={16} />
                                    <select name="language" className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-[#111827] border border-slate-200/80 dark:border-white/5 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium appearance-none cursor-pointer" required>
                                        <option value="" disabled selected>Select Language</option>
                                        <option value="English">English</option>
                                        <option value="Spanish">Spanish</option>
                                        <option value="French">French</option>
                                        <option value="German">German</option>
                                        <option value="Japanese">Japanese</option>
                                        <option value="Arabic">Arabic</option>
                                        <option value="Mandarin">Mandarin</option>
                                    </select>
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">LinkedIn Profile</label>
                                <div className="relative">
                                    <FiLinkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input type="url" name="linkedin" placeholder="https://linkedin.com/in/..." className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-[#111827] border border-slate-200/80 dark:border-white/5 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium" />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Facebook Profile</label>
                                <div className="relative">
                                    <FaFacebookF className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                    <input type="url" name="facebook" placeholder="https://facebook.com/..." className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-[#111827] border border-slate-200/80 dark:border-white/5 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium" />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Profile Avatar URL</label>
                                <div className="relative">
                                    <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input type="url" name="image" placeholder="https://example.com/avatar.jpg" className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-[#111827] border border-slate-200/80 dark:border-white/5 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium" required />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Hourly Rate (USD)</label>
                                <div className="relative">
                                    <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input type="number" name="price" placeholder="E.g. 30" min="1" className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-[#111827] border border-slate-200/80 dark:border-white/5 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium" required />
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Professional Bio</label>
                            <div className="relative">
                                <FiFileText className="absolute left-4 top-4 text-slate-400" size={16} />
                                <textarea name="description" rows="4" placeholder="Summarize the educator's expertise, background, and teaching methodology..." className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-[#111827] border border-slate-200/80 dark:border-white/5 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium resize-none" required></textarea>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button type="submit" className="w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:from-indigo-600 hover:to-indigo-700 dark:from-white dark:to-slate-200 dark:hover:from-indigo-400 dark:hover:to-indigo-500 dark:text-slate-900 dark:hover:text-white text-white font-bold py-4 rounded-2xl text-sm transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-indigo-500/20 hover:-translate-y-0.5 outline-none cursor-pointer tracking-wide">
                                Deploy Educator Profile
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTutor;