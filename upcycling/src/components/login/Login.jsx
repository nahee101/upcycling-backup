import { auth } from '../../firebase';
import { GoogleAuthProvider, signInWithPopup,
            FacebookAuthProvider,signOut
} from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css'
import { useContext } from "react";
import DataContext from "../context/DataContext";

function Login() {
    const data1 = useContext(DataContext);

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    function handleGoogleLogin() {
        const gprovider = new GoogleAuthProvider(); // provider를 구글로 설정
        signInWithPopup(auth, gprovider) // popup을 이용한 signup
        .then((data) => {
            setUser(data.user); // user data 설정
            const Comment = {
                id: data.user.uid,
                displayName: data.user.displayName,
                email: data.user.email,
                photoURL: data.user.photoURL
            }
            navigate("/home");
            console.log(data.user.displayName);
            console.log(data.user.email);
            data1.action.setUser([...data1.state.user , Comment])
            console.log(data1.state.user)
        })
        .catch((err) => {
            console.log(err);
        });
    }
    function handleFacebookLogin(){
        const fprovider =new FacebookAuthProvider();
        signInWithPopup(auth, fprovider) // popup을 이용한 signup
        .then((data) => {
            setUser(data.user); // user data 설정
            navigate("/Home");
            console.log(data) // console로 들어온 데이터 표시
        })
        .catch((err) => {
            console.log(err);
        });
    }
    function Logout() {
        signOut(auth).then(() => {
            setUser(null);
            navigate("/");
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="App">
        <header className="Login_Container">
            
        <button className="googleLogin" onClick={handleGoogleLogin}>구글 Login</button>
        <p>
            {user ? user.displayName : null}
        </p>
        <p>
            {user ? user.email : null}
        </p>
        <p>
            {user ? <img src={user.photoURL} alt="userphoto"/>  : null}
        </p>

        
        <button className="FacebookLogin" onClick={handleFacebookLogin}>facebook Login</button>
        <button className="Logout" onClick={Logout}>Logout</button>
        </header>
        </div>
    );
}

export default Login;