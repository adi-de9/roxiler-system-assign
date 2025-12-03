import React from "react";
import { Link } from "react-router";

function HomePage() {
    return (
        <div className="flex flex-col justify-center items-center gap-y-4">
            <h2>HomePage</h2>
            <Link to="/dashboard" className="btn bg-indigo-600 hover:bg-indigo-700 text-white">
                Dashboard
            </Link>
        </div>
    );
}

export default HomePage;
