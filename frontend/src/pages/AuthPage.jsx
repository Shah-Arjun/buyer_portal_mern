import React, { useState } from 'react';
import Logo from './../assets/property.png';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        password: "",
        confirmPassword: ""
    });

    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.email || !formData.password) {
            return alert("Please fill all fields");
        }

        try {
            if (isLogin) {
                // LOGIN
                const res = await fetch("https://buyer-portal-mern.onrender.com/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password
                    })
                });

                const data = await res.json();

                if (!res.ok) throw new Error(data.message || "Login failed");

                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                alert("Login successful!");
                navigate("/");
            } else {
                // SIGNUP
                if (formData.password !== formData.confirmPassword) {
                    alert("Passwords do not match");
                    return;
                }

                const res = await fetch("https://buyer-portal-mern.onrender.com/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        role: formData.role,
                        password: formData.password
                    })
                });

                const data = await res.json();

                if (!res.ok) throw new Error(data.message || "Signup failed");

                alert("Signup successful! Please login.");
                setIsLogin(true);
                resetForm();
            }
        } catch (err) {
            console.error(err);
            alert(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img src={Logo} alt="Company Logo" className="mx-auto h-20 w-auto mb-6" />

                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Welcome to Adam's Real Estate
                </h1>

                {/* Toggle Buttons */}
                <div className="relative flex bg-blue-500 rounded-full p-1 mb-8">
                    <div
                        className={`absolute top-1 left-1 w-1/2 h-[calc(100%-8px)] rounded-full bg-white transition-all duration-300 ease-in-out ${
                            isLogin ? "translate-x-0" : "translate-x-full"
                        }`}
                    />

                    <button
                        onClick={() => setIsLogin(true)}
                        className={`relative z-10 w-1/2 py-2.5 text-sm font-semibold transition-colors rounded-full ${
                            isLogin ? "text-gray-800" : "text-white"
                        }`}
                    >
                        Login
                    </button>

                    <button
                        onClick={() => setIsLogin(false)}
                        className={`relative z-10 w-1/2 py-2.5 text-sm font-semibold transition-colors rounded-full ${
                            !isLogin ? "text-gray-800" : "text-white"
                        }`}
                    >
                        Sign Up
                    </button>
                </div>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                                Full Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>
                    )}

                    {!isLogin && (
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-900">
                            Select Role
                            </label>
                            <div className="mt-2">
                            <select
                                id="role"
                                name="role"
                                required
                                value={formData.role}
                                onChange={handleChange}
                                className="block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                            >
                                <option value="">-- Choose Role --</option>
                                <option value="buyer">Buyer</option>
                                <option value="seller">Seller</option>
                            </select>
                            </div>
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="email"
                                className="block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                Password
                            </label>
                            {isLogin && (
                                <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            )}
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete={isLogin ? "current-password" : "new-password"}
                                className="block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                            />
                        </div>
                    </div>

                    {!isLogin && (
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">
                                Confirm Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? "Processing..." : isLogin ? "Login" : "Create Account"}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-500">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <span
                        onClick={() => {
                            setIsLogin(!isLogin);
                            resetForm();
                        }}
                        className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
                    >
                        {isLogin ? "Sign up" : "Login"}
                    </span>
                </p>
            </div>
        </div>
    );
}

export default AuthPage;