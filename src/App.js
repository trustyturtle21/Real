import "./App.css";
import { useState } from "react";
import animeData from "./assets/anime-data.json";
import {AnimeCard} from "./components/AnimeCard";
import Nav from 'react-bootstrap/Nav';
/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
animeData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  const [totalWatchTime, setTotalWatchTime] = useState(0);
  const [names, setNames] = useState([]);
  const [genre, setGenre] = useState("All");
  const [season, setSeason] = useState("All");
  const [data, setData] = useState(animeData);

  //modifty to add parameters pass it in
  function handleClickFunction(WatchTime, name) {
    setTotalWatchTime(totalWatchTime + WatchTime);
    setNames([...names, name])
  }
  function handleResetFunction() {
    setTotalWatchTime(0);
    setNames([]);
  }

  function handleRating() {
    setData([...animeData].sort((a, b) => b.rating - a.rating))
    console.log(data)
  }

  function defaultRating() {
    setData(animeData)
    console.log(data)
  }

  const matchesFilterType = item => {
    if (genre === "All" && season === "All") {
      return true
    } 
    
    if (genre === "All") {
      if (season === item.season) {
        return true
      } 
    } 

    if (season === "All") {
      if (genre === item.genre) {
        return true
      }
    } 

    if (genre === item.genre && season === item.season){
      return true
    }

  }

  function selectGenre(eventKey) {
    setGenre(eventKey);
    // console.log(eventKey);
  }

  function selectSeason(eventKey) {
    setSeason(eventKey);
    console.log(eventKey);
  }

  return (

    <div className="App">
      <div style="text-align:center;">
      <h1>My Anime List</h1> 
      </div>
      <div style="text-align:center;">
        <button onClick={() => handleRating()}> Sort By Rating</button>
      </div>

      <div style="text-align:center;">
        <button onClick={() => defaultRating()}> UnSort By Rating</button>
      </div>
      <div style="text-align:center;">
        <h2>Genre</h2>
      <Nav onSelect={selectGenre}>
        <Nav.Item><Nav.Link eventKey="All">All</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link eventKey="Romcom">Romcom</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link eventKey="Action">Action</Nav.Link></Nav.Item>
      </Nav>
      </div>

      <div style="text-align:center;"> 
        <h2>Season</h2>
      <Nav onSelect={selectSeason}>
        <Nav.Item><Nav.Link eventKey="All">All</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link eventKey="Spring">Spring</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link eventKey="Summer">Summer</Nav.Link></Nav.Item>
      </Nav>
      </div>

      
      <div style="text-align:center;">
      <h2>Watch List</h2>
      <p>{names}</p>
      <button onClick={() => handleResetFunction()}> Reset Watch List</button>
      <h3>Total Estimated Watch Time: {totalWatchTime} hours</h3>
      </div>
    
    
      <div>
      {data.filter(matchesFilterType).map((item) => ( 
         <AnimeCard key={item} item={item} handleClick={handleClickFunction}/>  
      ))}
      </div>


      <div>
        {names.length == 0 ? null : names.map(
          str => <p>{str}</p>
        )}
      </div>
    </div>
  );
}

export default App;

