import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import { RouterProvider } from 'react-router-dom';

import { router } from './routes';
import EmotionProvider from './assets/EmotionProvider';
import ErrorBoundary from 'components/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <EmotionProvider>
      <Suspense fallback={<Loading />}>
         <ErrorBoundary FallbackComponent={<Error />}>
            <RouterProvider
               router={router}
               fallbackElement={<div>loader Loading...</div>} //
            />
         </ErrorBoundary>
      </Suspense>
   </EmotionProvider>,
);

function Error() {
   return <h1 style={{ color: 'black' }}>Application Error</h1>;
}

function Loading() {
   return <h1 style={{ color: 'black' }}>App Loading...</h1>;
}
