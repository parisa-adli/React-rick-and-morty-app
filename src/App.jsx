import { useEffect, useState } from "react";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, {
  SearchResult,
  ShowResult,
  Search,
  Favourites,
} from "./components/Navbar";
import Loader from "./components/Loader";
import { Toaster } from "react-hot-toast";
import useCharacters from "./hooks/useCharacters";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [query, setQuery] = useState("");
  const { isLoading, characters } = useCharacters(
    "https://rickandmortyapi.com/api/character?name=",
    query
  );
  const [selectedId, setSelectedId] = useState(null);
  const [favourite, setFavourite] = useLocalStorage("FAVOURITES", []);

  // const [count, setCount] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => setCount((c) => c + 1), 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [count]);

  //* clean up function
  // what?
  // why to use?
  // when run?
  // 1. unmount component
  // 2. befor the next re-render (between re-renders)
  // where to use?
  // effect => after unmount or while re-rendering
  // example :
  // fetch API, timer, eventListener,...

  // NOT TO FETCH IN THIS WAY :
  // fetch("https://rickandmortyapi.com/api/character")
  //   .then((res) => res.json())
  //   .then((data) => setCharacters(data.results));

  // fetch api, set timer, access to DOM, ...
  // effect : event handle function, useEffect

  // // first load - mount phase with then catch
  // useEffect(() => {
  //   setIsLoding(true);
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((res) => {
  //       if (!res.ok) throw new Error("Somthing went wrong!!");
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setCharacters(data.results.slice(0, 4));
  //       // setIsLoding(false);
  //     })
  //     .catch((err) => {
  //       // setIsLoding(false);
  //       toast.error(err.message);
  //     })
  //     .finally(() => setIsLoding(false));
  // }, []);

  // // event side effect  with then catch
  // const handleLoadCharacter = () => {
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((res) => res.json())
  //     .then((data) => setCharacters(data.results.slice(0, 3)));
  // };

  // first load - mount phase with async await
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setIsLoding(true);
  //       const res = await fetch("https://rickandmortyapi.com/api/character11");

  //       if (!res.ok) throw new Error("Somthing went wrong!");

  //       const data = await res.json();
  //       setCharacters(data.results.slice(0, 4));
  //       //setIsLoding(false);
  //     } catch (err) {
  //       //setIsLoding(false);
  //       console.log(err.message);
  //       toast.error(err.message);
  //     } finally {
  //       setIsLoding(false);
  //     }
  //   }
  //   fetchData();
  // }, []);

  // axios

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

  // event side effect with async await

  //?
  // const handleLoadCharacter = () => {
  //   async function fetchData() {
  //     const res = await fetch(
  //       `https://rickandmortyapi.com/api/character?name=${query}`
  //     );
  //     const data = await res.json();
  //     setCharacters(data.results.slice(0, 3));
  //   }
  //   fetchData();
  // };

  const handleSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id)); // click on character is selected => on selecte
  };
  // console.log(selectedId);

  const handleAddFavourite = (char) => {
    setFavourite((prevFav) => [...prevFav, char]);
  };

  const isAddToFavourite = favourite.map((fav) => fav.id).includes(selectedId); // [1,2,3,...]

  const handleDeleteFvourite = (id) => {
    setFavourite((prevFav) => prevFav.filter((fav) => fav.id !== id));
  };

  return (
    <div className="app">
      {/* <div style={{ color: "#FFF", marginBottom: "50rem" }}>{count}</div> */}
      <Toaster />
      {/* <button onClick={handleLoadCharacter} className="load-characters-btn">
        load just first "3" characters
      </button> */}
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult>
          <ShowResult numOfResult={characters.length} />
        </SearchResult>
        <Favourites
          favourite={favourite}
          onDeleteFavourite={handleDeleteFvourite}
        />
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
        <CharacterDetail
          selectedId={selectedId}
          onAddFavourite={handleAddFavourite}
          isAddToFavourite={isAddToFavourite}
        />
      </Main>
    </div>
  );
}
export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
