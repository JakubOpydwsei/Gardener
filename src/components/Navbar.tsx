import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md transition-colors duration-200 whitespace-nowrap ${
      isActive
        ? "bg-green-400 text-white"
        : "text-gray-700 hover:bg-green-200 hover:shadow-sm"
    }`;

  return (
    <nav className="bg-emerald-50 shadow-md w-full sticky top-0 z-50">
      <div className="max-w-full mx-auto px-2 sm:px-4 md:px-6 lg:px-12 flex items-center h-20">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <img
            src="/images/logo.png"
            alt="logo"
            className="h-16 sm:h-20 lg:h-20"
          />
          <Link
            to="/"
            className="text-lg sm:text-xl md:text-2xl font-bold text-green-500 whitespace-nowrap pr-18"
          >
            Gardener
          </Link>
        </div>

        <button
          className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-green-100 ml-auto"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        <div className="hidden lg:flex lg:w-full lg:justify-between lg:mx-4 xl:justify-start xl:gap-6 xl:ml-6 flex-wrap overflow-x-auto">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-sm sm:text-base ${navLinkClass({ isActive })}`
            }
          >
            Strona główna
          </NavLink>
          <NavLink
            to="/garden-creator"
            end
            className={({ isActive }) =>
              `text-sm sm:text-base ${navLinkClass({ isActive })}`
            }
          >
            Kreator ogrodu
          </NavLink>
          <NavLink
            to="/encyklopedia"
            className={({ isActive }) =>
              `text-sm sm:text-base ${navLinkClass({ isActive })}`
            }
          >
            Encyklopedia roślin
          </NavLink>
          <NavLink
            to="/moje-rosliny"
            className={({ isActive }) =>
              `text-sm sm:text-base ${navLinkClass({ isActive })}`
            }
          >
            Moje rośliny
          </NavLink>
          <NavLink
            to="/about-project"
            className={({ isActive }) =>
              `text-sm sm:text-base ${navLinkClass({ isActive })}`
            }
          >
            O projekcie
          </NavLink>
        </div>

        <div className="hidden lg:flex flex-wrap gap-2 lg:gap-4">
          <NavLink
            to="/profil"
            className={({ isActive }) =>
              `text-sm sm:text-base ${navLinkClass({ isActive })}`
            }
          >
            Profil
          </NavLink>
        </div>
      </div>

      {open && (
        <div className="lg:hidden flex flex-col space-y-2 px-4 pb-4">
          <NavLink
            to="/"
            end
            className={navLinkClass}
            onClick={() => setOpen(false)}
          >
            Strona główna
          </NavLink>
          <NavLink
            to="/garden-creator"
            end
            className={navLinkClass}
            onClick={() => setOpen(false)}
          >
            Kreator ogrodu
          </NavLink>
          <NavLink
            to="/encyklopedia"
            className={navLinkClass}
            onClick={() => setOpen(false)}
          >
            Encyklopedia roślin
          </NavLink>
          <NavLink
            to="/moje-rosliny"
            className={navLinkClass}
            onClick={() => setOpen(false)}
          >
            Moje rośliny
          </NavLink>
          <NavLink
            to="/about-project"
            className={navLinkClass}
            onClick={() => setOpen(false)}
          >
            O projekcie
          </NavLink>
          <NavLink
            to="/profil"
            className={navLinkClass}
            onClick={() => setOpen(false)}
          >
            Profil
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
