import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { WalletKitProvider } from '@gokiprotocol/walletkit';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <WalletKitProvider
                defaultNetwork="devnet"
                app={{
                    name: 'My app'
                }}
            >
                <App />
            </WalletKitProvider>
        </BrowserRouter>
    </React.StrictMode>
);
