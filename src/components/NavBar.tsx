import { FC, FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Search from "../asset/svg/Search";

const NavBar: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const history = useHistory();

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    history.push(`/search?q=${encodeURIComponent(inputValue.trim())}`);
  };

  return (
    <div className="bg-dark-lighten flex justify-between items-center w-screen h-12 px-one-twenty">
      <Link to="/" className="flex items-center gap-2">
        <img className="h-6 w-auto" src="https://i.imgur.com/Cy7nQ7G.png" alt="" />
        <h1 className="text-blue-sky text-2xl">AniSpace</h1>
      </Link>
      <form onSubmit={handleFormSubmit} className="relative h-9 md:block hidden">
        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="bg-dark-darken rounded-lg outline-none pl-3 pr-8 text-gray-300 h-full" type="text" placeholder="Search..." />
        <Search className="absolute right-1 cursor-pointer top-1/2" style={{ transform: "translateY(-50%)" }} />
      </form>
      <Link className="block md:hidden" to="/">
        <Search />
      </Link>
    </div>
  );
};

export default NavBar;
