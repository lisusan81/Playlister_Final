import {useState } from 'react';
import { Link } from 'react-router-dom'
import { useContext } from 'react'
// import SplashScreen from './SplashScreen'
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'
import HomeScreen from './HomeScreen'
// import YouTubePlayerScreen from './YouTubePlayerScreen';

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

    const leftComponent = <HomeScreen/>;
    const handleHouseClick = () => {
        // leftComponent = <HomeScreen />
    }
    const handleListSearch = () => {

    }
    const handleUserSearch = () => {
        
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
            <MenuItem onClick={handleMenuClose}>Name (A-Z)</MenuItem>
            <MenuItem onClick={handleMenuClose}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={handleMenuClose}>Listens (High-Low)</MenuItem>
            <MenuItem onClick={handleMenuClose}>Likes (High-Low)</MenuItem>
            <MenuItem onClick={handleMenuClose}>Dislikes (High-Low)</MenuItem>
        </Menu>
    );

    return(
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" sx={{ height: "52px", display: { xs: 'none', md: 'flex' } }}>
                <Toolbar>
                    {/* <Typography                        
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}                        
                    > */}
                        <Box>
                            <IconButton onClick={handleHouseClick} >
                                <HomeIcon style={{ textDecoration: 'none', color: 'white', height:"27px", width:"30px" }} />
                            </IconButton>
                            <IconButton onClick={handleListSearch} >
                                <Groups2Icon style={{ textDecoration: 'none', color: 'white', height:"27px", width:"30px" }}/>
                            </IconButton>
                            <IconButton onClick={handleUserSearch} >
                                <PersonSearchIcon style={{ textDecoration: 'none', color: 'white', height:"27px", width:"30px" }}/>
                            </IconButton>
                        </Box>

                        <Box sx={{transform:"translate(80%, 0%)"}}>
                            <TextField id="outlined-basic" label="Search" size="small" variant="outlined" style={{bgcolor:'white', color: 'white', height:"55x", width:"300px" }} />
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
        </Box>
    )

}