import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { FiImage, FiGlobe, FiDollarSign, FiAlignLeft, FiUser, FiMail, FiPhone, FiLinkedin, FiFacebook } from 'react-icons/fi';
import { toast } from 'react-toastify';

const AddTutor = () => {
    const { user } = useContext(AuthContext);

    const handleAddTutor = (e) => {
        e.preventDefault();
        const form = e.target;

        const name = form.name.value;
        const userEmail = user?.email;
        const tutorEmail = form.tutorEmail.value;
        const image = form.image.value;
        const language = form.language.value;
        const price = parseFloat(form.price.value);
        const description = form.description.value;
        const phone = form.phone.value;
        const linkedin = form.linkedin.value;
        const facebook = form.facebook.value;
        const review = 0;

        const newTutor = {
            name,
            userEmail,
            tutorEmail,
            phone,
            linkedin,
            facebook,
            image,
            language,
            price,
            description,
            review
        };

        fetch('http://localhost:5000/tutors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTutor)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    toast.success("Educator profile published successfully!");
                    form.reset();
                } else {
                    toast.error("Failed to publish profile!");
                }
            })
            .catch(error => {
                toast.error("Error: " + error.message);
            });
    };

    return (
        <div className="min-h-screen py-12 px-4 bg-slate-50 dark:bg-slate-950 flex items-center justify-center transition-colors duration-300 relative overflow-hidden">

            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-2xl w-full bg-white dark:bg-slate-900 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-slate-100 dark:border-slate-800 p-8 md:p-10 relative z-10">

                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Onboard an Educator</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2.5 font-medium text-sm max-w-md mx-auto leading-relaxed">
                        Expand our global network. Fill in the professional credentials below to publish a new language expert's profile.
                    </p>
                </div>

                <form onSubmit={handleAddTutor} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div className="form-control col-span-1">
                            <label className="label pt-0 pb-1.5">
                                <span className="label-text font-bold text-slate-600 dark:text-slate-300 uppercase text-[11px] tracking-widest">Full Name</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                    <FiUser size={16} />
                                </span>
                                <input type="text" name="name" placeholder="E.g. Alexander Pierce" className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-white rounded-2xl transition-all text-sm outline-none" required />
                            </div>
                        </div>

                        <div className="form-control col-span-1">
                            <label className="label pt-0 pb-1.5">
                                <span className="label-text font-bold text-slate-600 dark:text-slate-300 uppercase text-[11px] tracking-widest">Business Email</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                    <FiMail size={16} />
                                </span>
                                <input type="email" name="tutorEmail" placeholder="contact@educator.com" className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-white rounded-2xl transition-all text-sm outline-none" required />
                            </div>
                        </div>

                        <div className="form-control col-span-1">
                            <label className="label pt-0 pb-1.5">
                                <span className="label-text font-bold text-slate-600 dark:text-slate-300 uppercase text-[11px] tracking-widest">Phone Number</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                    <FiPhone size={16} />
                                </span>
                                <input type="tel" name="phone" placeholder="+1 (555) 000-0000" className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-white rounded-2xl transition-all text-sm outline-none" required />
                            </div>
                        </div>

                        <div className="form-control col-span-1">
                            <label className="label pt-0 pb-1.5">
                                <span className="label-text font-bold text-slate-600 dark:text-slate-300 uppercase text-[11px] tracking-widest">Specialty Language</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 pointer-events-none z-10">
                                    <FiGlobe size={16} />
                                </span>
                                <select name="language" defaultValue="" className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-white rounded-2xl transition-all text-sm outline-none appearance-none cursor-pointer" required>
                                    <option value="" disabled>Select Language</option>
                                    <option value="English">English</option>
                                    <option value="Spanish">Spanish</option>
                                    <option value="French">French</option>
                                    <option value="German">German</option>
                                    <option value="Japanese">Japanese</option>
                                    <option value="Arabic">Arabic</option>
                                    <option value="Mandarin">Mandarin</option>
                                </select>
                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>

                        <div className="form-control col-span-1">
                            <label className="label pt-0 pb-1.5">
                                <span className="label-text font-bold text-slate-600 dark:text-slate-300 uppercase text-[11px] tracking-widest">LinkedIn Profile</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                    <FiLinkedin size={16} />
                                </span>
                                <input type="url" name="linkedin" placeholder="https://linkedin.com/in/..." className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-white rounded-2xl transition-all text-sm outline-none" />
                            </div>
                        </div>

                        <div className="form-control col-span-1">
                            <label className="label pt-0 pb-1.5">
                                <span className="label-text font-bold text-slate-600 dark:text-slate-300 uppercase text-[11px] tracking-widest">Facebook Profile</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                    <FiFacebook size={16} />
                                </span>
                                <input type="url" name="facebook" placeholder="https://facebook.com/..." className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-white rounded-2xl transition-all text-sm outline-none" />
                            </div>
                        </div>

                        <div className="form-control col-span-1">
                            <label className="label pt-0 pb-1.5">
                                <span className="label-text font-bold text-slate-600 dark:text-slate-300 uppercase text-[11px] tracking-widest">Profile Avatar URL</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                    <FiImage size={16} />
                                </span>
                                <input type="url" name="image" placeholder="https://example.com/avatar.jpg" className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-white rounded-2xl transition-all text-sm outline-none" required />
                            </div>
                        </div>

                        <div className="form-control col-span-1">
                            <label className="label pt-0 pb-1.5">
                                <span className="label-text font-bold text-slate-600 dark:text-slate-300 uppercase text-[11px] tracking-widest">Hourly Rate (USD)</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                    <FiDollarSign size={16} />
                                </span>
                                <input type="number" name="price" placeholder="E.g. 30" min="1" className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-white rounded-2xl transition-all text-sm outline-none" required />
                            </div>
                        </div>

                        <div className="form-control col-span-1 md:col-span-2">
                            <label className="label pt-0 pb-1.5">
                                <span className="label-text font-bold text-slate-600 dark:text-slate-300 uppercase text-[11px] tracking-widest">Professional Bio</span>
                            </label>
                            <div className="relative">
                                <span className="absolute top-4 left-0 flex items-start pl-4 text-slate-400">
                                    <FiAlignLeft size={16} />
                                </span>
                                <textarea name="description" placeholder="Summarize the educator's expertise, background, and teaching methodology..." className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-white rounded-2xl transition-all min-h-[110px] text-sm outline-none resize-y" required></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button type="submit" className="w-full bg-slate-800 hover:bg-slate-900 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-bold text-sm tracking-wide rounded-2xl py-4 shadow-lg shadow-slate-900/10 dark:shadow-indigo-600/20 cursor-pointer transition-all duration-300">
                            Publish Educator Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTutor;