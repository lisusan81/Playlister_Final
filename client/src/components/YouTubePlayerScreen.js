import React from 'react';
import YouTube from 'react-youtube';
import { GlobalStoreContext } from '../store'
import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import { TabContext } from '@mui/lab';
import {TabList} from '@mui/lab';
import {TabPanel} from '@mui/lab';
import { IconButton, Tab } from '@mui/material';
import { Icon, TextField } from '@mui/material'
import AuthContext from '../auth'

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import StopIcon from '@mui/icons-material/Stop';
import ListItem from '@mui/material';



export default function YouTubePlayerScreen() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [playingSong, setPlayingSong] = useState("youTube");
    const [songIndex, setSongIndex] = useState(0);
    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT

    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    // let playlist = [
    //     "mqmxkGjow1A",
    //     "8RbXIMZmVv8",
    //     "8UbNbor3OqQ"
    // ];

    let playlist = [];
    if(store.currentList !== null && store.currentList.isPublished !== false){
        playlist = store.currentList.songs.map((ele) => ele.youTubeId)
    }
    console.log(playlist);

    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    // let currentSong = 0;

    const playerOptions = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        let song = playlist[songIndex];
        player.loadVideoById(song);
        player.playVideo();
        
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong(event) {
        // currentSong++;
        // currentSong = currentSong % playlist.length;

        setSongIndex((songIndex+1) % playlist.length)

        // currentSong = currentSong + 1;
        // currentSong = currentSong % playlist.length;
    }
    function decSong() {
        // currentSong--;
        // currentSong = currentSong % playlist.length;

        if(songIndex != 0){
            setSongIndex((songIndex-1) % playlist.length)
        }
        
    }
    let player;
    function onPlayerReady(event) {
        player = event.target
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
    }

    function handleKeyPress(event) {
        if (event.code === "Enter" && (auth.loggedIn)) {
            // store.change(id, text);
            // toggleEdit();

            console.log(event.target.value);
            console.log(auth.user.username);
            store.addComment(event.target.value, auth.user.username);
        }
    }

    // let youTubeTabValue = "youTube";
    function handleChange(event,newValue) {
        // if(youTubeTabValue === "youTube"){
        //     youTubeTabValue = "comments"
        // }else{
        //     youTubeTabValue = "youTube"
        // }
        event.stopPropagation();
        setPlayingSong(newValue);

    }
    function handlePlayPreviousSong(){
        decSong();
    }
    function handlePause(){
        player.pauseVideo();
    }
    function handlePlay(){
        player.playVideo();
        store.updateListens();
    }
    function handlePlayNextSong(){
        incSong();
    }
    let listName = "";
    let listSongNumber = "";
    let listSongTitle = "";
    let listSongArtist = "";
    if(store.currentList !== null && (store.currentList.songs.length === songIndex) && store.currentList.publishedDate !== undefined ){
        setSongIndex(0);
    }
    console.log(store.currentList)
    
    if(store.currentList !== null && store.currentList.publishDate !== undefined ){
        console.log(store.currentList.name);
        listName = store.currentList.name;
        listSongNumber = "Song #: " + (songIndex+1);
        listSongTitle = "Title: " + store.currentList.songs[songIndex].title;
        listSongArtist = "Artist: " + store.currentList.songs[songIndex].artist;
    }
    let youTubeTab = "No List Selected Yet";
    if(store.currentList !== null){
        youTubeTab = 
        <Box>
            <YouTube
                videoId={playlist[songIndex]}
                opts={playerOptions}
                onReady={onPlayerReady}
                onStateChange={onPlayerStateChange} 
            />
            
            <Box style={{transform:"translate(12%,0%)"}}>
                <IconButton onClick={handlePlayPreviousSong} >
                    <SkipPreviousIcon style={{fontSize:'30pt'}}/>
                </IconButton>
                <IconButton onClick={handlePause}>
                    <StopIcon style={{fontSize:'30pt'}} />
                </IconButton>
                <IconButton onClick={handlePlay}>
                    <PlayArrowIcon style={{fontSize:'30pt'}}/>
                </IconButton>
                <IconButton onClick={handlePlayNextSong}>
                    <SkipNextIcon style={{fontSize:'30pt'}}/>
                </IconButton>
            </Box>
            <Box>
                {listName}
            </Box>
            <Box>
                {listSongNumber}
            </Box>
            <Box>
                {listSongTitle}
            </Box>
            <Box>
                {listSongArtist}
            </Box>
        </Box>
    }
    let commentSection = "";
    let commentInputField = "";
    if(store.currentList !== null){
        commentInputField =
        <TextField 
            id="outlined-basic" 
            label="Comment" 
            size="small" 
            variant="outlined" 
            style={{bgcolor:'white', color: 'white', height:"55x", width:"300px" }} 
            onKeyPress={handleKeyPress}
            // onChange={handleSearch}
        />
    }
    
    if (store.currentList !== null && store.currentList.comments !== undefined) {
        console.log(store.currentList.comments[0])
        commentSection = store.currentList.comments.map((comment) => (
            // <Box key={"comment-" +{index}}>
            //     {pair.post}
            // </Box>
            <div className="eachComment">
                {comment.username}
                <br></br>
                {comment.post}
                <br></br>
            </div>
        ))
            // <Box sx={{width: '100%', bgcolor: 'background.paper', mb:"20px" }}>
            // {
                
                
            // }
            // </Box>;

           
    }

        
            
    

    return (
        <div id="youTubeScreen">
            {/* <YouTube
                videoId={playlist[currentSong]}
                opts={playerOptions}
                onReady={onPlayerReady}
                onStateChange={onPlayerStateChange} /> */}
            <TabContext value={playingSong}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="youTube" value="youTube" />
                        <Tab label="comments" value="comments" />
                    </TabList>
                </Box>
                <TabPanel value="youTube">
                    {/* <YouTube
                        videoId={playlist[currentSong]}
                        opts={playerOptions}
                        onReady={onPlayerReady}
                        onStateChange={onPlayerStateChange} 
                    />
                    <Box style={{transform:"translate(12%,0%)"}}>
                        <IconButton onClick={handlePlayPreviousSong} >
                            <SkipPreviousIcon style={{fontSize:'30pt'}}/>
                        </IconButton>
                        <IconButton onClick={handlePause}>
                            <StopIcon style={{fontSize:'30pt'}} />
                        </IconButton>
                        <IconButton onClick={handlePlay}>
                            <PlayArrowIcon style={{fontSize:'30pt'}}/>
                        </IconButton>
                        <IconButton onClick={handlePlayNextSong}>
                            <SkipNextIcon style={{fontSize:'30pt'}}/>
                        </IconButton>
                    </Box> */}
                    {youTubeTab}
                </TabPanel>
                <TabPanel value="comments">
                    {commentSection}
                    <Box>
                    {commentInputField}
                    </Box>
                        
                </TabPanel>
            </TabContext>
        </div>
        )
}