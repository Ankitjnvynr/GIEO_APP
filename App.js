import { createNavigationContainerRef } from '@react-navigation/native';
import { LogBox, PermissionsAndroid, Text } from 'react-native';
import codePush from 'react-native-code-push';
import { Provider } from 'react-redux';
import InitialNavigation from './src/navigaiton';
import configureStore, { persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
LogBox.ignoreLogs(['Warning: ...']);
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
export const navigationRef = createNavigationContainerRef();
function App() {
  const store = configureStore();
  
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor} >
        <InitialNavigation />

      </PersistGate>
    </Provider>
  );
}
export default codePush(App);
