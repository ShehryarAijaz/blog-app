import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice.js";
import { Button, Input, Logo } from "../components/index.js";
import authService from "../appwrite/auth.service.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-lg p-10 pt-6`}
      >
        <span className="text-2xl text-gray-600 font-bold">
          <Logo width="30px" />
        </span>
        <h2 className="text-xl mt-4">Login to your account</h2>
        <p className="text-sm text-gray-500">
          Don&apos;t have an account?
          <Link to="/signup" className="text-blue-500">
            Signup
          </Link>
        </p>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit(login)}>
          <div className="mt-8">
            <div className="space-y-5">
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) => {
                      return (
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid email")}}})}
              />
              <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                {...register("password", {
                    required: true,
                    validate: {
                        matchPattern: (value) => {
                            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) || "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character";
                        }
                    }
                })}
              />
              <Button
              type="submit"
              className="w-full">Login</Button>
              
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
