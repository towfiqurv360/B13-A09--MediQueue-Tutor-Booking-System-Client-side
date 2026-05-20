import { Link } from "react-router-dom";
import useTitle from '../hooks/useTitle';

const ErrorPage = () => {
    useTitle("Page Not Found");
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-5xl font-bold text-red-500">404</h1>
            <p className="text-2xl mt-4">Page Not Found</p>
            <Link to="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded">Back to Home</Link>
        </div>
    );
};

export default ErrorPage;