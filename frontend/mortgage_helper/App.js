import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './screens/RootStack';
import {QueryClient, QueryClientProvider} from 'react-query';
import {UserContextProvider} from './contexts/UserContext';
import {createStore} from 'redux';
import rootReducer from './modules';
import {Provider} from 'react-redux';

const queryClient = new QueryClient();
const store = createStore(rootReducer);

function App() {
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
