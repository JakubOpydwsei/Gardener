import { useState } from "react";
import Filter from "../components/Filter";

function PlantPage() {
    const [showToast, setShowToast] = useState(false);

    const searchHandler = () => {
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 2000);
    };
    const menuHandler = searchHandler

    return (
        <>
            <div className=" flex">

                {showToast && (
                    <div className="toast toast-top toast-center z-50">
                        <div className="alert alert-info">
                            <span>Not implemented yet.</span>
                        </div>
                    </div>
                )}

                <section className="hidden  md:block w-1/4 h-fit ">
                    <Filter />
                </section>
                
                <section className="w-full ">
                    <div className="flex justify-between mb-8">

                        <label className="input rounded-2xl pl-3 ml-2 sm:ml-6 md:ml-8 lg:ml-34 xl:ml-74">
                            <input type="search" required placeholder="Search" />
                            <span className="label"><svg className="h-[1em] cursor-pointer" onClick={searchHandler} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </g>
                            </svg></span>
                        </label>

                        <div className="mr-2 sm:mr-6 md:mr-8 lg:mr-14 xl:mr-24">
                            Zaawansowane filtry
                            <button className="btn btn-square btn-ghost" onClick={menuHandler}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
                            </button>
                        </div>
                    </div>

                    <div className="grid  mx-4 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">

                        {/* miejsce na komponent */}

                    </div>

                </section>
            </div>
        </>
    );
}

export default PlantPage;