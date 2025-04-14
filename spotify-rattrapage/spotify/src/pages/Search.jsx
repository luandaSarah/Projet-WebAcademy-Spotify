import React from "react"
import { useState, useEffect } from "react";
import NavBar from "./Components/NavBar"
import { useNavigate } from "react-router-dom";
import TopButton from "./Components/TopButton"



function Search() {

    const [search, setSearch] = useState("");
    // const [results, setResults] = useState([]);
    const [filter, setFilter] = useState("");
    const [albums, setAlbums] = useState([]);
    const [genres, setGenres] = useState([]);
    const [Artists, setArtists] = useState([]);
    const [page, setPage] = useState(0);

    let searchHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setSearch(lowerCase);
    }

    let selectHandler = (e) => {
        var change = e.target.value;
        setFilter(change);
    }

    console.log(filter)
    console.log(search)

    
    useEffect(() => {

        const fetchSerch = async () => {

            if (filter == "genre") {
      try {
      
             const res = await fetch(`http://localhost:8000/search?query=${search}&type=${filter}`);
      
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

         else if (filter == "albums") {
            const res = await  fetch(`http://localhost:8000/Albums?page=${page}&limit=20`) ;
            try {
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

         else if (filter == "artists") {
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
                 }
        }}
        fetchSerch();

    }, [page, search, filter]);


    const artResult = Artists.filter((art) => {
        return art.name.toLowerCase().includes(search)
    });

    const albResult = albums.filter((alb) => {
        return alb.name.toLowerCase().includes(search)
    });




    function NavigateDetails({ info, onClick }) {

        if (filter == "albums") {

            return <>
                <div className="album-container" onClick={onClick} >
                    <img src={info.cover} alt="Cover" className="album-cover" />
                    <h2 className="titre-album">{info.name}</h2>
                </div>

            </>
        } else if (filter == "artists") {
            return <>
                <div className="artist-container" onClick={onClick} >
                    <img src={info.photo} alt="Cover" className="artist-cover" />
                    <h2 className="titre-artist">{info.name}</h2>
                </div>

            </>
        } else if (filter == "genre") {
            return <>
                <div className="container">
                    <h2 className="titre-genre" onClick={onClick}>{info.name}</h2>
                </div>
            </>
        }
    }

    const navigate = useNavigate();

    const handleClick = (id, path) => {

        navigate(`/${path}Details/:${id}`)
    }

    console.log(artResult)
    // console.log(albResult)



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
        <div className="container-search">

            <div className="search">
                <input type="text" name="searchBar" id="searchBar" placeholder="Rechercher" onChange={searchHandler} />
                <select onChange={selectHandler}>
                    <option value="">Filtres</option>
                    <option value="artists">Artiste</option>
                    <option value="albums">Album</option>
                </select>

            </div>

            <div className="container">

                {albResult.map(album => (
                    <NavigateDetails key={album.id} info={album} onClick={() => handleClick(album.id, "album")} />
                ))}
                {artResult.map(artist => (
                    <NavigateDetails key={artist.id} info={artist} onClick={() => handleClick(artist.id, "artist")} />
                ))}

            </div>
            <TopButton />

        </div >
    </>


}

export default Search