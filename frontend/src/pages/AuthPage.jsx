import React, { useState } from 'react'
import Logo from './../assets/property.png'

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true)




  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img src={Logo} alt="Company Logo" className="mx-auto h-20 w-auto mb-6" />

        {/* welcome Text */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Welcome to Adam's Real Estate
        </h1>

        {/* toggle Buttons */}
        <div className="relative flex bg-blue-500 rounded-full p-1 mb-6">

            {/* Sliding Background */}
            <div
            className={`absolute top-1 left-1 w-[48%] h-[calc(100%-8px)] rounded-full bg-white transition-all duration-300 ease-in-out ${
                isLogin ? "translate-x-0" : "translate-x-full"
            }`}
            ></div>

            {/* Login Button */}
            <button
            onClick={() => setIsLogin(true)}
            className={`relative z-10 w-1/2 py-2 text-center font-medium transition ${
                isLogin ? "text-gray-700" : "text-white"
            }`}
            >
                Login
            </button>

            {/* Signup Button */}
            <button
            onClick={() => setIsLogin(false)}
            className={`relative z-10 w-1/2 py-2 text-center font-medium transition ${
                !isLogin ? "text-gray-700" : "text-white"
            }`}
            >
                Signup
            </button>
        </div>
    </div>

    {/*  */}
    <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6">
        <div>
            <label for="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
            <div className="mt-2">
            <input id="email" type="email" name="email" required autocomplete="email" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
        </div>

        <div>
            <div className="flex items-center justify-between">
            <label for="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
            <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>
            </div>
            <div className="mt-2">
            <input id="password" type="password" name="password" required autocomplete="current-password" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
        </div>

        <div>
            <button type="submit" className="flex w-full justify-center rounded-full bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
          >
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>
    </div>
    </div>
  )
}

export default AuthPage