import React from "react";
import { Link, useNavigate } from "react-router-dom";
import back from "../../assets/back.png";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../components/Input";
import useAuthStore from "../../stores/authStore";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one symbol"),
});
type LoginFormInputs = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting, isValid },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const navigate = useNavigate();
  const { login } = useAuthStore();

  const onSubmit = handleSubmit((data) => {
    console.log("Login form submitted:", data);
    const success = login(data.email, data.password)
    if(success) {
      navigate('/posts');
    } else {
      console.log('Login failed');
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
            Sign In
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
                autoComplete="current-password"
                aria-invalid={!!errors.password || undefined}
                error={errors.password?.message}
                className={
                  touchedFields.password && !errors.password
                    ? "border-green-400 focus:ring-green-400"
                    : ""
                }
                {...register("password")}
              />
            </div>

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`w-full flex justify-center py-3 px-4 rounded-md shadow-md text-secondary font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 transform hover:scale-105 transition-transform duration-200 ${
                !isValid || isSubmitting ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-200">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-primary hover:text-sky-100 pl-1"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
