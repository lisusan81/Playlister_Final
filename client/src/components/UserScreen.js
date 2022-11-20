import {useState } from 'react';
import { Link } from 'react-router-dom'
import { useContext } from 'react'
// import SplashScreen from './SplashScreen'
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'
import HomeScreen from './HomeScreen'

import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import { TextField } from '@mui/material'

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
        leftComponent = <HomeScreen />
    }
    const handleListSearch = () => {

    }
    const handleUserSearch = () => {
        
    }
    const sortByMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id="sort-by-menu"
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
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
            <AppBar position="static" sx={{ height: "59px", display: { xs: 'none', md: 'flex' } }}>
                <Toolbar>
                    <Typography                        
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}                        
                    >
                        <HomeIcon onClick={handleHouseClick} style={{ textDecoration: 'none', color: 'white' }}/>
                        <PeopleIcon onClick={handleListSearch} style={{ textDecoration: 'none', color: 'white' }}/>
                        <PersonSearchIcon onClick={handleUserSearch} style={{ textDecoration: 'none', color: 'white' }}/>
                        
                        {/* <Link onClick={handleHouseClick} style={{ textDecoration: 'none', color: 'white' }} to='/'>⌂</Link> */}
                        {/* <Link onClick={handleListSearch} style={{ textDecoration: 'none', color: 'white' }} to='/'></Link> */}
                        {/* <Link onClick={handleUserSearch} style={{ textDecoration: 'none', color: 'white' }} to='/'></Link> */}

                        <TextField id="outlined-basic" label="Search" variant="outlined" style={{bgcolor:'white', color: 'white' }}/>
                        {sortByMenu}
                    </Typography>
                </Toolbar>
            </AppBar>
            {
                leftComponent
            }
        </Box>
    )

}