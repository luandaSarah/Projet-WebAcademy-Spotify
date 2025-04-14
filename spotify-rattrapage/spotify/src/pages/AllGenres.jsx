import React from "react"
import { useState, useEffect } from "react";
import NavBar from "./Components/NavBar";
import { useNavigate } from "react-router-dom";

    
function AllGenres() {
    const [genres, setGenres] = useState([]);

 

    useEffect( ()=> {
        const fetchGenres= async () => {
        try {

       const res = await fetch('http://localhost:8000/genres');

       if(!res.ok) {
        console.error(`Erreur HTTP ! statut : ${res.status}`);
       }
            const data = await res.json();
           
    
                setGenres(data);
        } catch(error) {
            console.error(`Erreur lors de la requête : ${error}`)
        }}

        fetchGenres();
    }, []);


    console.log(genres);


    function NavigateDetails({ genreP, onClick }) {

        return <>
            <h2 className="titre-genre"  onClick={onClick}>{genreP.name}</h2>

        </>
    }

    const navigate = useNavigate();

    const handleClick = (id) => {

        navigate(`/genreDetails/:${id}`)
    }


    return <>
        <NavBar />
        <div className="container-all-genres">
            {genres.map(genre => (
                <NavigateDetails key={genre.id} genreP={genre} onClick={() => handleClick(genre.id)} />

            ))}
        </div>

    </>
}

export default AllGenres