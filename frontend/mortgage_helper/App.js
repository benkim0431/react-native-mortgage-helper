import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './screens/RootStack';
import {QueryClient, QueryClientProvider} from 'react-query';
import {UserContextProvider} from './contexts/UserContext';
import {createStore} from 'redux';
import rootReducer from './modules';
import {Provider} from 'react-redux';
import {fcmService} from './src/FCMService';
import {localNotificationService} from './src/LocalNotificationService';

const queryClient = new QueryClient();
const store = createStore(rootReducer);

function App() {
  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister(token) {
      console.log('[App] onRegister : token :', token);
    }

    function onNotification(notify) {
      console.log('[App] onNotification : notify :', notify);
      const options = {
        soundName: 'default',
        playSound: true,
      };
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options,
      );
    }

    function onOpenNotification(notify) {
      console.log('[App] onOpenNotification : notify :', notify);
      alert('Open Notification : notify.body :' + notify.body);
    }
    return () => {
      console.log('[App] unRegister');
      fcmService.unRegister();
      localNotificationService.unregister();
    };
  }, []);

  return (
    <Provider store={store}>
      <UserContextProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </QueryClientProvider>
      </UserContextProvider>
    </Provider>
  );
}

export default App;
