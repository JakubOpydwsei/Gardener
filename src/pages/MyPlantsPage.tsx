import LoginForm from "../components/LoginForm";
import { useAuth } from "../context/AuthContext";

function MyPlantPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative min-h-screen flex flex-col">
      {!isAuthenticated && (
        <>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="fixed inset-0 w-full h-full object-cover -z-10"
          >
            <source src="/login-bg.mp4" type="video/mp4" />
            Twoja przeglądarka nie obsługuje video
          </video>
          <div className="fixed inset-0 bg-black/40 -z-5" />
        </>
      )}
      <main className="flex-grow relative z-10">
        {isAuthenticated ? (
          <div>
            <p>Favourite plants</p>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 flex items-start justify-center pt-50">
              <div className="relative z-10 bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6 w-full max-w-md">
                <p className="text-center text-sm text-white/90 mb-4">
                  Aby korzystać z zakładki moje rośliny musisz być zalogowany
                </p>
                <LoginForm />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default MyPlantPage;
