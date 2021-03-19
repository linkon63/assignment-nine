import React from 'react';
import { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import Img from '../../images/Urban Riders.png';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const signOut = () => {
        setLoggedInUser({});
    }
    return (
        <div>
                
                <div className="header-navbar">
                    <img src={Img} alt="" width="300px" height="30px" className="d-inline-block align-top"/>
                    <Link to="/home"> Home </Link>
                    <Link to="/destination/"> Destination </Link>
                    <Link to="/blog"> Blog </Link>
                    <Link to="/contact"> Contact </Link>
                        <span className="user-name">
                        {
                        loggedInUser.email && (`${loggedInUser.name || 'Unknown User'}`)
                        }
                        </span>
                    {loggedInUser.email ? <button className="login-btn" onClick={signOut}>Sign Out</button> :
                        <Link to="/login"><button className="login-btn">Login</button></Link>
                    }

                </div>

        </div>
    );
};

export default Header;