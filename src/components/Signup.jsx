import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createAccount as authSignup } from "../appwrite/config.service.js";
import { Button, Input, Logo } from "../components/index.js";
import authService from "../appwrite/auth.service.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const signup = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
        }
        navigate("/");
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
        <h2 className="text-xl mt-4">Create an account</h2>
        <p className="text-sm text-gray-500">
          Already have an account?
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit(signup)}>
          <div className="mt-8">
            <div className="space-y-5">
              <Input
                label="Name"
                placeholder="Enter your name"
                type="text"
                {...register("name", {
                  required: true,
                  validate: {
                    matchPattern: (value) => {
                      return (
                        /^[a-zA-Z]+$/.test(value) ||
                        "Name must contain only letters"
                      );
                    },
                  },
                })}
              />
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) => {
                      return (
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                          value
                        ) || "Email address must be a valid email"
                      );
                    },
                  },
                })}
              />
              <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                {...register("password", {
                  required: true,
                  validate: {
                    matchPattern: (value) => {
                      return (
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                          value
                        ) ||
                        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                      );
                    },
                  },
                })}
              />
              <Button type="submit" className="w-full">
                Signup
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
