import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useTitle from '../hooks/useTitle';
import { FiEdit, FiTrash2, FiInbox, FiX, FiDollarSign, FiPhone, FiImage, FiFileText } from 'react-icons/fi';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const MyTutors = () => {
    useTitle('My Tutors');
    const { user } = useContext(AuthContext);
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedTutor, setSelectedTutor] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/my-tutors?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setTutors(data);
                } else {
                    setTutors([]);
                }
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            });
    }, [user?.email]);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4f46e5',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Yes, delete it!',
            background: document.documentElement.classList.contains('dark') ? '#0B1120' : '#ffffff',
            color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/tutors/${id}`, {
                    method: 'DELETE',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('access-token')}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: 'Deleted!',
                                text: 'Your tutor profile has been removed.',
                                icon: 'success',
                                background: document.documentElement.classList.contains('dark') ? '#0B1120' : '#ffffff',
                                color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000',
                            });
                            const remaining = tutors.filter(tutor => tutor._id !== id);
                            setTutors(remaining);
                        }
                    });
            }
        });
    };

    const handleEditClick = (tutor) => {
        setSelectedTutor(tutor);
        setIsModalOpen(true);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const price = form.price.value;
        const phone = form.phone.value;
        const image = form.image.value;
        const description = form.description.value;

        const updatedData = { price, phone, image, description };

        fetch(`http://localhost:5000/tutors/${selectedTutor._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('access-token')}`
            },
            body: JSON.stringify(updatedData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Tutor profile updated successfully!');
                    setIsModalOpen(false);

                    const updatedTutors = tutors.map(tutor =>
                        tutor._id === selectedTutor._id ? { ...tutor, ...updatedData } : tutor
                    );
                    setTutors(updatedTutors);
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
        <div className="min-h-screen py-16 px-4 md:px-8 bg-[#F8FAFC] dark:bg-[#030712] transition-colors duration-500 font-sans relative">

            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-500/10 dark:bg-indigo-500/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-teal-500/10 dark:bg-teal-500/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-12 text-center">
                    <h2 className="text-4xl md:text-5xl font-light text-slate-900 dark:text-white tracking-tight mb-3">
                        My Added <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-indigo-400 dark:to-teal-400 font-bold">Tutors</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
                        Manage and optimize your deployed educator profiles
                    </p>
                </div>

                {tutors.length === 0 ? (
                    <div className="text-center py-24 bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-xl rounded-[2.5rem] border border-slate-200/80 dark:border-white/10 shadow-lg max-w-2xl mx-auto">
                        <div className="w-20 h-20 bg-indigo-50 dark:bg-white/5 text-indigo-400 dark:text-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-indigo-100/50 dark:border-white/10">
                            <FiInbox size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">No Tutors Found</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium max-w-sm mx-auto">
                            Your deployment network is currently empty. Head over to the "Add Tutor" section to initialize a new profile.
                        </p>
                    </div>
                ) : (
                    <div className="bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-xl rounded-[2rem] shadow-lg border border-slate-200/80 dark:border-white/10 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/80 dark:bg-white/[0.02] border-b border-slate-200/80 dark:border-white/10">
                                        <th className="py-5 px-6 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest whitespace-nowrap">Tutor Profile</th>
                                        <th className="py-5 px-6 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest whitespace-nowrap">Specialty</th>
                                        <th className="py-5 px-6 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest whitespace-nowrap">Base Rate</th>
                                        <th className="py-5 px-6 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Operations</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                    {tutors.map((tutor) => (
                                        <tr key={tutor._id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-colors group">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-[10px] overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-sm shrink-0">
                                                        <img src={tutor.image} alt={tutor.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black text-slate-900 dark:text-white mb-0.5 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors whitespace-nowrap">{tutor.name}</p>
                                                        <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5 whitespace-nowrap">
                                                            <FiPhone size={10} /> {tutor.phone || "No phone added"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 px-3 py-1.5 rounded-lg border border-indigo-100/50 dark:border-indigo-500/20 whitespace-nowrap">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
                                                    <span className="text-[10px] font-bold uppercase tracking-wider">{tutor.language}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="text-sm font-black text-slate-800 dark:text-slate-200 whitespace-nowrap">${tutor.price} <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">/ HR</span></span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => handleEditClick(tutor)}
                                                        className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white bg-slate-50 dark:bg-white/5 hover:bg-emerald-500 dark:hover:bg-emerald-500 rounded-xl transition-all duration-300 outline-none cursor-pointer border border-transparent hover:border-emerald-600 shadow-sm"
                                                        title="Modify Profile"
                                                    >
                                                        <FiEdit size={14} className="pointer-events-none" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(tutor._id)}
                                                        className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white bg-slate-50 dark:bg-white/5 hover:bg-rose-500 dark:hover:bg-rose-500 rounded-xl transition-all duration-300 outline-none cursor-pointer border border-transparent hover:border-rose-600 shadow-sm"
                                                        title="Delete Profile"
                                                    >
                                                        <FiTrash2 size={14} className="pointer-events-none" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal - Fixed z-index and optimized positioning */}
            {isModalOpen && selectedTutor && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#0B1120] rounded-[2rem] w-full max-w-md p-6 md:p-8 shadow-2xl border border-slate-200 dark:border-white/10 relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 hover:bg-rose-500 hover:text-white transition-all duration-300 outline-none cursor-pointer"
                        >
                            <FiX size={14} className="pointer-events-none" />
                        </button>

                        <div className="mb-6 pr-8">
                            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1 tracking-tight">System Update</h3>
                            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Target: <span className="text-indigo-600 dark:text-indigo-400">{selectedTutor.name}</span></p>
                        </div>

                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div className="relative">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Hourly Rate (USD)</label>
                                <div className="relative">
                                    <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input type="number" name="price" defaultValue={selectedTutor.price} className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-white/5 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium cursor-text" required />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Phone Number</label>
                                <div className="relative">
                                    <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input type="text" name="phone" defaultValue={selectedTutor.phone} className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-white/5 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium cursor-text" required />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Image URL</label>
                                <div className="relative">
                                    <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input type="url" name="image" defaultValue={selectedTutor.image} className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-white/5 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium cursor-text" required />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Professional Bio</label>
                                <div className="relative">
                                    <FiFileText className="absolute left-4 top-3.5 text-slate-400" size={16} />
                                    <textarea name="description" defaultValue={selectedTutor.description} rows="3" className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-white/5 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium resize-none cursor-text" required></textarea>
                                </div>
                            </div>

                            <div className="pt-2">
                                <button type="submit" className="w-full bg-slate-900 hover:bg-indigo-600 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 text-white font-bold py-3.5 rounded-xl text-sm transition-all duration-300 outline-none cursor-pointer tracking-wide shadow-md">
                                    Execute Optimization
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyTutors;