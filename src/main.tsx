import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import { App } from './routes';
import EmotionProvider from './assets/EmotionProvider';
import ErrorBoundary from 'components/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <EmotionProvider>
      <BrowserRouter>
         <ErrorBoundary FallbackComponent={<Error />}>
            <App />
         </ErrorBoundary>
      </BrowserRouter>
   </EmotionProvider>,
);

function Error() {
   return <h1 style={{ color: 'black' }}>Application Error</h1>;
}
