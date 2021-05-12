import React, { Suspense } from 'react';
import { store, persistor } from './Store';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SocketContext, socket } from './context/Socket';
import Layout from './layouts/Layout';
import SplashScreen from './components/component/SplashScreen';
import './App.less';
import './i18n';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={(<SplashScreen />)}>
          <SocketContext.Provider value={socket}>
            <Router>
              <Layout />
            </Router>
          </SocketContext.Provider>
        </Suspense>
      </PersistGate>
    </Provider>
  );
}

export default App;