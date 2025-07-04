import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import type { AuthFormData } from "../../type";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { signUpUser } from "../../redux/auth/authReducers";

const Signup = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
  });
  const [isloading, setIsloading] = useState<boolean>(false);

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {

    console.log("------onChange-------------");
    const { name, value } = ev.target;
    console.log(`${name} : ${value}`);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>): void => {
    ev.preventDefault();

    setIsloading(true);
    dispatch(signUpUser(formData));
    setIsloading(false);
  };

  console.log(formData);

  return (
    <Layout>
      <div className="flex items-center justify-center p-4 w-full">
  
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Join us Today
          </h1>

          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                autoComplete="on"
                required
                placeholder="Enter your email"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                onChange={handleChange}
                type="password"
                name="password"
                autoComplete="on"
                required
                placeholder="Enter your password"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-green-500 text-white font-bold rounded-md shadow-md transition duration-300 disabled:bg-green-300 disabled:cursor-not-allowed flex items-center justify-center"
            >
              Sign Up
            </button>
          </form>

          <Link
            to={"/sign-in"}
            className="text-sm font-medium  block py-3 text-center text-indigo-600 hover:text-indigo-800 transition-all duration-300 hover:"
          >
            Don't have Account ?
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
