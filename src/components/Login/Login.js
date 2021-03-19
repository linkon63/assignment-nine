import React from 'react';
import { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useHistory, useLocation } from 'react-router';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useForm } from 'react-hook-form';
import './Login.css';
import FacebookIcon from '@material-ui/icons/Facebook';
import GTranslateIcon from '@material-ui/icons/GTranslate';
if(firebase.apps.length === 0 ){
    firebase.initializeApp(firebaseConfig);
}
const Login = () => {
    const [newUser, setNewUser] = useState({createAccount : true});
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [error, setError] = useState({});

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    //Handle Google SIGN IN
    const handleGoogleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(googleProvider)
        .then((result) => {
            const user = result.user;
            const {displayName, email} = user;
            const signnedInUser = {name: displayName, email: email, signnedIn: true};
            setLoggedInUser(signnedInUser);
            history.replace(from);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;    
            console.log(errorCode,errorMessage,email);
            setError(error);
        });
    }
    //Handle Facebook Sign in
    const handleFacebookSignIn = () => {
        const facebookProvider = new firebase.auth.FacebookAuthProvider();
        firebase
        .auth()
        .signInWithPopup(facebookProvider)
        .then((result) => {
            const user = result.user;
            const {displayName, email} = user;
            const signnedInUser = {name: displayName, email: email, signnedIn: true};
            setLoggedInUser(signnedInUser);
            history.replace(from);
            // console.log(displayName,email);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            console.log(errorCode,errorMessage,email)
            setError(error);
        });
    }
    //React form 
    const { register, handleSubmit, maxLength, errors } = useForm();
    // Create new User from Email 
    const createUserEmailandPassword = data =>{
        console.log(data);
        if(data.password !== data.confirmPassword){
            console.log('password does not match');
            setError({message: 'Password Does not match'});
        }else{
            firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                const {displayName, email} = user;
                const signnedInUser = {name: displayName, email: email, signnedIn: true};
                setLoggedInUser(signnedInUser);
                history.replace(from);
                console.log(displayName,email);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage,errorCode)
                setError(error);

            });
        }
        };
    //Sign in with existing Account or User account    
    const signInWithEmailAndPassword = data => {
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then((userCredential) => {
            const user = userCredential.user;
            const {displayName, email} = user;
            const signnedInUser = {name: displayName, email: email, signnedIn: true};
            setLoggedInUser(signnedInUser);
            history.replace(from);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage);
            setError(error);
        });
    }
    // Handling Create account or Log in by this functions
    const handleUser = () => {
        const userState = {...newUser};
        userState.createAccount = false;
        setNewUser(userState);
    }
    console.log('error', error);
    return (
        <div>
            {
                newUser.createAccount && 
                <div className="create-account-form">
                    <h3>Create New Account</h3>
                    <div>
                    <form onSubmit={handleSubmit(createUserEmailandPassword)}>
                    <input type="text" name="name" ref={register({ required: true, maxLength: 20 })} placeholder="Your Name" /> <br/>
                    <input type="email" name="email" ref={register({ required: true })} placeholder="Your Email" /> <br/>
                    <input type="password" name="password" ref={register({ required: true })} placeholder="Your Password" /> <br/>  
                    <input type="password" name="confirmPassword" ref={register({ required: true })} placeholder="Conform Password" /> <br/>  
                    {errors.exampleRequired && <span>This field is required</span>}
                    <input className="submit-btn" type="submit" />
                    </form>
                    </div>
                </div>    
            }
            {
                !newUser.createAccount && 
                <div className="create-account-form">
                    <h3>Login</h3>
                    <form onSubmit={handleSubmit(signInWithEmailAndPassword)}>
                    <input type="email" name="email" ref={register({ required: true })} placeholder="Your Email" /> <br/>
                    <input type="password" name="password" ref={register({ required: true })} placeholder="Your Password" /> <br/>  
                    {errors.exampleRequired && <span>This field is required</span>}
                    <input className="submit-btn" type="submit" />
                    </form>
                </div>    
            }
            <div className="signin-form">   
                <p style={{color : 'red'}}>{error.message}</p>
                <p>Already have a account <button className="account-login" onClick={handleUser}>Login</button></p>
                <button className="account-login-btn" onClick={handleGoogleSignIn}><GTranslateIcon></GTranslateIcon> Google</button> <br/>
                <button className="account-login-btn" onClick={handleFacebookSignIn}><FacebookIcon></FacebookIcon> Facebook </button>
            </div>
        </div>
    );
};

export default Login;