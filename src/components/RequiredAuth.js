import {useLocation,Navigate,Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const RequiredAuth = ({allowedRoles}) =>{

    const {auth} = useAuth();
    const location = useLocation();

    return(
        auth?.roles?.find(role=> allowedRoles?.includes(role))
        ?        <Outlet />   
        :auth?.user
        ? <Navigate to="/unauthorized" state={{ from: location }} replace />
         //this outlet is second outlet other than thaat on layout ,this one represents any child component of require auth ,so this comp can protect all the child components and we get that closing route that we can put after these other routes that we want to protect ]
         :<Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequiredAuth;