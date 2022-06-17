import { signOut } from "../../firebase";
const Profile = () => {
    const handleLogout = async () => {
        await signOut();
    };
    return (
        <div>
            <h1>Profile</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};
export default Profile;