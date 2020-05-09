import React from "react";
import { navigate } from "@reach/router";

const SignIn = ({ user, signIns: { signInWithGoogle, signInWithGithub } }) => {
  if (user) {
    navigate(`/user/${user.uid}`);
    return null;
  } else {
    return (
      <div className="sign-in-page">
        <h3>
          Welcome to TypeMD a simple &amp; beautiful online markdown editor
        </h3>
        <p>
          Sign in with your social accounts to have files that are synced
          accross devices
        </p>
        <div className="sign-in-buttons">
          <button onClick={signInWithGoogle}>Sign in with Google</button>
          <button onClick={signInWithGithub}>Sign in with GitHub</button>
        </div>
      </div>
    );
  }
};

export default SignIn;
