import 'simplebar/src/simplebar.css';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import {Provider} from "react-redux";
import { WalletKitProvider } from '@gokiprotocol/walletkit';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import {store} from "./store";
import ScrollToTop from "./components/ScrollToTop";
import {BaseOptionChartStyle} from "./components/chart/BaseOptionChart";
import ThemeProvider from "./theme";
import App from "./App";

ReactDOM.render(
  <HelmetProvider>
    <BrowserRouter>
        <WalletKitProvider
          defaultNetwork="devnet"
          app={{
              name: 'My app'
          }}
        >
        <Provider store={store}>
            <ThemeProvider>
                <ScrollToTop/>
                <BaseOptionChartStyle/>
                <App />
            </ThemeProvider>
        </Provider>
      </WalletKitProvider>
    </BrowserRouter>
  </HelmetProvider>,
  document.getElementById('root')
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
