import "./App.css";
import { allCharacters } from "../data/data";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Search, SearchResult } from "./components/Navbar";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // NOT TO FETCH IN THIS WAY :
  // fetch("https://rickandmortyapi.com/api/character")
  //   .then((res) => res.json())
  //   .then((data) => setCharacters(data.results));

  // fetch api, set timer, access to DOM, ...
  // effect : event handle function, useEffect

  //   // useEffect hook on mount phase - first load with then catch
  //   useEffect(() => {
  //     setIsLoading(true);

  //     fetch("https://rickandmortyapi.com/api/character")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setCharacters(data.results))
  //     setIsLoading(true)
  //   });
  // }, []);

  // // useEffect hook on mount phase - first load with async await
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setIsLoading(true);
  //       const res = await fetch("https://rickandmortyapi.com/api/character");
  //       if (!res.ok) throw new Error("somthing went wrong!");
  //       const data = await res.json();
  //       setCharacters(data.results);
  //     } catch (err) {
  //       console.log(err.message);
  //       toast.error(err.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchData();
  // }, []);

  // // useEffect hook on mount phase - first load with axios
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`
        );
        setCharacters(data.results);
      } catch (err) {
        toast.error(err.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [query]);

  // dependency array ? rule => when to run effect function

  // 1. useEffect(()=>{}) --> on every render --> not control
  // 2. useEffect(()=>{},[]) --> on mount - first load(render)
  // 3. useEffect(()=>{},[state, props]) --> changes state or props

  // useEffect(()=>{
  // if(query)
  // }, [query]) --> when query changes(update) effect function run

  // when useEffect runs. ??

  // (1) state => changes -> re-render -> browser paint
  // (2) state => changes -> run effect function

  // //  event side effect
  // const handleLoadCharacter = () => {
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((res) => res.json())
  //     .then((data) => setCharacters(data.results.slice(0, 3)));
  // };

  // //  event side effect with async await
  // const handleLoadCharacter = () => {
  //   async function fetchData() {
  //     const res = await fetch("https://rickandmortyapi.com/api/character");
  //     const data = await res.json();
  //     setCharacters(data.results.slice(0, 4));
  //   }
  //   fetchData();
  // };
  const handleSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  // console.log(selectedId);

  return (
    <div className="app">
      <Toaster />
      {/* <button onClick={handleLoadCharacter} className="load-characters-btn">
        load just first "3" characters
      </button> */}
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
      </Navbar>
      <Main>
        {isLoading ? (
          <div className="characters-list">
            <Loader />
          </div>
        ) : (
          <CharacterList
            characters={characters}
            onSelectCharacter={handleSelectCharacter}
            selectedId={selectedId}
          />
        )}
        <CharacterDetail selectedId={selectedId} />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
