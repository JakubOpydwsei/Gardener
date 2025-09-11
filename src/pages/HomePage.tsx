export default function HomePage() {
  return (
    <div className="relative -mt-8 flex justify-center items-center text-center min-h-screen w-full px-6 overflow-hidden">
      <img
        src="/images/garden.jpg"
        alt="Tło ogrodu"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 max-w-2xl">
        <h1 className="text-3xl md:text-5xl font-extrabold text-green-300 drop-shadow-lg">
          Witaj w aplikacji Gardener !
        </h1>
        <p className="mt-3 text-md md:text-lg text-green-100 italic">
          "Nie uganiaj się za motylami, dbaj o swój ogród, a motyle same do
          Ciebie przylecą" ~ Mário Quintana
        </p>
      </div>
    </div>
  );
}
