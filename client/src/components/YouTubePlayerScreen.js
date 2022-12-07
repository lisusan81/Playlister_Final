import React from 'react';
import YouTube from 'react-youtube';
import { GlobalStoreContext } from '../store'
import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import { TabContext } from '@mui/lab';
import {TabList} from '@mui/lab';
import {TabPanel} from '@mui/lab';
import { IconButton, Tab } from '@mui/material';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import StopIcon from '@mui/icons-material/Stop';



export default function YouTubePlayerScreen() {
    const { store } = useContext(GlobalStoreContext);
    const [playingSong, setPlayingSong] = useState("youTube");
    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT

    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    let playlist = [
        "mqmxkGjow1A",
        "8RbXIMZmVv8",
        "8UbNbor3OqQ"
    ];

    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    let currentSong = 0;

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
        let song = playlist[currentSong];
        player.loadVideoById(song);
        player.playVideo();
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        currentSong++;
        currentSong = currentSong % playlist.length;
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

    }
    function handlePause(){

    }
    function handlePlay(){

    }
    function handlePlayNextSong(){

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
                    /> */}
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
                </TabPanel>
                <TabPanel value="comments">Comments</TabPanel>
            </TabContext>
        </div>
        )
}