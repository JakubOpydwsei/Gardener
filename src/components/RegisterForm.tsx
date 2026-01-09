import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";
import { useAuth } from "../context/AuthContext";

const RegisterSchema = z
  .object({
    email: z.string().email({ message: "Nieprawidłowy adres email" }),
    password: z
      .string()
      .min(8, { message: "Hasło musi mieć co najmniej 8 znaków" }),
    passwordConfirm: z
      .string()
      .min(8, { message: "Hasło musi mieć co najmniej 8 znaków" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Hasła muszą być takie same",
  });

type RegisterFormValues = z.infer<typeof RegisterSchema>;

export default function RegisterForm() {
  const { register: registerFn } = useAuth();
  const { register, handleSubmit, formState } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { email: "", password: "", passwordConfirm: "" },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const submit = async (data: RegisterFormValues) => {
    setError(null);
    setLoading(true);
    try {
      await registerFn(data.email, data.password);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-10"
      >
        <source src="/register-bg.mp4" type="video/mp4" />
        Twoja przeglądarka nie obsługuje video
      </video>

      <div className="fixed inset-0 bg-black/40 -z-5" />

      <main className="flex-grow relative z-10 flex items-start justify-center pt-24 px-4">
        <div className="relative bg-white/20 backdrop-blur-md rounded-xl shadow-2xl p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-2">
            Zarejestruj się
          </h2>

          {error && (
            <div className="alert alert-error shadow-lg">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(submit)} className="space-y-4">
            <label className="block">
              <span className="label-text text-white">Email:</span>
              <input
                {...register("email")}
                type="email"
                className="input input-bordered w-full bg-white/80 text-black"
              />
              {formState.errors.email && (
                <p className="text-sm text-error mt-1">
                  {formState.errors.email.message}
                </p>
              )}
            </label>
            <label className="block">
              <span className="label-text text-white">Hasło:</span>
              <input
                {...register("password")}
                type="password"
                className="input input-bordered w-full bg-white/80 text-black"
              />
              {formState.errors.password && (
                <p className="text-sm text-error mt-1">
                  {formState.errors.password.message}
                </p>
              )}
            </label>
            <label className="block">
              <span className="label-text text-white">Powtórz hasło:</span>
              <input
                {...register("passwordConfirm")}
                type="password"
                className="input input-bordered w-full bg-white/80 text-black"
              />
              {formState.errors.passwordConfirm && (
                <p className="text-sm text-error mt-1">
                  {formState.errors.passwordConfirm.message}
                </p>
              )}
            </label>
            <button
              type="submit"
              className={`btn btn-secondary w-full ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              Zarejestruj
            </button>
          </form>

          <div className="text-sm text-center opacity-90 mt-2 text-white">
            Masz konto?{" "}
            <Link to="/user-login-form" className="link link-primary font-bold">
              Zaloguj się!
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
