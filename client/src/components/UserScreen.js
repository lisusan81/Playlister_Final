import {useState } from 'react';
import { Link } from 'react-router-dom'
import { useContext } from 'react'
// import SplashScreen from './SplashScreen'
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'
import HomeScreen from './HomeScreen'
import Statusbar from './Statusbar';
import WorkspaceScreen from './WorkspaceScreen';
import YouTubePlayerScreen from './YouTubePlayerScreen';

import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Groups2Icon from '@mui/icons-material/Groups2';
import HomeIcon from '@mui/icons-material/Home';
import { Icon, TextField } from '@mui/material'
import SegmentIcon from '@mui/icons-material/Segment';

export default function UserScreen() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    function handleSortByName() {
        store.sortByName();
        handleMenuClose()
    }

    function handleSortByLikes() {
        store.sortByLikes();
        handleMenuClose()
    }
    function handleSortByDislikes() {
        store.sortByDislikes()
        handleMenuClose()
    }
    function handleSortByListens() {
        store.sortByListens()
        handleMenuClose()
    }
    function handleSortByPublish(){
        store.sortByPublish()
        handleMenuClose()
    }
    function handleKeyPress(event) {
        if (event.code === "Enter" && (store.getLeftComponent() == "listSearch")) {
            // store.change(id, text);
            // toggleEdit();

            // console.log(event.target.value)
            store.listSearch(event.target.value);
            console.log(store.getLeftComponent());
        }else if (event.code === "Enter" && (store.getLeftComponent() == "userSearch")) {
            // store.change(id, text);
            // toggleEdit();

            // console.log(event.target.value)

            store.userSearch(event.target.value);
        }
    }
    let leftComponent = <HomeScreen/>;
    if(store.currentList !== null){
        leftComponent = <WorkspaceScreen />
    }
    const handleHouseClick = () => {
        leftComponent = <HomeScreen />
        store.homeScreen();
    }
    const handleListSearchClick = (event) => {
        store.listSearchIconClick();
    }
    const handleUserSearchClick = () => {
        store.userSearchIconClick();
    }
    const sortByMenu = (
        <Menu
            anchorEl={anchorEl}
            // anchorOrigin={{
            //     vertical: 'top',
            //     horizontal: 'right',
            // }}
            // id="sort-by-menu"
            // keepMounted
            // transformOrigin={{
            //     vertical: 'top',
            //     horizontal: 'right',
            // }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleSortByName}>Name (A-Z)</MenuItem>
            <MenuItem onClick={handleSortByPublish}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={handleSortByListens}>Listens (High-Low)</MenuItem>
            <MenuItem onClick={handleSortByLikes}>Likes (High-Low)</MenuItem>
            <MenuItem onClick={handleSortByDislikes}>Dislikes (High-Low)</MenuItem>
        </Menu>
    );

    const currentLeftComponent = store.getLeftComponent()
    let homeScreenColor = "black";
    let listSearchColor = "white";
    let userSearchColor = "white";
    if(currentLeftComponent == "homeScreen"){
        homeScreenColor = 'black';
        listSearchColor = 'white';
        userSearchColor = 'white';
    }else if(currentLeftComponent == "listSearch"){
        homeScreenColor = 'white';
        listSearchColor = 'black';
        userSearchColor = 'white';
    }else if(currentLeftComponent == "userSearch"){
        homeScreenColor = 'white';
        listSearchColor = 'white';
        userSearchColor = 'black';
    }

    return(
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" sx={{ height: "58px", display: { xs: 'none', md: 'flex' } }}>
                <Toolbar>
                    {/* <Typography                        
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}                        
                    > */}
                        <Box>
                            
                            <IconButton onClick={handleHouseClick} >
                                <HomeIcon style={{ textDecoration: 'none', color: homeScreenColor, height:"27px", width:"30px" }} />
                            </IconButton>
                            <IconButton onClick={handleListSearchClick} >
                                <Groups2Icon style={{ textDecoration: 'none', color: listSearchColor, height:"27px", width:"30px" }}/>
                            </IconButton>
                            <IconButton onClick={handleUserSearchClick} >
                                <PersonSearchIcon style={{ textDecoration: 'none', color: userSearchColor, height:"27px", width:"30px" }}/>
                            </IconButton>
                        </Box>

                        <Box sx={{transform:"translate(80%, 0%)"}}>
                            <TextField 
                                id="outlined-basic" 
                                label="Search" 
                                size="small" 
                                variant="outlined" 
                                style={{bgcolor:'white', color: 'white', height:"55x", width:"300px" }} 
                                onKeyPress={handleKeyPress}
                                // onChange={handleSearch}
                            />
                        </Box>

                        <Box sx={{transform:"translate(620%, 9%)"}}>
                            Sort By
                            <IconButton onClick={handleProfileMenuOpen}>
                                <SegmentIcon />
                                    
                            </IconButton>
                            {sortByMenu}
                        </Box>
                        
                    {/* </Typography> */}
                </Toolbar>
            </AppBar>
            {
                leftComponent
            }
            <Box>
                <YouTubePlayerScreen />
            </Box>
            <Box>
                <Statusbar />
            </Box>
            
        </Box>
    )

}