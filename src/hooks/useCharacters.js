import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useCharacters(url, query) {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${url}${query}`, { signal });
        setCharacters(data.results.slice(0, 5));
      } catch (err) {
        if (!axios.isCancel(err)) {
          setCharacters([]);
          console.log(err);
          toast.error(err?.response?.data?.error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    // don't show character before serch by name
    // if (query.length < 3) {
    //   setCharacters([]);
    //   return;
    // }
    fetchData();
    return () => {
      controller.abort();
    };
  }, [query]);

  return { isLoading, characters };
}
