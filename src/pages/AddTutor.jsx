import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { FiImage, FiGlobe, FiDollarSign, FiAlignLeft, FiUser, FiMail } from 'react-icons/fi';
import { toast } from 'react-toastify';

const AddTutor = () => {
    const { user } = useContext(AuthContext);

    const handleAddTutor = (e) => {
        e.preventDefault();
        const form = e.target;

        const name = form.name.value;
        const email = user?.email;
        const image = form.image.value;
        const language = form.language.value;
        const price = parseFloat(form.price.value);
        const description = form.description.value;
        const review = 0;

        const newTutor = { name, email, image, language, price, description, review };

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
                    toast.success("Tutor added successfully!");
                    form.reset();
                } else {
                    toast.error("Failed to add tutor!");
                }
            })
            .catch(error => {
                toast.error("Error: " + error.message);
            });
    };

    return (
        <div className="min-h-screen py-10 px-4 bg-slate-50 dark:bg-slate-950 flex items-center justify-center transition-colors duration-300">
            <div className="max-w-2xl w-full bg-white dark:bg-slate-900 rounded-2xl shadow-[0_20px_60px_rgba(8,_112,_184,_0.05)] border border-slate-100 dark:border-slate-800/80 p-6 md:p-8">

                <div className="text-center mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
                    <h2 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Add New Tutor</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium text-sm">Fill in the details to expand our global language experts platform.</p>
                </div>

                <form onSubmit={handleAddTutor} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div className="form-control col-span-1">
                            <label className="label pt-0 pb-1.5">
                                <span className="label-text font-bold text-slate-600 dark:text-slate-300 uppercase text-[11px] tracking-widest">Tutor Name</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500 pointer-events-none">
                                    <FiUser size={16} />
                                </span>
                                <input type="text" name="name" placeholder="John Doe" className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 rounded-xl transition-colors text-sm cursor-text" required />
                            </div>
                        </div>

                        <div className="form-control col-span-1">
                            <label className="label pt-0 pb-1.5">
                                <span className="label-text font-bold text-slate-600 dark:text-slate-300 uppercase text-[11px] tracking-widest">Your Email (ReadOnly)</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500 pointer-events-none">
                                    <FiMail size={16} />
                                </span>
                                <input type="email" name="email" defaultValue={user?.email} readOnly className="w-full pl-11 pr-4 py-2.5 bg-slate-100/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-slate-500 dark:text-slate-400 rounded-xl cursor-not-allowed opacity-80 text-sm" />
                            </div>
                        </div>

                        <div className="form-control col-span-1">
                            <label className="label pt-0 pb-1.5">
                                <span className="label-text font-bold text-slate-600 dark:text-slate-300 uppercase text-[11px] tracking-widest">Tutor Image URL</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500 pointer-events-none">
                                    <FiImage size={16} />
                                </span>
                                <input type="url" name="image" placeholder="https://example.com/tutor.jpg" className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 rounded-xl transition-colors text-sm cursor-text" required />
                            </div>
                        </div>

                        <div className="form-control col-span-1">
                            <label className="label pt-0 pb-1.5">
                                <span className="label-text font-bold text-slate-600 dark:text-slate-300 uppercase text-[11px] tracking-widest">Expert Language</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500 pointer-events-none z-10">
                                    <FiGlobe size={16} />
                                </span>
                                <select name="language" className="select w-full pl-11 pr-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 rounded-xl transition-colors text-sm cursor-pointer h-auto py-2.5 min-h-0" required>
                                    <option value="" disabled selected>Select Language</option>
                                    <option value="English">English</option>
                                    <option value="Spanish">Spanish</option>
                                    <option value="French">French</option>
                                    <option value="German">German</option>
                                    <option value="Japanese">Japanese</option>
                                    <option value="Arabic">Arabic</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-control col-span-1 md:col-span-2">
                            <label className="label pt-0 pb-1.5">
                                <span className="label-text font-bold text-slate-600 dark:text-slate-300 uppercase text-[11px] tracking-widest">Price per session (USD)</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500 pointer-events-none">
                                    <FiDollarSign size={16} />
                                </span>
                                <input type="number" name="price" placeholder="E.g. 25" min="1" className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 rounded-xl transition-colors text-sm cursor-text" required />
                            </div>
                        </div>

                        <div className="form-control col-span-1 md:col-span-2">
                            <label className="label pt-0 pb-1.5">
                                <span className="label-text font-bold text-slate-600 dark:text-slate-300 uppercase text-[11px] tracking-widest">Short Description</span>
                            </label>
                            <div className="relative">
                                <span className="absolute top-3.5 left-0 flex items-start pl-4 text-slate-400 dark:text-slate-500 pointer-events-none">
                                    <FiAlignLeft size={16} />
                                </span>
                                <textarea name="description" placeholder="A brief about the tutor, expertise, teaching style..." className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 rounded-xl transition-colors min-h-[100px] text-sm cursor-text" required></textarea>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 border-none text-white font-bold text-base rounded-xl mt-5 shadow-lg shadow-indigo-600/20 py-2.5 h-auto cursor-pointer transition-all">
                        Submit Tutor
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTutor;