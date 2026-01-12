import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const LoginSchema = z.object({
  email: z.string().email({ message: "Nieprawidłowy adres email" }),
  password: z
    .string()
    .min(8, { message: "Hasło musi mieć co najmniej 8 znaków" }),
  remember: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

export default function LoginForm() {
  const { register, handleSubmit, formState } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const submit = async (data: LoginFormValues) => {
    setError(null);
    setLoading(true);

    try {
      await login(data.email, data.password, data.remember ?? false);
      navigate("/");
    } catch (err: any) {
      setError(err?.message ?? "Błąd logowania");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-h-screen flex items-center justify-center overflow-hidden">
      <form
        onSubmit={handleSubmit(submit)}
        className="relative z-10 w-full max-w-md space-y-4 rounded-xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl px-6 py-6 text-white"
      >
        <h2 className="text-2xl font-bold text-center mb-2">Zaloguj się</h2>
        {error && (
          <div className="alert alert-error shadow-lg">
            <div>
              <span>{error}</span>
            </div>
          </div>
        )}

        <label className="block mt-5">
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
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input
              {...register("remember")}
              type="checkbox"
              className="checkbox"
            />
            <span className="text-sm">Zapamiętaj mnie</span>
          </label>
          <Link to="/forgot-password" className="link link-hover">
            Zapomniałeś hasła?
          </Link>
        </div>
        <button
          type="submit"
          className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          Zaloguj
        </button>
        <div className="text-sm text-center opacity-90">
          Nie masz konta?{" "}
          <Link to="/register-form" className="link link-primary font-bold">
            Zarejestruj się!
          </Link>
        </div>
      </form>
    </div>
  );
}
