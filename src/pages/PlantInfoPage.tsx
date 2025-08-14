function PlantInfoPage() {
    return (
        <>
            {/* Zdjęcia */}
            <div className="carousel w-128">
                <div id="slide1" className="carousel-item relative w-full">
                    <img
                        src="https://www.purina.pl/sites/default/files/2021-02/CAT%20HERO_0012_Maine_coon.jpg"
                        className="w-full object-center object-cover" />
                    <div className="opacity-75 absolute left-1 right-1 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <img
                        src="https://www.purina.pl/sites/default/files/2021-02/CAT%20HERO_0012_Maine_coon.jpg"
                        className="w-full object-center object-cover" />
                    <div className="opacity-75 absolute left-1 right-1 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <img
                        src="https://www.purina.pl/sites/default/files/2021-02/CAT%20HERO_0012_Maine_coon.jpg"
                        className="w-full object-center object-cover" />
                    <div className="opacity-75 absolute left-1 right-1 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>

            {/* Tekst */}
            <hr />

            {/* Statsy wariant 1 */}
            <div className="stats shadow overflow-hidden  my-40">

                <div data-aos="fade-left" className="stat place-items-center">
                    <div className="stat-title">Temperatura</div>
                    <div className="stat-value"><span className="text-info">-10°C</span> / <span className="text-error">30°C</span></div>
                    <div className="stat-desc">Może zimować w gruncie przy lekkim okryciu</div>
                </div>

                <div data-aos="fade-up" className="stat place-items-center">
                    <div className="stat-title">Nasłonecznienie</div>
                    <div className="stat-value"><span className="text-warning">Pełne słońce</span></div>
                    <div className="stat-desc">Najlepiej 6-8h dziennie</div>
                </div>

                <div data-aos="fade-right" className="stat place-items-center">
                    <div className="stat-title">Podlewanie</div>
                    <div className="stat-value">Umiarkowane</div>
                    <div className="stat-desc">Podlewać po przeschnięciu wierzchniej warstwy</div>
                </div>

                {/* <div className="stat place-items-center">
                    <div className="stat-title">Gleba</div>
                    <div className="stat-value">Przepuszczalna</div>
                    <div className="stat-desc">Lekko zasadowa, piaszczysto-gliniasta</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">Kwitnienie</div>
                    <div className="stat-value">Czerwiec - Sierpień</div>
                    <div className="stat-desc">Okres pełnego kwitnienia</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">Sadzenie</div>
                    <div className="stat-value">Kwiecień - Maj / Wrzesień</div>
                    <div className="stat-desc">Najlepsze terminy sadzenia w gruncie</div>
                </div> */}

            </div>

            <hr />

            {/* Statsy wariant 2 */}
            <div className="grid grid-cols-2 my-40">
                <div className="stats-vertical shadow overflow-hidden">

                    <div data-aos="fade-right" className="stat place-items-center">
                        <div className="stat-title">Temperatura</div>
                        <div className="stat-value"><span className="text-info">-10°C</span> / <span className="text-error">30°C</span></div>
                        <div className="stat-desc">Może zimować w gruncie przy lekkim okryciu</div>
                    </div>

                    <div data-aos="fade-right" className="stat place-items-center">
                        <div className="stat-title">Nasłonecznienie</div>
                        <div className="stat-value"><span className="text-warning">Pełne słońce</span></div>
                        <div className="stat-desc">Najlepiej 6-8h dziennie</div>
                    </div>

                    <div data-aos="fade-right" className="stat place-items-center">
                        <div className="stat-title">Podlewanie</div>
                        <div className="stat-value"><span className="text-accent">Umiarkowane</span></div>
                        <div className="stat-desc">Podlewać po przeschnięciu wierzchniej warstwy</div>
                    </div>

                </div>

                <div className="stats-vertical shadow overflow-hidden">

                    <div data-aos="fade-left" className="stat place-items-center">
                        <div className="stat-title">Nasłonecznienie</div>
                        <div className="stat-value"><span className="text-warning">Pełne słońce</span></div>
                        <div className="stat-desc">Najlepiej 6-8h dziennie</div>
                    </div>

                    <div data-aos="fade-left" className="stat place-items-center">
                        <div className="stat-title">Podlewanie</div>
                        <div className="stat-value"><span className="text-accent">Umiarkowane</span></div>
                        <div className="stat-desc">Podlewać po przeschnięciu wierzchniej warstwy</div>
                    </div>

                    <div data-aos="fade-left" className="stat place-items-center">
                        <div className="stat-title">Temperatura</div>
                        <div className="stat-value"><span className="text-info">-10°C</span> / <span className="text-error">30°C</span></div>
                        <div className="stat-desc">Może zimować w gruncie przy lekkim okryciu</div>
                    </div>

                </div>
            </div>

            <hr />

            {/* Timeline wariant 1 */}
            <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">

                <li data-aos="fade-right">
                    <div className="timeline-middle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v6l4 2m-4 8a9 9 0 100-18 9 9 0 000 18z"
                            />
                        </svg>
                    </div>
                    <div className="stat timeline-start mb-5 text-end relative">
                        <time className="font-mono italic text-2xl absolute  right-8">Temperatura</time>
                        <div className="stat place-items-center">
                            <div className="stat-value">
                                <span className="text-info">-10°C</span> / <span className="text-error">30°C</span>
                            </div>
                            <div className="stat-desc">Może zimować w gruncie przy lekkim okryciu</div>
                        </div>
                    </div>
                    <hr />
                </li>

                <li data-aos="fade-left">
                    <div className="timeline-middle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v6l4 2m-4 8a9 9 0 100-18 9 9 0 000 18z"
                            />
                        </svg>
                    </div>
                    <div className="stat timeline-end mb-5 text-end relative">
                        <time className="font-mono italic text-2xl absolute  left-8">Nasłonecznienie</time>
                        <div className="stat place-items-center">
                            <div className="stat-value">
                                <span className="text-warning">Pełne słońce</span>
                            </div>
                            <div className="stat-desc">Najlepiej 6-8h dziennie</div>
                        </div>
                    </div>
                    <hr />
                </li>

                <li data-aos="fade-right">
                    <div className="timeline-middle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v6l4 2m-4 8a9 9 0 100-18 9 9 0 000 18z"
                            />
                        </svg>
                    </div>
                    <div className="stat timeline-start mb-5 text-end relative">
                        <time className="font-mono italic text-2xl absolute  right-8">Podlewanie</time>
                        <div className="stat place-items-center">
                            <div className="stat-value">
                                <span className="text-accent">Umiarkowane</span>
                            </div>
                            <div className="stat-desc">Podlewać po przeschnięciu wierzchniej warstwy</div>
                        </div>
                    </div>
                    <hr />
                </li>


                {/* ////////////////////////////////////// */}

                <li data-aos="fade-left">
                    <div className="timeline-middle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v6l4 2m-4 8a9 9 0 100-18 9 9 0 000 18z"
                            />
                        </svg>
                    </div>
                    <div className="stat timeline-end mb-5 text-end relative">
                        <time className="font-mono italic text-2xl absolute  left-8">Nasłonecznienie</time>
                        <div className="stat place-items-center">
                            <div className="stat-value">
                                <span className="text-warning">Pełne słońce</span>
                            </div>
                            <div className="stat-desc">Najlepiej 6-8h dziennie</div>
                        </div>
                    </div>
                    <hr />
                </li>

                <li data-aos="fade-right">
                    <div className="timeline-middle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v6l4 2m-4 8a9 9 0 100-18 9 9 0 000 18z"
                            />
                        </svg>
                    </div>
                    <div className="stat timeline-start mb-5 text-end relative">
                        <time className="font-mono italic text-2xl absolute  right-8">Podlewanie</time>
                        <div className="stat place-items-center">
                            <div className="stat-value">
                                <span className="text-accent">Umiarkowane</span>
                            </div>
                            <div className="stat-desc">Podlewać po przeschnięciu wierzchniej warstwy</div>
                        </div>
                    </div>
                    <hr />
                </li>

                <li data-aos="fade-left">
                    <div className="timeline-middle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v6l4 2m-4 8a9 9 0 100-18 9 9 0 000 18z"
                            />
                        </svg>
                    </div>
                    <div className="stat timeline-end mb-5 text-end relative">
                        <time className="font-mono italic text-2xl absolute  left-8">Nasłonecznienie</time>
                        <div className="stat place-items-center">
                            <div className="stat-value">
                                <span className="text-warning">Pełne słońce</span>
                            </div>
                            <div className="stat-desc">Najlepiej 6-8h dziennie</div>
                        </div>
                    </div>
                    <hr />
                </li>

            </ul>


        </>
    );
}

export default PlantInfoPage;