import { Link, NavLink } from "react-router-dom";

function Navbar() {
    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `px-4 py-2 rounded-md transition-colors duration-200 ${isActive ? "bg-green-400 text-white" : "text-gray-700 hover:bg-green-100"
        }`;

    return (
        <nav className="bg-emerald-50 shadow-md w-full">
            <div className="container mx-auto px-12 flex justify-between items-center h-16">
                <div className="flex space-x-4">

                    <img src="" alt="logo" />
                    <Link to="/" className="text-2xl font-bold text-green-500 pr-8">
                        Gardener
                    </Link>

                    <NavLink to="/" className={navLinkClass} end>
                        Strona główna
                    </NavLink>
                    <NavLink to="/kreator-ogrodu" className={navLinkClass} end>
                        Kreator ogrodu
                    </NavLink>
                    <NavLink to="/encyklopedia" className={navLinkClass}>
                        Encyklopedia roślin
                    </NavLink>
                    <NavLink to="/moje-rosliny" className={navLinkClass}>
                        Moje rośliny
                    </NavLink>
                    <NavLink to="/o-projekcie" className={navLinkClass}>
                        O projekcie
                    </NavLink>
                </div>

                <div className="flex space-x-4">
                    <img src="" alt="ikona profilu" />
                    <NavLink to="/profil" className={navLinkClass}>
                        Profil
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;