import { useContext } from 'react'
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import { Box } from '@mui/system';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/



function Statusbar() {

    function clickHandler() {
        store.tryAcessingOtherAccountPlaylist();
    }

    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    console.log("logged in: " +  auth.loggedIn);

    function handleCreateNewList() {
        store.createNewList();
        
    }

    let text ="";
    if (auth.loggedIn && (auth.user.email != "guest")){
        // text = store.currentList.name;
        console.log(auth.user.email);
        text=
        
            <Box>
                <Fab sx={{transform:"translate(300%, -10%)"}} size="medium"
                    color="primary" 
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                >
                    <AddIcon />
                </Fab>
                    Your Playlists
            </Box>
    if(store.currentList){
        text = store.currentList.name;
    }
        
    return (
        <div id="playlister-statusbar">
            {text}
        </div>
    );
    }
    return null;
}

export default Statusbar;