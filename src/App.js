import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import "./App.css";
import firebaseInitialize from "./Firebase/firbase.initialize";

firebaseInitialize();
const auth = getAuth();

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

function App() {
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState(false);
  // ===============================================================================
  //                            Googe Login
  // ===============================================================================
  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider).then((result) => {
      const user = result.user;
      const loggedUser = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      };
      setUser(loggedUser);
    });
  };
  // ===============================================================================
  //                            GitHub Login
  // ===============================================================================

  const handleGitHubLogin = () => {
    signInWithPopup(auth, githubProvider).then((result) => {
      const user = result.user;
      const loggedUser = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      };
      setUser(loggedUser);
    });
  };
  // ===============================================================================
  //                            Facebook Login
  // ===============================================================================

  const handleFacebookLogin = () => {
    signInWithPopup(auth, facebookProvider).then((result) => {
      const user = result.user;
      const loggedUser = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      };
      setUser(loggedUser);
    });
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const isRegister=e=>{
    setRegistered(e.target.checked);
  }
  // ===============================================================================
  //                            Registration
  // ===============================================================================
 
  const handleRegistration = (email,password) => {

    createUserWithEmailAndPassword(auth, email, password).then((result) => {
      const user = result.user;
      setUser(user);
      emailVerification();
      console.log(user);
    });
  };
  // ===============================================================================
  //                            Log In
  // ===============================================================================
  const handleLogIn = (email, password)=>{
    
    signInWithEmailAndPassword(auth,email,password)
    .then((result)=>{
      const user = result.user;
      setUser(user);
      console.log(user);

    })
  }

  const handleAuthentication = e=>{
    e.preventDefault();
    registered ? handleLogIn(email, password) : handleRegistration(email, password);
  }
  // ===============================================================================
  //                            Email Verify
  // ===============================================================================

const emailVerification = ()=>{
  sendEmailVerification(auth.currentUser)
  .then(result=>{
    console.log(result);
  })
}
const handlepPasswordReset= ()=>{
  console.log('ok');
  sendPasswordResetEmail(auth,email)
  .then(result=>{
    console.log(result);
  })
}

  return (
    <div className="App">
      <div className="social-login">
        <button onClick={handleGoogleLogin}>Google LogIN</button>
        <button onClick={handleGitHubLogin}>GitHub LogIn </button>
        <button onClick={handleFacebookLogin}>Facebook LogIn </button>
      </div>
      <div className="registration-form">
        <form onSubmit={handleAuthentication}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onBlur={handleEmail}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onBlur={handlePassword}
            />
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              onChange={isRegister}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Registered
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            {!registered ? 'Register' : 'Log In'}
          </button>
          <button type="submit" className="btn btn-primary ml-4" onClick={handlepPasswordReset}>
            Password Reset
          </button>
        </form>
      </div>
      <div className="user-data">
        <h1>{user.name}</h1>
        <p>{user.email}</p>
        <img src={user.image} alt="" />
      </div>
    </div>
  );
}

export default App;
