import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import CloseIcon from '@mui/icons-material/HighlightOff';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import PublishIcon from '@mui/icons-material/Publish';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);

    function handleAddNewSong() {
        store.addNewSong();
    }
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        store.closeCurrentList();
    }
    function handlePublish() {
        store.publishList();
    }
    function handleDuplicate() {
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    }
    return (
        <div id="edit-toolbar">
            <Button
                disabled={!store.canAddNewSong()}
                id='add-song-button'
                onClick={handleAddNewSong}
                variant="contained">
                <AddIcon />Add Song
            </Button>
            <Button 
                disabled={!store.canUndo()}
                id='undo-button'
                onClick={handleUndo}
                variant="contained">
                    <UndoIcon />Undo
            </Button>
            <Button 
                disabled={!store.canRedo()}
                id='redo-button'
                onClick={handleRedo}
                variant="contained">
                    <RedoIcon />Redo
            </Button>
            <Button 
                // disabled={!store.canRedo()}
                id='duplicate-button'
                onClick={handleDuplicate}
                variant="contained">
                    <CopyAllIcon />Duplicate
            </Button>
            <Button 
                // disabled={!store.canRedo()}
                id='publish-button'
                onClick={handlePublish}
                variant="contained">
                    <PublishIcon />Publish
            </Button>
            <Button 
                disabled={!store.canClose()}
                id='close-button'
                onClick={handleClose}
                variant="contained">
                    <CloseIcon />
            </Button>
        </div>
    )
}

export default EditToolbar;