import React from "react";
import { Link, useNavigate } from "react-router-dom";
import back from "../../assets/back.png";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import Input from "../../components/Input";
import useAuthStore from "../../stores/authStore";

const signupSchema = z
  .object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .min(0, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string(),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type SignupFormInputs = z.infer<typeof signupSchema>;

const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields, isSubmitting, isValid },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const password = watch("password") || "";
  const confirmPassword = watch("confirmPassword") || "";

  // Password rule checks (same rules as schema)
  const ruleChecks = [
    { id: "len", label: "At least 8 characters", ok: password.length >= 8 },
    { id: "num", label: "Contains a number (0–9)", ok: /[0-9]/.test(password) },
    {
      id: "low",
      label: "Contains a lowercase letter",
      ok: /[a-z]/.test(password),
    },
    {
      id: "upp",
      label: "Contains an uppercase letter",
      ok: /[A-Z]/.test(password),
    },
    {
      id: "sym",
      label: "Contains a symbol",
      ok: /[^A-Za-z0-9]/.test(password),
    },
  ];

  const navigate = useNavigate();
  const { signup } = useAuthStore();

  const onSubmit = handleSubmit((data) => {
    console.log("Signup form submitted:", data);
    const success = signup(data.email, data.password)
    if(success) {
      navigate('/login')
    } else {
      toast.error('Sign Up failed', {
        position: 'top-right',
        autoClose: 3000,
      })
    }
  });

  return (
    <div
      className="min-h-screen min-w-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${back})`,
      }}
    >
      <div className="w-full flex items-center justify-center px-4">
        <div className="mt-16 max-w-lg w-full space-y-8 bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-white/20">
          <h1 className="text-4xl font-extrabold text-center text-white md:text-5xl">
            Sign Up
          </h1>

          <form className="mt-8 space-y-6" onSubmit={onSubmit} noValidate>
            <div className="space-y-6">
              <Input
                id="email"
                type="email"
                label="Email"
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={!!errors.email || undefined}
                error={errors.email?.message}
                className={
                  touchedFields.email && !errors.email
                    ? "border-green-400 focus:ring-green-400"
                    : ""
                }
                {...register("email")}
              />

              {/* Password */}
              <Input
                id="password"
                type="password"
                label="Password"
                placeholder="••••••••"
                autoComplete="new-password"
                aria-invalid={!!errors.password || undefined}
                {...register("password")}
              >
                {/* Password rules: hidden until user types */}
                {password.length > 0 && (
                  <ul className="mt-3 space-y-2" aria-live="polite">
                    {ruleChecks.map((r) => (
                      <li key={r.id} className="flex items-center text-sm pl-5">
                        <span
                          className={`mr-2 inline-flex items-center justify-center h-4 w-4 rounded-full border ${
                            r.ok
                              ? "border-green-400 text-green-400"
                              : "border-gray-400 text-gray-400"
                          }`}
                          aria-hidden="true"
                        >
                          {r.ok ? (
                            <svg viewBox="0 0 24 24" className="h-5 w-4">
                              <path
                                d="M20 6L9 17l-5-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          ) : (
                            <svg viewBox="0 0 24 24" className="h-4 w-4">
                              <circle
                                cx="12"
                                cy="12"
                                r="0"
                                fill="currentColor"
                                opacity="0"
                              />
                            </svg>
                          )}
                        </span>
                        <span
                          className={r.ok ? "text-green-300" : "text-gray-300"}
                        >
                          {r.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </Input>

              {/* Confirm Password */}
              <Input
                id="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="••••••••"
                autoComplete="new-password"
                aria-invalid={!!errors.confirmPassword || undefined}
                error={errors.confirmPassword?.message}
                className={
                  touchedFields.confirmPassword &&
                  confirmPassword === password &&
                  !errors.confirmPassword
                    ? "border-green-400 focus:ring-green-400"
                    : ""
                }
                {...register("confirmPassword")}
              >
                {confirmPassword.length > 0 && password.length > 0 && (
                  <p
                    className={`mt-1 text-xs ${
                      confirmPassword === password
                        ? "text-green-300"
                        : "text-gray-300"
                    }`}
                  >
                    {confirmPassword === password
                      ? "Passwords match ✓"
                      : "Re-type your password to confirm"}
                  </p>
                )}
              </Input>
            </div>

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`w-full flex justify-center py-3 px-4 rounded-md shadow-md text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 transform hover:scale-105 transition-transform duration-200 ${
                !isValid || isSubmitting ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-200">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:text-sky-100 pl-1"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
