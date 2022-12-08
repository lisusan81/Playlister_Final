import Copyright from "./Copyright"
export default function SplashScreen() {
    return (
        <div id="splash-screen">
            Welcome to Playlister!
            <div id="splash-screen-message">
                Playlister was created with the intention of connecting users through music.
                Users can create, edit playlists, as well as duplicate, listen, and comment on published list.
                Enjoy!!
            </div>
            <Copyright />
        </div>
    )
}