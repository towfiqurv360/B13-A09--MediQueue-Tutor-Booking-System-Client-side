import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Home = () => {
    const dummyTutors = [
        { id: 1, name: "John Doe", subject: "Mathematics", image: "https://i.ibb.co/6P83Z4P/tutor1.jpg", fee: 15 },
        { id: 2, name: "Sarah Smith", subject: "English", image: "https://i.ibb.co/30kL61D/tutor2.jpg", fee: 20 },
        { id: 3, name: "David Johnson", subject: "Physics", image: "https://i.ibb.co/1K57pDq/tutor3.jpg", fee: 25 },
        { id: 4, name: "Emily Davis", subject: "Chemistry", image: "https://i.ibb.co/b3XpLwV/tutor4.jpg", fee: 18 },
        { id: 5, name: "Michael Brown", subject: "Biology", image: "https://i.ibb.co/m5Z4r2M/tutor5.jpg", fee: 22 },
        { id: 6, name: "Jessica Wilson", subject: "Computer Science", image: "https://i.ibb.co/1q2Z3x4/tutor6.jpg", fee: 30 },
    ];

    return (
        <div className="w-full">
            {/* --- Banner Section (Swiper Slider) --- */}
            <section className="h-[400px] md:h-[500px] w-full bg-gray-100">
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper h-full"
                >
                    {/* Slide 1 */}
                    <SwiperSlide className="flex flex-col items-center justify-center text-center p-8 bg-blue-50 h-full">
                        <h2 className="text-3xl md:text-5xl font-bold text-blue-900 mb-4">Master Mathematics with Experts</h2>
                        <p className="text-lg text-gray-700 mb-6">Build a strong foundation and score higher in your exams.</p>
                        <Link to="/tutors" className="btn btn-primary">Find Tutors</Link>
                    </SwiperSlide>

                    {/* Slide 2 */}
                    <SwiperSlide className="flex flex-col items-center justify-center text-center p-8 bg-green-50 h-full">
                        <h2 className="text-3xl md:text-5xl font-bold text-green-900 mb-4">Learn New Languages Faster</h2>
                        <p className="text-lg text-gray-700 mb-6">Connect with native speakers and professional language coaches.</p>
                        <Link to="/tutors" className="btn btn-primary bg-green-600 border-none hover:bg-green-700">Find Tutors</Link>
                    </SwiperSlide>

                    {/* Slide 3 */}
                    <SwiperSlide className="flex flex-col items-center justify-center text-center p-8 bg-purple-50 h-full">
                        <h2 className="text-3xl md:text-5xl font-bold text-purple-900 mb-4">Ace Your Science Subjects</h2>
                        <p className="text-lg text-gray-700 mb-6">Interactive sessions to make learning Physics and Chemistry easy.</p>
                        <Link to="/tutors" className="btn btn-primary bg-purple-600 border-none hover:bg-purple-700">Find Tutors</Link>
                    </SwiperSlide>
                </Swiper>
            </section>

            {/* --- Available Tutors Section --- */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Available Tutors</h2>
                    <p className="mt-3 text-gray-600">Find the perfect mentor to guide your learning journey.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dummyTutors.map((tutor) => (
                        <div key={tutor.id} className="card bg-base-100 shadow-md border border-gray-200">
                            <div className="card-body items-center text-center">
                                <div className="w-24 h-24 rounded-full bg-gray-300 mb-4 overflow-hidden">
                                    {/* Image placeholder */}
                                    <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white font-bold text-xl">
                                        {tutor.name.charAt(0)}
                                    </div>
                                </div>
                                <h2 className="card-title text-xl font-bold text-gray-800">{tutor.name}</h2>
                                <p className="text-blue-600 font-medium">{tutor.subject}</p>
                                <p className="text-gray-600 font-semibold mt-2">Fee: ${tutor.fee} / hr</p>
                                <div className="card-actions justify-end mt-4">
                                    <Link to={`/tutor/${tutor.id}`} className="btn btn-outline btn-primary btn-sm">Book Session</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- Extra Section 1: How It Works --- */}
            <section className="bg-blue-50 py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-10">How MediQueue Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-white rounded-lg shadow-sm">
                            <div className="text-4xl mb-4">🔍</div>
                            <h3 className="text-xl font-bold mb-2">Find a Tutor</h3>
                            <p className="text-gray-600">Browse through our verified list of expert tutors across various subjects.</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-sm">
                            <div className="text-4xl mb-4">📅</div>
                            <h3 className="text-xl font-bold mb-2">Book a Session</h3>
                            <p className="text-gray-600">Select a convenient time slot and book your session instantly without hassle.</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-sm">
                            <div className="text-4xl mb-4">🎓</div>
                            <h3 className="text-xl font-bold mb-2">Start Learning</h3>
                            <p className="text-gray-600">Connect with your tutor online and start achieving your learning goals.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Extra Section 2: Why Choose Us --- */}
            <section className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Us?</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-10">
                    We provide a seamless and conflict-free booking experience, ensuring you get the best educational support when you need it.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <div className="badge badge-primary badge-outline p-4 text-lg">Verified Tutors</div>
                    <div className="badge badge-secondary badge-outline p-4 text-lg">No Time Conflicts</div>
                    <div className="badge badge-accent badge-outline p-4 text-lg">Easy Scheduling</div>
                    <div className="badge badge-info badge-outline p-4 text-lg">Secure Platform</div>
                </div>
            </section>

        </div>
    );
};

export default Home;