import React, { useEffect, useState } from "react";

const Profile = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Retrieve the username from localStorage
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername || ""); // Fallback to an empty string if not found
  }, []);

  return (
    <div className="flex p-3 justify-center h-3/4 ">
      <div className="bg-white p-10 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome, {username ? username : "User"}!
        </h1>
        <p className="text-gray-600 mb-6">
          This is your profile page where you can view and manage your account
          details and settings.
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Profile;
