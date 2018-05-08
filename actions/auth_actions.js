import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import {
  FB_LOGIN_SUCCESS,
  FB_LOGIN_FAIL
} from './types';

export const facebookLogin = () => {
  return async (dispatch) => {
    let token = await AsyncStorage.getItem('fb_token');
    if(token){
      // user is logged in
      dispatch({ type: FB_LOGIN_SUCCESS, payload: token });
    }else{
      // user isn't logged in
      doFBLogin(dispatch);
    }
  }
};

/* HELPERS */
const doFBLogin = async (dispatch) => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync('245468486027581', {
    permissions: ['public_profile']
  });

  switch(type){
    case 'cancel':
      return dispatch({ type: FB_LOGIN_FAIL });
    default :
      await AsyncStorage.setItem('fb_token', token);
      dispatch({ type: FB_LOGIN_SUCCESS, payload: token });
  }
};
