import React,{useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPlay,
faAngleLeft,
faAngleRight, 
faPause
} from "@fortawesome/free-solid-svg-icons"
import {playAudio} from "../util"

function Player({currentSong,isPlaying,setIsPlaying,audioRef,setSongInfo,songInfo,songs,setCurrentSong,setSongs} ) {

  useEffect(()=>{
    const newSongs=songs.map((song)=>{
      if(song.id===currentSong.id)
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
      setSongs(newSongs)

  },[currentSong])
    
    


    
    const playSongHandler=()=>{
        if(isPlaying)
        {
            audioRef.current.pause()
            
            setIsPlaying(!isPlaying)
        }
        else
        {
            audioRef.current.play()
            setIsPlaying(!isPlaying)
        }

    }
    // state


    function getTime(time) {
        
        
        
        
        return (
          Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
      }
      const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value });
      };
      // skipsongs

      const skipTrackHandler=(direction)=>{
        const currentIndex=songs.findIndex((song)=>song.id===currentSong.id)
     if(direction==="skip-forward")
     {
setCurrentSong(songs[(currentIndex+1)%songs.length])
     }
    
        if(direction==="skip-back")
        {
if((currentIndex-1)%songs.length===-1)
{
  setCurrentSong(songs[songs.length-1])
  playAudio(isPlaying,audioRef)

  return;
}

        
          setCurrentSong(songs[(currentIndex-1)%songs.length])
        
}
playAudio(isPlaying,audioRef)
    }

    return (
        <div className="player">
        {/* {Time } */}
        <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
            <input
            value={songInfo.currentTime}
            
            type="range"
            max={songInfo.duration || 0}
            min={0}
            onChange={dragHandler}
          />
            <p>{getTime(songInfo.duration)}</p>
        </div>

        {/* {forward icons adding dynamically} */}
        <div className="play-control">

        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft}onClick={()=>skipTrackHandler("skip-back")} />

        <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x"  icon={isPlaying? faPause:faPlay} />

        <FontAwesomeIcon className="skip-forward" size="2x"  icon={faAngleRight}
         onClick={()=>skipTrackHandler("skip-forward")} 
         />
        </div>
    
            
        </div>
    )
}

export default Player
