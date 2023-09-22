/*  
  Navbar component, which is always displayed on top of page and links to the site's pages
*/

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // toggle visibility of the navbar links when clicking on the hamburger button (for small screens)
  const [isFirst, setIsFirst] = useState(true); // for making sure the toggle doesn't trigger on mount
  const [toggle, setToggle] = useState(false); // toggle whether the filter menu is shown or hidden

  // run this whenever toggle changes
  useEffect(() => {
    // make sure the code after if block does't get run on mount
    if (isFirst) {
      setIsFirst(false);
      return;
    }
    document.getElementById("navbar-links").classList.toggle("hidden");
  }, [toggle]);

  return (
    <nav className="min-h-[80px] flex flex-col md:flex-row md:text-center justify-between bg-primary text-components">
      {/* Logo */}
      <div className="h-20 aspect-square p-3 -ml-1 md:absolute">
        <Link to="/">
          <svg
            className="h-full fill-components"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
          >
            <path d="M12 39h32V2H12C8.691 2 6 4.691 6 8v34.417C6 45.496 8.691 48 12 48h32v-2H12c-2.168 0-4-1.641-4-3.583C8 40.501 9.757 39 12 39zm24.709-7.294a.997.997 0 0 1-1.414.002l-6.523-6.494-1.76 1.76-1.846-1.879 3.153-3.153 8.387 8.349c.391.39.393 1.023.003 1.415zM16.286 10.007l7.733 7.781-3.044 3.044L16.23 16a4.199 4.199 0 0 1 .056-5.993zm-1.957 20.286 13.024-13.024c-.034-.085-.083-.163-.107-.252-.399-1.509-.322-3.426 1.045-4.777 2.031-2.094 5.497-2.989 6.998-1.505 1.501 1.571.596 4.909-1.435 6.916-1.444 1.428-3.298 1.545-4.8 1.16-.104-.027-.196-.081-.294-.122L14.743 31.707c-.195.195.549.293.293.293s-.512-.098-.707-.293a.999.999 0 0 1 0-1.414z" />
          </svg>
        </Link>
      </div>
      {/* Links */}
      <div
        id="navbar-links"
        className="hidden md:inline-block bg-primary-light md:bg-transparent md:absolute md:top-0 md:right-1/2 md:translate-x-1/2"
      >
        <div className="text-2xl flex flex-col md:flex-row">
          <Link
            onClick={(e) => setToggle(!toggle)}
            className="p-2 md:px-3 md:py-6 hover:bg-primary-light active:bg-primary-light-light"
            to="/my-recipes"
          >
            RECIPES
          </Link>
          <Link
            onClick={(e) => setToggle(!toggle)}
            className="p-2 md:px-3 md:py-6 hover:bg-primary-light active:bg-primary-light-light"
            to="/my-recipes?saved=true"
          >
            SAVED
          </Link>
          <Link
            onClick={(e) => setToggle(!toggle)}
            className="p-2 md:px-3 md:py-6 hover:bg-primary-light active:bg-primary-light-light"
            to="/edit"
          >
            ADD
          </Link>
        </div>
      </div>
      {/* Hamburger menu button */}
      <button
        onClick={(e) => setToggle(!toggle)}
        className="h-20 absolute top-0 right-0 md:static md:hidden aspect-square p-4 md:-mr-1"
      >
        <svg
          className="h-full fill-components"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M0 96c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm448 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32z" />
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;
