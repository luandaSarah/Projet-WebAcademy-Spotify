import React from "react"
import { useState, useEffect } from "react";
import NavBar from "./Components/NavBar"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function ArtistDetails() {

  let param = useParams().id.slice(1);

  const [artistDetails, setArtistDetails] = useState([]);
  const [artistAlbums, setArtistAlbums] = useState([]);


  useEffect(() => {
    fetch(`http://localhost:8000/artists/${param}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setArtistDetails(data);
      });


  }, []);


  useEffect( ()=> {
          const fetchDetails = async () => {
          try {
  
         const res = await fetch(`http://localhost:8000/albums/artist/${param}`);
  
         if(!res.ok) {
          console.error(`Erreur HTTP ! statut : ${res.status}`);
         }
              const data = await res.json();
                  console.log(data)
                  setArtistAlbums(data);
             
          } catch(error) {
              console.error(`Erreur lors de la requête : ${error}`)
          }}
  
          fetchDetails();
      }, []);
 



  function NavigateDetails({ albumP, onClick }) {

    return <>
      <div className="album-container" onClick={onClick} >
        <img src={albumP.cover} alt="Cover" className="album-cover" />
        <h2 className="titre-album">{albumP.name}</h2>
      </div>
    </>
  }

  const navigate = useNavigate();

  const handleClick = (id) => {

    navigate(`/albumDetails/:${id}`)
  }

  return <>
    <NavBar />
    <div className="container-details">

      <div className="details">
        <img src={artistDetails.photo} alt="photo" />
        <h2>{artistDetails.name}</h2>
        <div className="info">
          <h3>{artistDetails.description}</h3>
          <p>{artistDetails.bio}</p>
        </div>


        <div className="artist-albums"></div>
        {artistAlbums.map(album => (
          <NavigateDetails key={album.id} albumP={album} onClick={() => handleClick(album.id)} />
        ))}

      </div>
    </div>
  </>
}

export default ArtistDetails