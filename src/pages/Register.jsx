import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLink, FaLock, FaCheckCircle, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Register = () => {
    const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        setError('');

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        if (!/[A-Z]/.test(password)) {
            setError("Password must contain at least one uppercase letter.");
            return;
        }

        if (!/[a-z]/.test(password)) {
            setError("Password must contain at least one lowercase letter.");
            return;
        }

        createUser(email, password)
            .then(() => {
                updateUserProfile(name, photo)
                    .then(() => {
                        form.reset();
                        toast.success("Account created successfully!");
                        setIsModalOpen(true);
                    })
                    .catch((err) => setError(err.message));
            })
            .catch((err) => setError(err.message));
    };

    const handleGoogleRegister = () => {
        setError('');
        signInWithGoogle()
            .then(() => {
                toast.success("Logged in with Google successfully!");
                navigate('/');
            })
            .catch((err) => setError(err.message));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-50 via-slate-100 to-indigo-50/50 px-4 py-16 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            <div className="max-w-md w-full bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] border border-slate-100 dark:border-slate-800/80 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(99,_102,_241,_0.15)]">

                <div className="text-center mb-9">
                    <h2 className="text-4xl font-black tracking-tight text-slate-800 dark:text-slate-100 mb-3">
                        Create an Account
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                        Join MediQueue to connect with expert tutors globally
                    </p>
                </div>

                {error && (
                    <div className="alert alert-error shadow-sm mb-6 rounded-2xl py-3.5 text-sm font-semibold flex items-center gap-2 bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/30 dark:border-rose-900/50 dark:text-rose-400">
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-5">
                    <div className="form-control">
                        <label className="label pt-0 pb-1.5">
                            <span className="label-text font-bold text-slate-700 dark:text-slate-300 text-xs uppercase tracking-wider">Full Name</span>
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500 pointer-events-none">
                                <FaUser size={15} />
                            </span>
                            <input type="text" name="name" placeholder="John Doe" className="input input-bordered w-full pl-11 bg-slate-50/50 focus:bg-white dark:bg-slate-800/40 dark:focus:bg-slate-900 border-slate-200 dark:border-slate-700/80 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-0 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200 rounded-2xl cursor-text" required />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label pt-0 pb-1.5">
                            <span className="label-text font-bold text-slate-700 dark:text-slate-300 text-xs uppercase tracking-wider">Email Address</span>
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500 pointer-events-none">
                                <FaEnvelope size={15} />
                            </span>
                            <input type="email" name="email" placeholder="example@mail.com" className="input input-bordered w-full pl-11 bg-slate-50/50 focus:bg-white dark:bg-slate-800/40 dark:focus:bg-slate-900 border-slate-200 dark:border-slate-700/80 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-0 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200 rounded-2xl cursor-text" required />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label pt-0 pb-1.5">
                            <span className="label-text font-bold text-slate-700 dark:text-slate-300 text-xs uppercase tracking-wider">Photo URL</span>
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500 pointer-events-none">
                                <FaLink size={15} />
                            </span>
                            <input type="url" name="photo" placeholder="https://example.com/avatar.jpg" className="input input-bordered w-full pl-11 bg-slate-50/50 focus:bg-white dark:bg-slate-800/40 dark:focus:bg-slate-900 border-slate-200 dark:border-slate-700/80 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-0 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200 rounded-2xl cursor-text" required />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label pt-0 pb-1.5">
                            <span className="label-text font-bold text-slate-700 dark:text-slate-300 text-xs uppercase tracking-wider">Password</span>
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500 pointer-events-none">
                                <FaLock size={15} />
                            </span>
                            <input type={showPassword ? "text" : "password"} name="password" placeholder="••••••••" className="input input-bordered w-full pl-11 pr-12 bg-slate-50/50 focus:bg-white dark:bg-slate-800/40 dark:focus:bg-slate-900 border-slate-200 dark:border-slate-700/80 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-0 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200 rounded-2xl cursor-text" required />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer">
                                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                            </button>
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label pt-0 pb-1.5">
                            <span className="label-text font-bold text-slate-700 dark:text-slate-300 text-xs uppercase tracking-wider">Confirm Password</span>
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500 pointer-events-none">
                                <FaCheckCircle size={15} />
                            </span>
                            <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="••••••••" className="input input-bordered w-full pl-11 pr-12 bg-slate-50/50 focus:bg-white dark:bg-slate-800/40 dark:focus:bg-slate-900 border-slate-200 dark:border-slate-700/80 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-0 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200 rounded-2xl cursor-text" required />
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer">
                                {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 border-none text-white font-bold text-base shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all duration-300 rounded-2xl mt-4 cursor-pointer">
                        Get Started
                    </button>
                </form>

                <div className="divider my-6 text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-black">OR</div>

                <button type="button" onClick={handleGoogleRegister} className="btn btn-outline w-full flex items-center justify-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 font-bold text-sm shadow-sm transition-all duration-300 cursor-pointer">
                    <svg className="w-5 h-5 min-w-[20px]" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.53-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-8.83z" />
                        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.15C3.18 21.88 7.31 24 12 24z" />
                        <path fill="#FBBC05" d="M5.32 14.24A7.16 7.16 0 0 1 5 12c0-.79.13-1.57.32-2.34V6.51H1.21A11.94 11.94 0 0 0 0 12c0 1.92.45 3.74 1.21 5.39l4.11-3.15z" />
                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.18 2.12 1.21 6.51l4.11 3.15c.94-2.85 3.57-4.96 6.68-4.96z" />
                    </svg>
                    Continue with Google
                </button>

                <p className="text-sm text-center text-slate-500 dark:text-slate-400 mt-7 font-medium">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline transition-all">
                        Login here
                    </Link>
                </p>
            </div>

            {/* Premium Dynamic Modal Container */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300">
                    <div className="bg-white dark:bg-slate-900 max-w-sm w-full p-8 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 text-center relative scale-100 transition-transform duration-300 animate-in fade-in zoom-in-95">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors">
                            <FaTimes size={16} />
                        </button>
                        <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-emerald-100 dark:border-emerald-900/30">
                            <FaCheckCircle size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">Registration Successful!</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-6">Your account has been verified. Please proceed to login with your credentials.</p>
                        <button onClick={() => { setIsModalOpen(false); navigate('/login'); }} className="btn btn-primary w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 border-none text-white font-bold rounded-2xl cursor-pointer shadow-lg shadow-indigo-600/20">
                            Go to Login
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;