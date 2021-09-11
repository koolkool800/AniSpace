import { FC } from "react";
import { useRouteMatch, Link } from "react-router-dom";

import { Pagination } from "../types";

const pagination: Pagination[] = [
  { name: "Anime", path: "/" },
  { name: "Song", path: "/song" },
  { name: "Genre", path: "/genre" },
];

const NavBar: FC = () => {
  const match = useRouteMatch();

  return (
    <div className="bg-dark-lighten flex justify-between items-center w-screen h-12 px-one-twenty relative">
      <Link to="/" className="flex items-center gap-2">
        <img className="h-6 w-auto" src="https://i.imgur.com/Cy7nQ7G.png" alt="" />
        <h1 className="text-blue-sky text-2xl">AniSpace</h1>
      </Link>
      <div className="flex gap-4 items-center center-item">
        {pagination.map((e) => (
          <Link to={e.path} key={e.path} className={`text-white hover:text-blue-sky transition ${match.path === e.path ? "text-xl underline-colorful" : "text-base"}`}>
            {e.name}
          </Link>
        ))}
      </div>
      <form className="relative h-9">
        <input className="bg-dark-darken rounded-lg outline-none pl-3 pr-8 text-gray-300 h-full" type="text" placeholder="Search..." />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute right-1 cursor-pointer top-1/2 text-gray-400" style={{ transform: "translateY(-50%)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </form>
    </div>
  );
};

export default NavBar;
