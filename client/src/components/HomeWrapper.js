import { useContext } from 'react'
import UserScreen from './UserScreen';
import SplashScreen from './SplashScreen'
import AuthContext from '../auth'

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);
    
    if (auth.loggedIn)
        return <UserScreen />
    else
        return <SplashScreen />
}