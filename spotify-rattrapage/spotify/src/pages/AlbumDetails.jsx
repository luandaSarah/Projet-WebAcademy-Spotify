import React from "react"
import { useState, useEffect } from "react";
import NavBar from "./Components/NavBar"
import { useParams } from "react-router-dom";

function AlbumDetails() {

    const [albumDetails, setAlbumDetails] = useState([]);
    const [albumTracks, setAlbumTracks] = useState([]);

    let param = useParams().id.slice(1);


    useEffect( ()=> {
        const fetchDetails = async () => {
        try {

       const res = await fetch(`http://localhost:8000/albums/${param}`);

       if(!res.ok) {
        console.error(`Erreur HTTP ! statut : ${res.status}`);
       }
            const data = await res.json();
                console.log(data)
                setAlbumDetails(data.album);
                setAlbumTracks(data.tracks);
           
        } catch(error) {
            console.error(`Erreur lors de la requête : ${error}`)
        }}

        fetchDetails();
    }, []);

 

    console.log(param);
    // setAlbumId(param);


    return <>
        <NavBar />
        <div className="container-details">

            <div className="details">
                <img src={albumDetails.cover} alt="cover" />
                <div className="info">
                    <h2>{albumDetails.name}</h2>
                    <p>{albumDetails.description}</p>
                </div>

                <div className="tracks-list">
                    {albumTracks.map(track => (
                        <div className="track">
                            <p className="track-number">
                                {track.track_no}
                            </p>
                            <h3>{track.name}</h3>
                            <audio src={track.mp3} controls></audio>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    </>
}

export default AlbumDetails