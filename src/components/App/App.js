import React from "react";
import { Router, navigate } from "@reach/router";

import withFirebaseAuth from "react-with-firebase-auth";
import { firebaseAppAuth, providers } from "lib/firebase";

import { Dashboard, Editor, SignIn } from "components";
import "./App.css";

const createComponentWithAuth = withFirebaseAuth({
  providers,
  firebaseAppAuth,
});

const App = ({ signInWithGoogle, signInWithGithub, signOut, user }) => {
  console.log(user);
  return (
    <>
      <header className="header">
        <h2>TypeMD</h2>
        {user && (
          <div className="user-profile">
            <a
              className="log-out-link"
              href="#log-out"
              onClick={() => {
                signOut();
                navigate("/");
              }}
            >
              Log Out
            </a>
            <img alt="Profile" className="avatar" src={user.photoURL} />
          </div>
        )}
      </header>
      <Router>
        <SignIn
          path="/"
          user={user}
          signIns={{ signInWithGithub, signInWithGoogle }}
        />
        <Dashboard path="user/:userId" />
        <Editor path="user/:userId/editor/:fileId" />
      </Router>
    </>
  );
};

export default createComponentWithAuth(App);
