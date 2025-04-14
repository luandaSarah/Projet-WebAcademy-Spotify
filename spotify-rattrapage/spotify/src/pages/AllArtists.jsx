import React from "react"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./Components/NavBar"
import TopButton from "./Components/TopButton"


function AllArtists() {

    const [Artists, setArtists] = useState([]);

    const [page, setPage] = useState(0);



     useEffect( ()=> {
            const fetchAllbums= async () => {
            try {
    
           const res = await fetch(`http://localhost:8000/Artists?page=${page}&limit=20`);
    
           if(!res.ok) {
            console.error(`Erreur HTTP ! statut : ${res.status}`);
           }
                const data = await res.json();
                    console.log(data)
                    setArtists((prevArtists) => {
                        const updatedArtists = [...prevArtists];
                        console.log(prevArtists);
                        data.forEach(artist => {
                            if (!updatedArtists.find(a => a.id === artist.id)) {
                                updatedArtists.push(artist);
                            }
                        });
                        return updatedArtists;
                    });
            } catch(error) {
                console.error(`Erreur lors de la requête : ${error}`)
            }}
    
            fetchAllbums();
        }, [page]);
    
    

    
    console.log(Artists);


    function NavigateDetails({ artistP, onClick }) {

        return <>
            <div className="artist-container" onClick={onClick} >
                <img src={artistP.photo} alt="Cover" className="artist-cover" />
                <h2 className="titre-artist">{artistP.name}</h2>
            </div>

            <TopButton />
        </>
    }

    const navigate = useNavigate();

    const handleClick = (id) => {

        navigate(`/artistDetails/:${id}`)
    }


    const handleScroll = () => {

        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setPage((prevPage) => prevPage + 10);


    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return <>
        <NavBar />
        <div className="container">
            {Artists.map(artist => (
                <NavigateDetails key={artist.id} artistP={artist} onClick={() => handleClick(artist.id)} />

            ))}
        </div>
        <TopButton />

    </>

}



export default AllArtists