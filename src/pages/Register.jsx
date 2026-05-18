import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;

        const userInfo = { name, email, photo, password };
        console.log("Register User Info:", userInfo);
    };

    return (
        <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-lg shadow-md border border-gray-100">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
            <p className="text-center text-gray-500 mb-8">Join MediQueue to connect with expert tutors globally.</p>

            <form onSubmit={handleRegister} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" name="name" placeholder="Enter your full name" className="input input-bordered w-full" required />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" name="email" placeholder="Enter your email address" className="input input-bordered w-full" required />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                    <input type="url" name="photo" placeholder="Enter profile image URL" className="input input-bordered w-full" required />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input type="password" name="password" placeholder="Create a strong password" className="input input-bordered w-full" required />
                </div>

                <button type="submit" className="btn btn-primary w-full mt-4">Register</button>
            </form>

            <p className="text-sm text-center text-gray-600 mt-6">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 font-medium hover:underline">Login here</Link>
            </p>
        </div>
    );
};

export default Register;