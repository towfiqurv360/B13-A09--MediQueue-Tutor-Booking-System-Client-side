import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        console.log("Login Credentials:", { email, password });
    };

    return (
        <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-lg shadow-md border border-gray-100">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>
            <p className="text-center text-gray-500 mb-8">Log in to access your dashboard and booked sessions.</p>

            <form onSubmit={handleLogin} className="space-y-4">

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" name="email" placeholder="Enter your email" className="input input-bordered w-full" required />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input type="password" name="password" placeholder="Enter your password" className="input input-bordered w-full" required />
                </div>

                <button type="submit" className="btn btn-primary w-full mt-4">Login</button>
            </form>

            <div className="divider my-6">OR</div>
            <button className="btn btn-outline w-full flex items-center justify-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.53-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-8.83z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.15C3.18 21.88 7.31 24 12 24z" />
                    <path fill="#FBBC05" d="M5.32 14.24A7.16 7.16 0 0 1 5 12c0-.79.13-1.57.32-2.34V6.51H1.21A11.94 11.94 0 0 0 0 12c0 1.92.45 3.74 1.21 5.39l4.11-3.15z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.18 2.12 1.21 6.51l4.11 3.15c.94-2.85 3.57-4.96 6.68-4.96z" />
                </svg>
                Continue with Google
            </button>

            <p className="text-sm text-center text-gray-600 mt-6">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-600 font-medium hover:underline">Register here</Link>
            </p>
        </div>
    );
};

export default Login;