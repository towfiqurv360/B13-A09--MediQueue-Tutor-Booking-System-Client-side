import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useTitle from '../hooks/useTitle';
import toast from 'react-hot-toast';

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

        fetch('http://localhost:5000/tutors', {
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
        <div className="min-h-screen py-12 px-4 md:px-8 bg-[#F8FAFC] dark:bg-[#030712] transition-colors duration-500 font-sans relative z-0">

            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden hidden dark:block">
                <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-indigo-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-teal-500/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-4xl mx-auto pt-6">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl md:text-4xl font-light text-slate-900 dark:text-white tracking-tight mb-2">
                        Register an <span className="font-serif italic text-indigo-600 dark:text-indigo-400 font-bold">Educator</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Add a new professional to our global network. The profile will appear in your management dashboard.</p>
                </div>

                <div className="bg-white dark:bg-[#0A0F1D] rounded-[2rem] shadow-xl shadow-slate-200/40 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] border border-slate-200 dark:border-white/5 p-6 md:p-10">
                    <form onSubmit={handleAddTutor} className="space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
                                <input type="text" name="name" placeholder="E.g. Alexander Pierce" className="w-full bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors" required />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Business Email</label>
                                <input type="email" name="email" placeholder="contact@educator.com" className="w-full bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors" required />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Phone Number</label>
                                <input type="text" name="phone" placeholder="+1 (555) 000-0000" className="w-full bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors" required />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Specialty Language</label>
                                <select name="language" className="w-full bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none cursor-pointer" required>
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

                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">LinkedIn Profile</label>
                                <input type="url" name="linkedin" placeholder="https://linkedin.com/in/..." className="w-full bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Facebook Profile</label>
                                <input type="url" name="facebook" placeholder="https://facebook.com/..." className="w-full bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Profile Avatar URL</label>
                                <input type="url" name="image" placeholder="https://example.com/avatar.jpg" className="w-full bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors" required />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Hourly Rate (USD)</label>
                                <input type="number" name="price" placeholder="E.g. 30" min="1" className="w-full bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors" required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Professional Bio</label>
                            <textarea name="description" rows="4" placeholder="Summarize the educator's expertise, background, and teaching methodology..." className="w-full bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors" required></textarea>
                        </div>

                        <div className="pt-2">
                            <button type="submit" className="w-full bg-slate-900 hover:bg-indigo-600 dark:bg-white dark:text-slate-900 dark:hover:bg-white/90 text-white font-bold py-4 rounded-xl text-sm transition-all duration-300 hover:scale-[1.01] shadow-md outline-none">
                                Register Educator
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTutor;