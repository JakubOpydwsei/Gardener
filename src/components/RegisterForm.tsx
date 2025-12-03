import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const RegisterSchema = z
  .object({
    name: z.string().min(1, { message: "Podaj imię" }).max(50),
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

export default function RegisterForm({
  onSubmit,
}: {
  onSubmit?: (data: RegisterFormValues) => Promise<void> | void;
}) {
  const { register, handleSubmit, formState } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { name: "", email: "", password: "", passwordConfirm: "" },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (data: RegisterFormValues) => {
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
        err?.response?.data?.message ?? err?.message ?? "Błąd rejestracji"
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
          <span className="label-text">Imię:</span>
          <input
            {...register("name")}
            type="text"
            className="input input-bordered w-full"
          />
          {formState.errors.name && (
            <p className="text-sm text-error mt-1">
              {formState.errors.name.message}
            </p>
          )}
        </label>
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
          <span className="label-text">Hasło:</span>
          <input
            {...register("password")}
            type="password"
            className="input input-bordered w-full"
          />
          {formState.errors.password && (
            <p className="text-sm text-error mt-1">
              {formState.errors.password.message}
            </p>
          )}
        </label>
        <label className="block">
          <span className="label-text">Powtórz hasło:</span>
          <input
            {...register("passwordConfirm")}
            type="password"
            className="input input-bordered w-full"
          />
          {formState.errors.passwordConfirm && (
            <p className="text-sm text-error mt-1">
              {formState.errors.passwordConfirm.message}
            </p>
          )}
        </label>
        <button
          type="submit"
          className={`btn btn-secondary w-full ${
            loading ? "loading" : ""
          } mt-5`}
          disabled={loading}
        >
          Zarejestruj
        </button>
        <div className="text-sm text-center text-muted">
          Masz konto?{" "}
          <a href="/login-form" className="link link-primary">
            Zaloguj się!
          </a>
        </div>
      </form>
    </div>
  );
}
