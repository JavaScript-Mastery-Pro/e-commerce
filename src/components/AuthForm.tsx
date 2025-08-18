"use client";

import { useState } from "react";

type Props = {
  mode: "sign-in" | "sign-up";
  cta?: string;
};

export default function AuthForm({ mode, cta }: Props) {
  const [show, setShow] = useState(false);

  return (
    <form className="space-y-5" onSubmit={(e) => e.preventDefault()} noValidate>
      {mode === "sign-up" && (
        <div className="space-y-2">
          <label htmlFor="name" className="text-dark-900 text-caption">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            className="w-full rounded-xl border border-light-300 bg-light-100 px-4 py-3 text-dark-900 placeholder:text-dark-500 outline-none focus:ring-2 focus:ring-dark-900/20"
          />
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="email" className="text-dark-900 text-caption">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="johndoe@gmail.com"
          className="w-full rounded-xl border border-light-300 bg-light-100 px-4 py-3 text-dark-900 placeholder:text-dark-500 outline-none focus:ring-2 focus:ring-dark-900/20"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-dark-900 text-caption">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={show ? "text" : "password"}
            autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
            placeholder={mode === "sign-up" ? "minimum 8 characters" : "your password"}
            className="w-full rounded-xl border border-light-300 bg-light-100 px-4 py-3 pr-12 text-dark-900 placeholder:text-dark-500 outline-none focus:ring-2 focus:ring-dark-900/20"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-700 text-footnote hover:text-dark-900"
            aria-pressed={show}
            aria-controls="password"
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-dark-900 text-light-100 px-6 py-3 text-body-medium hover:bg-dark-700 transition"
      >
        {cta ?? (mode === "sign-in" ? "Sign In" : "Sign Up")}
      </button>

      {mode === "sign-up" && (
        <p className="text-footnote text-dark-700">
          By signing up, you agree to our{" "}
          <a href="#" className="underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
        </p>
      )}
    </form>
  );
}
