import React from 'react';

const AddTutor = () => {
    const handleAddTutor = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const image = form.image.value;
        const language = form.language.value;
        const price = form.price.value;
        const description = form.description.value;

        const tutorData = {
            name,
            email,
            image,
            language,
            price: parseFloat(price),
            description,
            review: 0
        };

        console.log("Form Data:", tutorData);
    };

    return (
        <div className="max-w-3xl mx-auto my-10 p-8 bg-white rounded-lg shadow-md border border-gray-100">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Add New Tutor</h2>

            <form onSubmit={handleAddTutor} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <input type="text" name="name" placeholder="Enter tutor name" className="input input-bordered w-full" required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input type="email" name="email" placeholder="Enter email address" className="input input-bordered w-full" required />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                        <input type="url" name="image" placeholder="Enter image URL" className="input input-bordered w-full" required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                        <select name="language" className="select select-bordered w-full" required>
                            <option value="">Select a language</option>
                            <option value="English">English</option>
                            <option value="Spanish">Spanish</option>
                            <option value="French">French</option>
                            <option value="German">German</option>
                            <option value="Japanese">Japanese</option>
                            <option value="Arabic">Arabic</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price (per hour in USD)</label>
                    <input type="number" name="price" placeholder="Enter hourly rate" className="input input-bordered w-full" required />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea name="description" rows="4" placeholder="Write a short biography or expertise..." className="textarea textarea-bordered w-full" required></textarea>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary w-full md:w-1/2">Submit Application</button>
                </div>
            </form>
        </div>
    );
};

export default AddTutor;