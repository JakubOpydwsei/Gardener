import LoginForm from "./LoginForm";

export default function UserLoginForm() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-10"
      >
        <source src="/user-login-bg.mp4" type="video/mp4" />
        Twoja przeglądarka nie obsługuje video
      </video>

      <div className="fixed inset-0 bg-black/40 -z-5" />
      <main className="flex-grow relative z-10 flex items-start justify-center pt-20 px-4">
        <div className="relative p-6 w-full max-w-md">
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
