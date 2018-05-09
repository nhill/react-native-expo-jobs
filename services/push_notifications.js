import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';

export default async () => {
  let token = await AsyncStorage.getItem('push_token');
  if(token){
    return;
  }else{
    let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
    if(status !== 'granted'){
      return;
    }

    let newToken = await Notifications.getExponentPushTokenAsync();
  }
};
