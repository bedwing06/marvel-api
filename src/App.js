import "./App.css";
import Header from "./componerts/Header";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CharacterTable from "./componerts/CharacterTable";
import Search from "./componerts/Search";

const hash = "08c7a82a798ae97cc4575b56e11617fb";

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetch = async () => {
      if (query === "") {
        if (
          localStorage.getItem("favorites") === "[]" || !localStorage.getItem("favorites")){
          localStorage.setItem("favorites", "[]");
          const results = await axios(`http://gateway.marvel.com/v1/public/characters?ts=1&apikey=b92bc3598ee83489371d7bb61327a635&hash=${hash}` );
          //console.log(results.data.data.results);
          setItems(results.data.data.results);
          setLoading(false);
        } else {
          let favorite = JSON.parse(localStorage.getItem("favorites"));
          setItems(favorite);
          setLoading(false);
        }
      } else {
        const result = await axios(`http://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&ts=1&apikey=b92bc3598ee83489371d7bb61327a635&hash=${hash}`
        );
        //console.log(result.data.data.results);
        setItems(result.data.data.results);
        setLoading(false);
      }
    };

    fetch();
  }, [query]);

  
  return (
    <div className="container">
      <Header />
      <Search search={(q) => setQuery(q)}></Search>
      <CharacterTable items={items} isLoading={isLoading} />
    </div>
  );
}

export default App;
