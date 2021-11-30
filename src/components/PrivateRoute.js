import React, {useContext} from "react";
import { AuthContext } from "../context/auth";
import { Redirect, Route} from "react-router-dom";

const PrivateRoute = ({component: Component, ...rest})=>{
    const user = useContext(AuthContext);
    
    return (
        <Route 
            {...rest}
            render={(props)=> user? <Component {...props} />: <Redirect to="/login"/>}
        />
    )
}
export default PrivateRoute;