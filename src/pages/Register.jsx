import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { FiUser, FiMail, FiImage, FiLock, FiCheckCircle, FiEye, FiEyeOff, FiX } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import useTitle from '../hooks/useTitle';

const Register = () => {
    useTitle("Register");
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
                toast.success("Welcome! Logged in with Google successfully.");
                navigate('/');
            })
            .catch((err) => setError(err.message));
    };

    return (
        <div className="w-full min-h-screen bg-[#F8FAFC] dark:bg-[#030712] transition-colors duration-500 font-sans relative overflow-hidden flex items-center justify-center px-4 py-16 z-0">

            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute top-[-15%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-[140px]"></div>
                <div className="absolute bottom-[-15%] right-[-10%] w-[60vw] h-[60vw] bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-[140px]"></div>
            </div>

            <div className="max-w-md w-full bg-white/90 dark:bg-[#0B1120]/90 backdrop-blur-3xl border border-slate-200/80 dark:border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/30 dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5">

                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-light text-slate-900 dark:text-white tracking-tight mb-2">
                        Create an <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-indigo-400 dark:to-teal-400 font-bold">Account</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                        Join the global educator network
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-600 dark:bg-rose-950/30 dark:border-rose-900/50 dark:text-rose-400 rounded-2xl text-xs font-semibold">
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
                        <div className="relative">
                            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input type="text" name="name" placeholder="John Doe" className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#111827] border border-slate-200/80 dark:border-white/5 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium" required />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
                        <div className="relative">
                            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input type="email" name="email" placeholder="example@mail.com" className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#111827] border border-slate-200/80 dark:border-white/5 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium" required />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Photo URL</label>
                        <div className="relative">
                            <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input type="url" name="photo" placeholder="https://example.com/avatar.jpg" className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#111827] border border-slate-200/80 dark:border-white/5 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium" required />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Password</label>
                        <div className="relative">
                            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input type={showPassword ? "text" : "password"} name="password" placeholder="••••••••" className="w-full pl-11 pr-12 py-3 bg-slate-50 dark:bg-[#111827] border border-slate-200/80 dark:border-white/5 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium" required />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer outline-none">
                                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Confirm Password</label>
                        <div className="relative">
                            <FiCheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="••••••••" className="w-full pl-11 pr-12 py-3 bg-slate-50 dark:bg-[#111827] border border-slate-200/80 dark:border-white/5 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium" required />
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer outline-none">
                                {showConfirmPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                            </button>
                        </div>
                    </div>

                    <div className="pt-3">
                        <button type="submit" className="w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:from-indigo-600 hover:to-indigo-700 dark:from-white dark:to-slate-200 dark:hover:from-indigo-400 dark:hover:to-indigo-500 dark:text-slate-900 dark:hover:text-white text-white font-bold py-4 rounded-2xl text-sm transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-indigo-500/20 hover:-translate-y-0.5 outline-none cursor-pointer tracking-wide">
                            Register Account
                        </button>
                    </div>
                </form>

                <div className="relative flex py-5 items-center">
                    <div className="flex-grow border-t border-slate-200 dark:border-white/5"></div>
                    <span className="flex-shrink mx-4 text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">OR</span>
                    <div className="flex-grow border-t border-slate-200 dark:border-white/5"></div>
                </div>

                <button type="button" onClick={handleGoogleRegister} className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white hover:bg-slate-50 dark:bg-white/[0.02] dark:hover:bg-white/[0.07] text-slate-700 dark:text-slate-200 font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:scale-[1.01] outline-none cursor-pointer shadow-sm">
                    <svg className="w-4 h-4 min-w-[16px]" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.53-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-8.83z" />
                        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.15C3.18 21.88 7.31 24 12 24z" />
                        <path fill="#FBBC05" d="M5.32 14.24A7.16 7.16 0 0 1 5 12c0-.79.13-1.57.32-2.34V6.51H1.21A11.94 11.94 0 0 0 0 12c0 1.92.45 3.74 1.21 5.39l4.11-3.15z" />
                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.18 2.12 1.21 6.51l4.11 3.15c.94-2.85 3.57-4.96 6.68-4.96z" />
                    </svg>
                    Continue with Google
                </button>

                <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-6 font-medium">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-black hover:underline transition-all">
                        Login here
                    </Link>
                </p>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/60 dark:bg-black/80 backdrop-blur-sm transition-opacity duration-300">
                    <div className="bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-3xl max-w-sm w-full p-8 rounded-[2.5rem] shadow-2xl border border-slate-200/80 dark:border-white/10 text-center relative scale-100 transition-transform duration-300">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 hover:bg-rose-500 hover:text-white transition-all duration-300 outline-none cursor-pointer">
                            <FiX size={14} className="pointer-events-none" />
                        </button>
                        <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-emerald-100/50 dark:border-emerald-500/20">
                            <FiCheckCircle size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Registration Successful!</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mb-8">Your account has been verified. Please proceed to login with your credentials.</p>
                        <button onClick={() => { setIsModalOpen(false); navigate('/login'); }} className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 dark:from-emerald-500 dark:to-teal-500 dark:hover:from-emerald-400 dark:hover:to-teal-400 text-white dark:text-slate-900 font-bold py-4 rounded-2xl text-sm transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-0.5 outline-none cursor-pointer tracking-wide">
                            Go to Login
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;