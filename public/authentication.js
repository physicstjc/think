const authUi = new firebaseui.auth.AuthUI(firebase.auth());
authUi.uiConfig = {
    signInOptions: [
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
        },
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            authUi.onSignInSuccess();
            return false;
        },
    },
    // Other config options...
};
authUi.show = (onSignInSuccess) => {
    authUi.onSignInSuccess = onSignInSuccess;
    authUi.start('#firebaseui-auth-container', authUi.uiConfig);
};