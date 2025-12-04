import React from "react";
import { Link } from "react-router";

function HomePage() {
    return (
        <div className="flex flex-col justify-center items-center gap-y-4">
            <h2>HomePage</h2>
            <p className="text-sm text-gray-500 mt-2">Note: Backend deployed on Render, please wait at least 1 minute for it to load.</p>
            <Link to="/dashboard" className="btn bg-indigo-600 hover:bg-indigo-700 text-white">
                Dashboard
            </Link>
        </div>
    );
}

export default HomePage;
