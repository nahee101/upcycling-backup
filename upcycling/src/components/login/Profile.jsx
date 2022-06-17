import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { SignOut } from "../../firebase";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = async () => {
        await SignOut();
    };
    if (!user) {
        return <Navigate replace to="/login" />;
    }
    return (
        <div>
            <h1>Profile</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};
export default Profile;