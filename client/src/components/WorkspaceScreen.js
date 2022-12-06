import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'
import EditToolbar from './EditToolbar.js'
import { Button } from '@mui/material'
import CopyAllIcon from '@mui/icons-material/CopyAll';
import CloseIcon from '@mui/icons-material/HighlightOff';

/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    function handleClose() {
        store.closeCurrentList();
    }
    function handleDuplicate() {
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    }
    
    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    let toolbar = <EditToolbar />
    if(store.currentList.isPublished){
        toolbar =
            <div id="edit-toolbar">
                <Button 
                    // disabled={!store.canRedo()}
                    id='duplicate-button'
                    onClick={handleDuplicate}
                    variant="contained">
                        <CopyAllIcon />Duplicate
                </Button>
                <Button 
                    disabled={!store.canClose()}
                    id='close-button'
                    onClick={handleClose}
                    variant="contained">
                        <CloseIcon />
                </Button>
            </div>
    }

    
    return (
        <Box id="list-selector-list">
        <List 
            id="playlist-cards" 
            sx={{overflow: 'scroll', height: '87%', width: '100%', bgcolor: '#8000F00F'}}
        >
            {
                store.currentList.songs.map((song, index) => (
                    <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                    />
                ))  
            }
            {/* <EditToolbar /> */}
            {toolbar}
         </List>            
         { modalJSX }
        
         </Box>
    )
}

export default WorkspaceScreen;