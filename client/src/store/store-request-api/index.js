/*
    This is our http api, which we use to send requests to
    our back-end API. Note we`re using the Axios library
    for doing this, which is an easy to use AJAX-based
    library. We could (and maybe should) use Fetch, which
    is a native (to browsers) standard, but Axios is easier
    to use when sending JSON back and forth and it`s a Promise-
    based API which helps a lot with asynchronous communication.
    
    @author McKilla Gorilla
*/

import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /top5list). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE WE WILL FORMAT HERE, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES
export const createPlaylist = (newListName, newSongs, userEmail, userUsername, isPublished, likes, dislikes, listens ) => {
    return api.post(`/playlist/`, {
        // SPECIFY THE PAYLOAD
        name: newListName,
        songs: newSongs,
        ownerEmail: userEmail,
        ownerUsername: userUsername,
        isPublished: isPublished,
        // publishDate: publishDate,
        likes: likes,
        dislikes: dislikes,
        listens: listens
    })
}
export const duplicatePlaylist = (newListName, newSongs, userEmail, userUsername, isPublished, publishDate, likes, dislikes, listens ) => {
    return api.post(`/duplicateplaylist/`, {
        // SPECIFY THE PAYLOAD
        name: newListName,
        songs: newSongs,
        ownerEmail: userEmail,
        ownerUsername: userUsername,
        isPublished: isPublished,
        publishDate: publishDate,
        likes: likes,
        dislikes: dislikes,
        listens: listens
    })
}
export const deletePlaylistById = (id) => api.delete(`/playlist/${id}`)
export const getPlaylistById = (id) => api.get(`/playlist/${id}`)
export const getAnyPlaylistById = (id) => api.get(`/playlistany/${id}`)
export const getPlaylistPairs = () => api.get(`/playlistpairs/`)
export const getPlaylists = () => api.get(`/playlists/`)
export const updatePlaylistById = (id, playlist) => {
    return api.put(`/playlist/${id}`, {
        // SPECIFY THE PAYLOAD
        playlist : playlist
    })
}
export const updateAnyPlaylistById = (id, playlist) => {
    return api.put(`/anyplaylist/${id}`, {
        // SPECIFY THE PAYLOAD
        playlist : playlist
    })
}

const apis = {
    createPlaylist,
    duplicatePlaylist,
    deletePlaylistById,
    getPlaylistById,
    getAnyPlaylistById,
    getPlaylistPairs,
    updatePlaylistById,
    updateAnyPlaylistById,
    getPlaylists
}

export default apis
