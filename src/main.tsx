import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import { RouterProvider } from 'react-router-dom';

import { routes, r } from './routes';
import EmotionProvider from './assets/EmotionProvider';
import ErrorBoundary from 'components/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <EmotionProvider>
      <Suspense fallback={<Loading />}>
         <ErrorBoundary FallbackComponent={<Error />}>
            <RouterProvider
               router={r}
               fallbackElement={<div>Loading...</div>} //
            />
         </ErrorBoundary>
      </Suspense>
   </EmotionProvider>,
);

function Error() {
   return <h1 style={{ color: 'black' }}>Application Error</h1>;
}

function Loading() {
   return <h1 style={{ color: 'black' }}>Loading...</h1>;
}
