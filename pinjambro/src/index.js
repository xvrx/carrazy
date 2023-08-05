import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Pages from './Pages';
import reportWebVitals from './reportWebVitals';
import { PreloadProvider } from './context/Preload'
import { ModalProvider } from './context/Modal'
import { UtilsProvider } from './context/Utils'
import { APIProvider } from './context/API'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UtilsProvider>
      <PreloadProvider>
        <ModalProvider>
          <APIProvider>
           <Pages />
          </APIProvider>
        </ModalProvider>
      </PreloadProvider>
    </UtilsProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
