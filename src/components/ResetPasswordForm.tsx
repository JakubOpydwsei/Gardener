import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import z from "zod";

const schema = z
  .object({
    password: z.string().min(8),
    confirm: z.string().min(8),
  })
  .refine((d) => d.password === d.confirm, {
    path: ["confirm"],
    message: "Hasła muszą być zgodne",
  });

type FormData = z.infer<typeof schema>;

export default function ResetPasswordForm() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  if (!token) {
    return (
      <p className="text-center mt-20 text-red-500">
        Link jest niepoprawny lub wygasł
      </p>
    );
  }

  const submit = async (data: FormData) => {
    const res = await fetch("http://localhost:3001/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password: data.password }),
    });

    if (res.ok) navigate("/login-form");
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="max-w-md mx-auto mt-20 space-y-4"
    >
      <h1 className="text-xl font-bold">Nowe hasło</h1>

      <input
        {...register("password")}
        type="password"
        placeholder="Nowe hasło"
        className="input input-bordered w-full"
      />
      <input
        {...register("confirm")}
        type="password"
        placeholder="Powtórz hasło"
        className="input input-bordered w-full"
      />
      <button className="btn btn-primary w-full">Zmień hasło</button>
    </form>
  );
}
