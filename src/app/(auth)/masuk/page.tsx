"use client";

import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { validateEmail } from "../../../../lib/utils";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [emailInputError, setEmailInputError] = useState<boolean>(false);
  const [passwordInputError, setPasswordInputError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false); // To toggle password visibility
  const router = useRouter(); // useRouter for navigation

  // Validate email and password when either input changes
  useEffect(() => {
    validate();
  }, [email, password]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      callbackUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
      redirect: false,
    });

    setIsLoading(false);

    if (res?.ok) {
      // Successful login
      console.log("success");
      router.push("/admin"); // Redirect to dashboard or appropriate page
    } else {
      // Failed login
      setError("Failed! Check your input and try again.");
      console.log("Failed", res);
    }
  };

  // Validate email and password inputs
  const validate = () => {
    const emailIsValid = validateEmail(email);

    if (!emailIsValid) {
      setEmailInputError(true);
    } else {
      setEmailInputError(false);
    }

    if (password.length < 6) {
      setPasswordInputError(true);
    } else {
      setPasswordInputError(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Masuk
        </h2>

        {/* Email Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className={`border-2 border-${
              emailInputError ? "red-500" : "primary-500"
            } 
                        shadow-sm appearance-none rounded w-full py-3 px-4 text-gray-700 
                        focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary`}
            id="email"
            type="text"
            placeholder="Masukan email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailInputError && (
            <p className="text-red-500 text-xs mt-2">
              Masukkan email yang valid.
            </p>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="password"
          >
            Kata Sandi
          </label>
          <div className="relative">
            <input
              className={`border-2 border-${
                passwordInputError ? "red-500" : "primary"
              } 
                          shadow-sm appearance-none rounded w-full py-3 px-4 text-gray-700 mb-3 
                          focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary`}
              id="password"
              type={showPassword ? "text" : "password"} // Toggle password visibility
              placeholder="Masukan kata sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? (
                <EyeIcon className="w-5 h-5" />
              ) : (
                <EyeSlashIcon className="w-5 h-5" />
              )}
            </button>
          </div>
          {passwordInputError && (
            <p className="text-red-500 text-xs mt-2">
              Kata sandi harus terdiri dari minimal 6 karakter.
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg 
                      hover:bg-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10
                      transition-all duration-300"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Harap tunggu..." : "Masuk"}
          </button>
        </div>

        {/* Error Message */}
        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
      </form>
    </div>
  );
};

export default LoginPage;
