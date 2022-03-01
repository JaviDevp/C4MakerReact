import { firebase, googleAuthProvider, db } from '../firebase/firebase-config';
import { types } from '../types/types';
import { FinishLoading, startLoading } from './ui';

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then(({user}) => {
                console.log(user)
                dispatch(login(user.uid, user.displayName))
            });
    }
}

export const startLoginEmailPassword = (email, password) => {
    
    return (dispatch) => {
        dispatch(startLoading())
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(({user}) => {
            dispatch(login(user.uid, user.displayName))
            dispatch(FinishLoading())

        })
        .catch((error) => {
          console.log(error)
          dispatch(FinishLoading())
        });

    }
}

export const login = (uid, displayName) => {
    
    console.log('login return')
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( async ({user}) => {
            await user.updateProfile({displayName: name})
            console.log(user)
            dispatch(
                login(user.uid, user.displayName)
            );
        })
        .catch(e => {
            console.log(e);
        })
    }
}

export const startLogout = () => {
    return async(dispatch) => {
        await firebase.auth().signOut();
        dispatch(logout())
    }
}

export const logout = () => ({
    type: types.logout
})

