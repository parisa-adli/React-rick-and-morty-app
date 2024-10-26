import "./App.css";
import { allCharacters } from "../data/data";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { SearchResult } from "./components/Navbar";
import { useState } from "react";

function App() {
  const [characters, setCharacters] = useState(allCharacters);
  return (
    <div>
      <Navbar>
        <SearchResult numOfResult={characters.length} />
      </Navbar>
      <Main>
        <CharacterList characters={characters} />
        <CharacterDetail />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
