import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import { App } from './routes';
import EmotionProvider from './assets/EmotionProvider';
import ErrorBoundary from 'components/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <EmotionProvider>
      <BrowserRouter>
         <Suspense fallback={<Loading />}>
            <ErrorBoundary FallbackComponent={<Error />}>
               <App />
            </ErrorBoundary>
         </Suspense>
      </BrowserRouter>
   </EmotionProvider>,
);

function Error() {
   return <h1 style={{ color: 'black' }}>Application Error</h1>;
}

function Loading() {
   return <h1 style={{ color: 'black' }}>Loading...</h1>;
}
