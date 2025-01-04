import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Character } from "./CharacterList";
import Modal from "./Modal";
function Navbar({ children }) {
  return (
    <nav className="navbar">
      <div className="navbar__logo">LOGO 😍</div>
      {children}
    </nav>
  );
}

export default Navbar;

export function SearchResult({ children }) {
  return <div className="navbar-result">{children}</div>;
}

export function ShowResult({ numOfResult }) {
  return <span>Found {numOfResult} Characters</span>;
}

export function Search({ query, setQuery }) {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      type="text"
      className="text-field"
      placeholder="search ..."
    />
  );
}

export function Favourites({ favourite, onDeleteFavourite }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal onOpen={setIsOpen} open={isOpen} title="List of Favourites">
        {favourite.map((item) => (
          <Character key={item.id} item={item}>
            <button
              className="icon red"
              onClick={() => onDeleteFavourite(item.id)}
            >
              <TrashIcon />
            </button>
          </Character>
        ))}
      </Modal>
      <button className="heart" onClick={() => setIsOpen((is) => !is)}>
        <HeartIcon className="icon" />
        <span className="badge">{favourite.length}</span>
      </button>
    </>
  );
}
