import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider as StyletronProvider } from 'styletron-react';
import { styletron } from './lib/style/styletron';
import { WithThemeProvider } from './lib/HOC/withThemeProvider';
import { GlobalResetStyle } from './lib/style/globalReset';
import { Helmet } from 'react-helmet';
import { Provider as ReduxProvider } from 'react-redux';
// import { PersistGate } from 'redux-persist/es/integration/react';
// import { store, persistor } from './lib/store/store';
import { store } from './lib/store/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <>
    <Helmet>
      <style>{GlobalResetStyle}</style>
    </Helmet>
    <ReduxProvider store={store}>
      {/*<PersistGate persistor={persistor}>*/}
      <StyletronProvider value={styletron}>
        <WithThemeProvider>
          <App />
        </WithThemeProvider>
      </StyletronProvider>
      {/*</PersistGate>*/}
    </ReduxProvider>
  </>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
