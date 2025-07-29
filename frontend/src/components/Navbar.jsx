// import React from 'react'
// import {Link} from "react-router";
// import {PlusIcon} from "lucide-react";
// function navbar() {
//     return (
//       <div>
//         <header className="bg-base-300 border-b border-base-content/10">
//         <div className="mx-auto max-w-6xl p-4">
//           <div className="flex items-center justify-between">
//             <h1 className="text-3xl font-bold text-primary font-mono tracking-tight"> ThinkBoard</h1>
//             <div className="flex items-center gap-4">
//               <Link to={"/create"} className="btn btn-primary">
//               <PlusIcon className="size-5"/> 
//               <span> New Note</span>
//               </Link> 
//             </div>
            
//           </div>
//       </div>
//       </header>
//     </div>
//   )
// }

// export default navbar
import React, { useState, useEffect } from 'react';
import { Link } from "react-router"; // Use react-router-dom if needed
import { PlusIcon } from "lucide-react";

const themes = ["light", "dark", "forest", "retro", "coffee", "valentine", "lofi"];

function Navbar() {
  const [theme, setTheme] = useState("forest");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          
          {/* LEFT - Logo */}
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
            NoteSphere
          </h1>

          {/* RIGHT SIDE CONTAINER */}
          <div className="flex items-center gap-6">
            
            {/* New Note - middle right */}
            <Link to="/create" className="btn btn-primary flex items-center gap-2">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>

            {/* Theme Selector - far right */}
            <select
              className="select select-bordered"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              {themes.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

