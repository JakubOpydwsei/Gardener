import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  email: z.string().email("Nieprawidłowy adres email"),
});

type FormData = z.infer<typeof schema>;

export default function ForgotPasswordForm() {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (data: FormData) => {
    setError(null);

    try {
      const res = await fetch("http://localhost:3001/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      if (!res.ok) throw new Error("Nie udało się wysłać emaila");
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (success) {
    return (
      <p className="text-center mt-20 text-green-600">
        Jeśli konto istnieje, link do resetu hasła zostanie wysłany
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="max-w-md mx-auto mt-20 space-y-4"
    >
      <h1 className="text-xl font-bold">Reset hasła</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input
        {...register("email")}
        placeholder="Email"
        className="input input-bordered w-full"
      />
      {formState.errors.email && (
        <p className="text-error">{formState.errors.email.message}</p>
      )}
      <button className="btn btn-primary w-full">Wyślij link</button>
    </form>
  );
}
