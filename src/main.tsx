import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import { App } from './routes';
import EmotionProvider from './assets/EmotionProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <EmotionProvider>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </EmotionProvider>,
);
