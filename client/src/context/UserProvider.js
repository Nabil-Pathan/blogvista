import React , {useState , useEffect} from "react";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom"

const UserProvider = ({children}) => {
    const navigate = useNavigate()
    const [user , setUser] = useState(null)

    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        setUser(userInfo)
    }, [navigate])

    return(
        <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    )
}

export default UserProvider

