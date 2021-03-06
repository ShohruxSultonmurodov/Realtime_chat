import React, {useContext} from "react";
import {Link} from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import {updateDoc, doc} from "firebase/firestore";
import {AuthContext} from "../context/auth";
import {useHistory} from "react-router-dom";
const Navbar = ({isDark, setIsDark}) =>{
    const history = useHistory();
    const user= useContext(AuthContext);

    const handleSignOut = async ()=>{
        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            isOnline:false
        });
        await signOut(auth);
        history.replace("/login");
    }
    return (
        <nav>
            <h3>
                <Link to="/" >Messenger</Link>
            </h3>
            <div>
                {
                    
                    user ? (
                        <div>
                            <Link to="/profile">Profile</Link>
                            <button className="btn" onClick={handleSignOut}>Logout</button>
                        </div>
                    ): (
                        <div>
                            <Link to="/register">Register</Link>
                            <Link to="/login">Login</Link>
                        </div>
                    )
                }
            </div>
        </nav>
    )
}
export default Navbar;