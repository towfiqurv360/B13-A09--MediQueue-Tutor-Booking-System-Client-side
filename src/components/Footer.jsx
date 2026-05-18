const Footer = () => {
    return (
        <footer className="footer p-10 bg-base-200 text-base-content mt-10">
            <nav>
                <header className="footer-title text-lg font-bold text-blue-600">MediQueue</header>
                <p className="max-w-xs">
                    Your trusted platform for finding the best tutors and managing learning sessions efficiently.
                </p>
            </nav>
            <nav>
                <header className="footer-title">Services</header>
                <a className="link link-hover">Find Tutors</a>
                <a className="link link-hover">Book Sessions</a>
                <a className="link link-hover">Online Learning</a>
            </nav>
            <nav>
                <header className="footer-title">Contact Us</header>
                <a className="link link-hover">Email: support@mediqueue.com</a>
                <a className="link link-hover">Phone: +880 123 456 789</a>
                <a className="link link-hover">Location: Dhaka, Bangladesh</a>
            </nav>
            <nav>
                <header className="footer-title">Social</header>
                <div className="flex gap-4">
                    <a className="link link-hover text-2xl">📘</a> {/* Facebook icon placeholder */}
                    <a className="link link-hover text-2xl">𝕏</a> {/* X/Twitter icon placeholder */}
                    <a className="link link-hover text-2xl">📸</a> {/* Instagram icon placeholder */}
                </div>
            </nav>
            <aside className="col-span-full text-center mt-6 border-t pt-4 border-gray-300 w-full">
                <p>Copyright © {new Date().getFullYear()} - All right reserved by MediQueue Tutors</p>
            </aside>
        </footer>
    );
};

export default Footer;