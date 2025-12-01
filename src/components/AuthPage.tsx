import AuthLayout from "./AuthLayout";
import LoginForm from "./LoginForm";

export default function AuthPage({ onSubmit }: { onSubmit?: any }) {
  return (
    <AuthLayout title="Zaloguj się aby kontynuować">
      <LoginForm onSubmit={onSubmit} />
    </AuthLayout>
  );
}
