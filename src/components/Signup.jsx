import React, { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          username,
        }),
      });

      const data = await response.json();
      console.log("data", data);

      if (response.ok) {
        setMessage(data.message);
        setEmail("");
        setPassword("");
        setUsername("");
      } else {
        throw new Error(data.message || "Error occurred during signup");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="flex justify-center m-5 p-5  bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        {message && <p className="text-center text-green-500">{message}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">
              Username
            </label>
            <input
              className="border border-gray-300 p-2 w-full rounded"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              className="border border-gray-300 p-2 w-full rounded"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              className="border border-gray-300 p-2 w-full rounded"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
