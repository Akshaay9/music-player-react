import React from 'react';
import {playAudio} from "../util"


function LibrarySong({song,setCurrentSong,songs,id,audioRef,isPlaying,setSongs}) {


    const songSelectHAndler=()=>{
        
        setCurrentSong(song)
        const newSong=songs.map((song)=>{
            if(song.id===id)
            {
            return{
                ...song,
            active:true,
            }
            }
            else{
                return {
            ...song,
            active:false,
            }
            }
            })
            setSongs(newSong)
// add active  state

playAudio(isPlaying,audioRef)



    }
    return (
        <div>
          
          
            <div className={`library-song ${song.active ? "selected" : ""}`}onClick={songSelectHAndler}>
               <img src={song.cover} alt={song.name}/>
               <div className="song-description">
              
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4></div>
            </div>
            
        </div>
    )
}

export default LibrarySong;
