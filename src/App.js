import React,{useRef,useState} from 'react';
import "./styles/app.scss"
import Song from "../src/components/Song"
import Player from "../src/components/Player"
import data from "./data"
import Library from "./components/Library"
import Nav from "./components/Nav"

function App() {
  const audioRef=useRef(null)
  const[songs,setSongs]=useState(data())
  const[currentSong,setCurrentSong]=useState(songs[0])
  const[isPlaying,setIsPlaying]=useState(false)
  const[songInfo,setSongInfo]=useState({
    currentTime:0,
    duration:0
    })
    const [libraryStatus,setLibraryStatus]=useState(false)
  
    
    const timeUpdateHandler = (e) => {
      const current = e.target.currentTime;
      const duration = e.target.duration;
  
   
      setSongInfo({
        ...songInfo,
        currentTime: current,
        duration: duration,
       
      });
    };

    const songEndHandler = async () => {
      let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      if(isPlaying) audioRef.current.play()
    };
    
    
  return (
    <div className="app">
<Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song  currentSong={currentSong}/>

      <Player currentSong={currentSong}
      isPlaying={isPlaying}
      setIsPlaying={setIsPlaying}
      songInfo={songInfo}
      setSongInfo={setSongInfo}
      audioRef={audioRef}
      songs={songs} 
      setCurrentSong={setCurrentSong}
      setSongs={setSongs}
      />
<Library
 songs={songs}
  setCurrentSong={setCurrentSong}
  audioRef={audioRef}
  isPlaying={isPlaying}
  setSongs={setSongs}
  libraryStatus={libraryStatus}

  />

<audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
        
      
      ></audio>

    </div>
  );
}

export default App;
