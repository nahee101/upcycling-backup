import Nav from '../components/Nav/Nav';
import Carousel from '../components/banner/Carousel';
//datacontext test
import DataContext from "../components/context/DataContext";
import { useContext } from "react";
import './test.css';
/*
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
*/
const HomePage = ({/*getUserId*/}) => {
    const data = useContext(DataContext);
/*
    //🍎home으로 navigate통해서 이동 할 때 useData같이 가져옴
    const location = useLocation();
    const locationData = location?.state;
    const [userId, setUserId] = useState(locationData.id)
    console.log(locationData.id)
    useEffect(()=>{
        setUserId(locationData.uid)
        getUserId(locationData.uid)
    },[userId])
    
    console.log(userId)
    */
    return (
        <div>
            <Nav/>
            <div className='test'>
                {data.state.user.map((user)=>(
                    <li key={user.id}>
                        {user.displayName}
                        {user.email}
                    </li>
                    )
                )}
                ddd
            </div>
            <Carousel/>
        </div>
    )
};

export default HomePage;