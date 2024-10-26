import "./App.css";
import { allCharacters } from "../data/data";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { SearchResult } from "./components/Navbar";
import { useEffect, useState } from "react";

function App() {
  const [characters, setCharacters] = useState([]);

  // NOT TO FETCH IN THIS WAY :
  // fetch("https://rickandmortyapi.com/api/character")
  //   .then((res) => res.json())
  //   .then((data) => setCharacters(data.results));

  // fetch api, set timer, access to DOM, ...
  // effect : event handle function, useEffect

  // useEffect hook on mount phase - first load with then catch
  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((data) => setCharacters(data.results));
  }, []);

  // useEffect hook on mount phase - first load with async await
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://rickandmortyapi.com/api/character");
      const data = await res.json();
      setCharacters(data.results);
    }
    fetchData();
  }, []);

  // //  event side effect
  // const handleLoadCharacter = () => {
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((res) => res.json())
  //     .then((data) => setCharacters(data.results.slice(0, 3)));
  // };

  // //  event side effect with async await
  const handleLoadCharacter = () => {
    async function fetchData() {
      const res = await fetch("https://rickandmortyapi.com/api/character");
      const data = await res.json();
      setCharacters(data.results.slice(0, 4));
    }
    fetchData();
  };
  return (
    <div className="app">
      <button onClick={handleLoadCharacter} className="load-characters-btn">
        load just first "3" characters
      </button>
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
