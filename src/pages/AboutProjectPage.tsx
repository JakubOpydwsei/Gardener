function AboutProjectPage() {
  return (
    <section className="min-h-screen bg-base-100">
      <div className="flex flex-col border-b border-base-300">
        <div className="max-w-6xl mx-auto px-6 pt-0 pb-10">
          <div className="flex justify-center">
            <img src="/logo.png" alt="logo" className="h-30 sm:h-30 lg:h-30" />
          </div>

          <p className="text-base-content/70 mt-5 max-w-3xl mx-auto text-center">
            Aplikacja webowa wspierająca planowanie przestrzeni zielonych
          </p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-14 flex flex-col gap-10 text-lg leading-relaxed">
        <p>
          Jesteśmy studentami Wyższej Szkoły Ekonomii i Informatyki w Krakowie i
          realizujemy wspólną pracę inżynierską. Naszym celem jest stworzenie
          aplikacji webowej „Gardener”, która ma wspierać osoby planujące
          aranżację i pielęgnację przestrzeni zielonych.
        </p>
        <p>
          Aplikacja w swojej podstawowej wersji (MVP) posiada kreator ogrodu
          umożliwiający projektowanie przestrzeni zielonych, poprzez nanoszenie
          roślin na zdjęcie działki. Dodano również encyklopedię roślin, w
          której użytkownik może przeglądać bazę roślin wraz z ich kluczowymi
          parametrami: typem gleby, wymaganiami dotyczącymi podlewania i
          nasłonecznienia, zakresem temperatur, a także okresem kwitnienia i
          sadzenia. Projekt jest w pełni responsywny.
        </p>
        <p>
          W przyszłości aplikacja zostanie rozbudowana o kolejne moduły, m.in.:
          rozszerzenie bazy roślin, przypomnienia o pielęgnacji oraz
          spersonalizowane listy roślin.
        </p>

        <div className="bg-base-200 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            Wykorzystane technologie:
          </h2>

          <ul className="grid sm:grid-cols-2 gap-3 text-base">
            <li>
              <strong>Frontend:</strong> React + TypeScript, TailwindCSS,
              DaisyUI
            </li>
            <li>
              <strong>Backend:</strong> Express.js, Node.js
            </li>
            <li>
              <strong>Baza danych:</strong> MongoDB
            </li>
            <li>
              <strong>Dodatki:</strong> animacje AOS
            </li>
          </ul>
        </div>

        <div className="mt-16 bg-base-200 border border-base-300 rounded-2xl p-8 shadow-sm text-center">
          <h2 className="text-2xl font-semibold mb-3">Do pobrania</h2>
          <p className="text-base-content/70 mb-6 mt-5">
            Dokumentacja użytkownika aplikacji Gardener
          </p>
          <a
            href="/docs/dokumentacja-uzytkownika.pdf"
            download
            className="btn btn-primary px-10 text-black"
          >
            Pobierz PDF
          </a>
          <p className="text-xs text-base-content/50 mt-4">
            Plik zawiera instrukcję obsługi oraz opis funkcjonalności aplikacji.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutProjectPage;
