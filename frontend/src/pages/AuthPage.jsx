import React, { useState } from 'react';
import Logo from './../assets/property.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from "lucide-react";   





function AuthPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        password: "",
        confirmPassword: ""
    });

    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    //for pw
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    //handle input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };



    //reset form after failed/submit
    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        });
    };



    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.email || !formData.password) {
            alert("Please fill all fields");
            setLoading(false);
            return;
        }

        try {
            //FOR LOGIN
            if (isLogin) {
                // hits backend api
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

                login(data.user, data.token);
                alert("Login successful!");
                navigate("/");
            } else {
                //FOR SIGNUP
                if (formData.password !== formData.confirmPassword) {
                    alert("Confirm passwords did not match");
                    setLoading(false);
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

                alert("Successfully registered! Please login.");
                setIsLogin(true);
                resetForm();
            }
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-6xl w-full">
                <div className="flex flex-col lg:flex-row bg-white rounded-3xl shadow-xl overflow-hidden">

                    {/* ================================== LEFT SIDE ===================*/}
                    <div className="lg:w-1/2 bg-indigo-600 p-8 lg:p-12 flex flex-col justify-center text-white">
                        <div className="max-w-md mx-auto text-center lg:text-left">
                            <img src={Logo} alt="Company Logo" className="mx-auto lg:mx-0 h-20 w-auto mb-8" />
                            
                            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">Welcome to Adam's Real Estate</h1>
                            
                            <p className="text-lg text-indigo-100">
                                Find your perfect property in Nepal with ease. 
                                Buy, sell, and discover amazing homes.
                            </p>

                            <div className="hidden lg:block mt-12">
                                <div className="flex items-center gap-4 text-sm opacity-75">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    Trusted by thousands of buyers
                                </div>
                            </div>
                        </div>
                    </div>    {/*left div ends here */}



                    {/* ==================== RIGHT SIDE ====================== */}
                    <div className="lg:w-1/2 p-8 lg:p-8">
                        <div className="max-w-md mx-auto">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center lg:text-left">
                                {isLogin ? "Login to your account" : "Create new account"}
                            </h2>

                            {/* Toggle Buttons */}
                            <div className="relative flex bg-gray-100 rounded-full p-1 mb-10">
                                <div
                                    className={`absolute top-1 left-1 w-1/2 h-[calc(100%-8px)] rounded-full bg-white shadow transition-all duration-300 ${
                                        isLogin ? "translate-x-0" : "translate-x-full"
                                    }`}
                                />
                                <button
                                    onClick={() => setIsLogin(true)}
                                    className={`relative z-10 w-1/2 py-3 text-sm font-semibold rounded-full transition-colors ${
                                        isLogin ? "text-gray-900" : "text-gray-500"
                                    }`}
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => setIsLogin(false)}
                                    className={`relative z-10 w-1/2 py-3 text-sm font-semibold rounded-full transition-colors ${
                                        !isLogin ? "text-gray-900" : "text-gray-500"
                                    }`}
                                >
                                    Sign Up
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/*name, role */}
                                {!isLogin && (
                                    <>
                                        <div>
                                            <input
                                                name="name"
                                                type="text"
                                                required
                                                placeholder='Enter full name...'
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="block w-full rounded-xl bg-gray-50 px-4 py-3 outline-none border border-gray-300 focus:border-indigo-500"
                                            />
                                        </div>

                                        <div>
                                            <select
                                                name="role"
                                                required
                                                value={formData.role}
                                                onChange={handleChange}
                                                className="block w-full rounded-xl bg-gray-50 px-4 py-3 outline-none border border-gray-300 focus:border-indigo-500"
                                            >
                                                <option value="buyer">Buyer</option>
                                                <option value="seller">Seller</option>
                                            </select>
                                        </div>
                                    </>
                                )}

                                {/* email */}
                                <div>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        placeholder='Enter your email...'
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="block w-full rounded-xl bg-gray-50 px-4 py-3 outline-none border border-gray-300 focus:border-indigo-500"
                                    />
                                </div>

                                {/* password */}
                                <div className=''>
                                    <div className="relative">
                                        <input
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="block w-full rounded-xl bg-gray-50 px-4 py-3 outline-none border border-gray-300 focus:border-indigo-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                    {isLogin && <p className='text-indigo-500 pt-2 text-end'>Forgot password?</p>}
                                </div>

                                {/* Confirm password --> if signup*/}
                                {!isLogin && (
                                    <div>
                                        <div className="relative">
                                            <input
                                                name="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                required
                                                placeholder="Enter confirm password..."
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                className="block w-full rounded-xl bg-gray-50 px-4 py-3 outline-none border border-gray-300 focus:border-indigo-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            >
                                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                    </div>
                                )}




                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-indigo-600 text-white py-3.5 rounded-2xl font-semibold hover:bg-indigo-700 transition disabled:opacity-70 mt-4"
                                >
                                    {loading ? "Processing..." : isLogin ? "Login" : "Create Account"}
                                </button>
                            </form>

                            <p className="mt-8 text-center text-sm text-gray-500">
                                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                                <span
                                    onClick={() => { setIsLogin(!isLogin); resetForm(); }}
                                    className="font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
                                >
                                    {isLogin ? "Sign up" : "Login"}
                                </span>
                            </p>
                        </div>
                    </div>  {/*right div ends here */}
                </div>
            </div>
        </div>
    );
}

export default AuthPage;