import { HeartIcon } from "@heroicons/react/24/outline";
function Navbar({ children }) {
  return (
    <nav className="navbar">
      <div className="navbar__logo">LOGO 😍</div>
      <Search />
      {children}
      <Favourites />
    </nav>
  );
}

export default Navbar;

function Search() {
  return <input type="text" className="text-field" placeholder="search ..." />;
}

export function SearchResult({ numOfResult }) {
  return <div className="navbar__result">Found {numOfResult} character</div>;
}

function Favourites() {
  return (
    <button className="heart">
      <HeartIcon className="icon" />
      <span className="badge">4</span>
    </button>
  );
}
