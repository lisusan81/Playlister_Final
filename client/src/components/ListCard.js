import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleLikeList(event, id) {
        event.stopPropagation();
        // let _id = event.target.id;
        // _id = ("" + _id).substring("delete-list-".length);
        // store.markListForDeletion(id);

        store.likeList(idNamePair._id);
    }
    function handleDislikeList(event, id) {
        event.stopPropagation();
        // let _id = event.target.id;
        // _id = ("" + _id).substring("delete-list-".length);
        // store.markListForDeletion(id);
        store.dislikeList(idNamePair._id);
    }
    function handleOpenList(event, id) {
        event.stopPropagation();
        // let _id = event.target.id;
        // _id = ("" + _id).substring("delete-list-".length);
        // store.markListForDeletion(id);

        store.setCurrentList(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    let cardPublishInfo = "Published: ";
    // store.returnListById(idNamePair._id);
    // console.log(store.publishListInfo);
    // console.log(store.publishListInfo);
    if(idNamePair.isPublished){
        // const date = idNamePair.publishDate;
        // console.log(typeof date);
        cardPublishInfo += idNamePair.publishDate.toString().substring(0,10);
    }
    let username = "By: "
    // if(auth.loggedIn){
        
    // }
    username += idNamePair.ownerUsername;

    let cardListensInfo = "Listens: ";
    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{borderRadius:"25px", p: "10px", bgcolor: '#8000F00F', marginTop: '15px', display: 'flex', p: 1 }}
            style={{transform:"translate(1%,0%)", width: '98%', fontSize: '35pt' }}
            button
            onClick={(event) => {
                handleLoadList(event, idNamePair._id)
            }}
        >
            <Box>
            <Box sx={{ p: 1, flexGrow: 1 }}>
                {idNamePair.name}
                <IconButton onClick={handleToggleEdit} aria-label='edit' disabled={idNamePair.isPublished}>
                    <EditIcon style={{fontSize:'30pt'}} />
                </IconButton>
                <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                    <DeleteIcon style={{fontSize:'30pt'}} />
                </IconButton>
            </Box>
            <Box sx={{ p: 1, flexGrow: 1 }} style={{fontSize: '13pt' }}>
                {username}
            </Box>
            <Box sx={{ p: 1, flexGrow: 1 }} style={{fontSize: '13pt' }}>
                {cardPublishInfo}
            </Box>
            </Box>
            
            <Box sx={{ p: 1 }}>
                <IconButton onClick={(event) => {
                        handleLikeList(event, idNamePair._id)
                    }}>
                    <ThumbUpOffAltIcon style={{fontSize:'30pt'}}/>
                </IconButton>
                {idNamePair.likes}
                <IconButton onClick={(event) => {
                        handleDislikeList(event, idNamePair._id)
                    }}>
                    <ThumbDownOffAltIcon style={{fontSize:'30pt'}}/>
                </IconButton>
                {idNamePair.dislikes}
            </Box>
            <Box sx={{ p: 2 }}>
                <IconButton onClick={(event) => {
                        handleOpenList(event, idNamePair._id)
                    }}>
                    <KeyboardDoubleArrowDownIcon />
                </IconButton>
            </Box>
        </ListItem>


    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;