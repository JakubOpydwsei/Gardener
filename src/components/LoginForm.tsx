import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const LoginSchema = z.object({
  email: z.string().email({ message: "Nieprawidłowy adres email" }),
  password: z
    .string()
    .min(6, { message: "Hasło musi mieć co najmniej 6 znaków" }),
  remember: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

export default function LoginForm({
  onSubmit,
}: {
  onSubmit?: (data: LoginFormValues) => Promise<void> | void;
}) {
  const { register, handleSubmit, formState } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>("");

  const submit = async (data: LoginFormValues) => {
    setError(null);
    setLoading(true);

    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        console.log("Api call here");
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message ?? err?.message ?? "Błąd logowania"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit(submit)}
        className="border border-gray-500 w-3xl rounded-lg shadow-lg px-5 py-4 space-y-4 mt-20"
      >
        {error && (
          <div className="alert alert-error shadow-lg">
            <div>
              <span>{error}</span>
            </div>
          </div>
        )}

        <label className="block">
          <span className="label-text">Email:</span>
          <input
            {...register("email")}
            type="email"
            className="input input-bordered w-full"
          />
          {formState.errors.email && (
            <p className="text-sm text-error mt-1">
              {formState.errors.email.message}
            </p>
          )}
        </label>
        <label className="block">
          <span className="label-text">Password:</span>
          <input
            {...register("password")}
            type="password"
            className="input input-borderd w-full"
          />
          {formState.errors.password && (
            <p className="text-sm text-error mt-1">
              {formState.errors.password.message}
            </p>
          )}
        </label>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input
              {...register("remember")}
              type="checkbox"
              className="checkbox"
            />
            <span className="text-sm">Zapamiętaj mnie</span>
          </label>
          <a href="" className="text-sm link link-hover">
            Zapomniałeś hasła?
          </a>
        </div>
        <button
          type="submit"
          className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          Zaloguj
        </button>
        <div className="text-sm text-center text-muted">
          Nie masz konta?{" "}
          <a href="/register-form" className="link link-primary">
            Zarejestruj się
          </a>
        </div>
      </form>
    </div>
  );
}
