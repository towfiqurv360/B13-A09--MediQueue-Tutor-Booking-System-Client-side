import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useTitle from '../hooks/useTitle';
import { FiEdit, FiTrash2, FiInbox } from 'react-icons/fi';
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
        fetch(`http://localhost:5000/my-tutors?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setTutors(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
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
            background: document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff',
            color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/tutors/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: 'Deleted!',
                                text: 'Your tutor has been deleted.',
                                icon: 'success',
                                background: document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff',
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
        const description = form.description.value;

        const updatedData = { price, phone, description };

        fetch(`http://localhost:5000/tutors/${selectedTutor._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Tutor updated successfully!');
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
                        My Added <span className="font-serif italic text-indigo-600 dark:text-indigo-400 font-bold">Tutors</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Manage and monitor the educators you have registered to the system.</p>
                </div>

                {tutors.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-[#0A0F1D] rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm max-w-2xl mx-auto">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-slate-200 dark:border-white/10">
                            <FiInbox size={24} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">No Tutors Found</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium max-w-xs mx-auto mb-6">
                            You haven't added any tutors yet. Go to the "Add Tutor" page to register a new educator.
                        </p>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-white/[0.02] backdrop-blur-2xl rounded-[1.5rem] shadow-sm border border-slate-200 dark:border-white/[0.05] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/5">
                                        <th className="py-4 px-6 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tutor info</th>
                                        <th className="py-4 px-6 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Language</th>
                                        <th className="py-4 px-6 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Price/Hr</th>
                                        <th className="py-4 px-6 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                    {tutors.map((tutor) => (
                                        <tr key={tutor._id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-colors group">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-4">
                                                    <img src={tutor.image} alt="Tutor" className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-white/10" />
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{tutor.name}</p>
                                                        <p className="text-[11px] text-slate-500 dark:text-slate-400">{tutor.phone || "No phone added"}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-indigo-100 dark:border-indigo-500/20">
                                                    {tutor.language}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">${tutor.price}</span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center justify-center gap-3">
                                                    <button
                                                        onClick={() => handleEditClick(tutor)}
                                                        className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg transition-colors outline-none"
                                                        title="Update Tutor"
                                                    >
                                                        <FiEdit size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(tutor._id)}
                                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors outline-none"
                                                        title="Delete Tutor"
                                                    >
                                                        <FiTrash2 size={16} />
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

            {isModalOpen && selectedTutor && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 dark:bg-[#030712]/80 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#0B1120] rounded-[2rem] w-full max-w-md p-6 md:p-8 shadow-2xl border border-slate-200 dark:border-white/10 relative animate-fade-in-up">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                        >
                            ✕
                        </button>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">Update Tutor</h3>
                        <p className="text-xs text-slate-500 mb-6">Modify information for {selectedTutor.name}</p>

                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Hourly Rate ($)</label>
                                <input type="number" name="price" defaultValue={selectedTutor.price} className="w-full bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors" required />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Phone Number</label>
                                <input type="text" name="phone" defaultValue={selectedTutor.phone} className="w-full bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Description</label>
                                <textarea name="description" defaultValue={selectedTutor.description} rows="3" className="w-full bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors" required></textarea>
                            </div>
                            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl text-sm transition-colors mt-2">
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyTutors;