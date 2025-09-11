function AboutProjectPage() {
  return (
    <>
      <h1 className="text-3xl">O projekcie</h1>
      <div className="w-8/12 m-auto flex flex-col gap-16 pt-16 text-lg md:text-xl pb-20">
        <p>
          Jesteśmy studentami Wyższej Szkoły Ekonomii i Informatyki w Krakowie i
          realizujemy wspólną pracę inżynierską. Naszym celem jest stworzenie
          aplikacji webowej „Gardener”, która ma wspierać osoby planujące
          aranżację i pielęgnację przestrzeni zielonych.
        </p>
        <p>
          Aplikacja w swojej podstawowej wersji (MVP) pełni rolę encyklopedii
          roślin, w której użytkownik może przeglądać bazę roślin wraz z ich
          kluczowymi parametrami: typem gleby, wymaganiami dotyczącymi
          podlewania i nasłonecznienia, zakresem temperatur, a także okresem
          kwitnienia i sadzenia. Dodatkowo projekt został zaprojektowany w
          sposób responsywny – działa zarówno na komputerach stacjonarnych, jak
          i urządzeniach mobilnych oraz telewizorach.
        </p>
        <p>
          W przyszłości aplikacja zostanie rozbudowana o kolejne moduły, m.in.:
          możliwość tworzenia własnej listy roślin, przypomnienia o podlewaniu i
          nawożeniu, a także rozbudowany kreator ogrodu – narzędzie pozwalające
          wgrać zdjęcie działki i nanosić na nie rośliny w celu zaplanowania
          wyglądu całej przestrzeni.
        </p>
        <div>
          <p className="py-8">
            Do stworzenia aplikacji wykorzystujemy nowoczesne technologie:
          </p>
          <ul>
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
      </div>
    </>
  );
}

export default AboutProjectPage;
