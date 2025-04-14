import React from "react"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./Components/NavBar"
import TopButton from "./Components/TopButton"

function AllAlbums() {

    const [albums, setAlbums] = useState([]);

    const [page, setPage] = useState(0);

 useEffect( ()=> {
        const fetchAlbums= async () => {
        try {

       const res = await fetch(`http://localhost:8000/albums?page=${page}&limit=20`);

       if(!res.ok) {
        console.error(`Erreur HTTP ! statut : ${res.status}`);
       }
            const data = await res.json();
                console.log(data)
                setAlbums((prevAlbums) => {
                    const updatedAlbums = [...prevAlbums];
                    data.forEach(album => {
                        if (!updatedAlbums.find(a => a.id === album.id)) {
                            updatedAlbums.push(album);
                        }
                    });
                    return updatedAlbums;
                });
        } catch(error) {
            console.error(`Erreur lors de la requête : ${error}`)
        }}

        fetchAlbums();
    }, [page]);


    console.log(albums);



    function NavigateDetails({albumP, onClick}) {

        return <>
                <div className="album-container" onClick={onClick} >
                    <img src={albumP.cover} alt="Cover" className="album-cover" />
                    <h2 className="titre-album">{albumP.name}</h2>
                </div>
            
            <TopButton />
        </>
    }

    const navigate = useNavigate();

    const handleClick = (id) => {

        navigate(`/albumDetails/:${id}`)
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
        {albums.map(album => (
            <NavigateDetails key={album.id} albumP={album} onClick={()=> handleClick(album.id)}/>
        ))}
        </div>
    </>

}

export default AllAlbums