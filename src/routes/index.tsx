import { Fragment } from 'react';
import { Outlet, createBrowserRouter } from 'react-router-dom';

import { Module, generatePreservedRoutes } from './core';
import { generateLazyRoutes } from './lazy';

// react-router-dom lazy
// 기존 createBrowserRouter만을 이용해서 라우터 구성시 Component는 무조건 export default function가 아닌 export function 으로 작성해야함
// lazy 에 import된 Component를 Component key에 넣으면 이미 import된 상태이기 때문에 의미 없음
const PRESERVED = import.meta.glob<Module>('/src/pages/(_app|404).tsx', {
   eager: true,
});
// const ROUTES = import.meta.glob<Module>('/src/pages/**/[a-z[]*.tsx', {
//    eager: true,
// });
const LAZY_ROUTES = import.meta.glob<Module>('/src/pages/**/[a-z[]*.tsx');

export const preservedRoutes = generatePreservedRoutes(PRESERVED);
// export const routes = generateRoutes(ROUTES);
export const lazyRoutes = generateLazyRoutes(LAZY_ROUTES);

const _app = preservedRoutes?.['_app'];
const App = _app?.default || Outlet;
const NotFound = preservedRoutes?.['404']?.default || Fragment;
const ErrorBoundary = _app?.Catch || NotFound;

const app = {
   element: <App />,
   errorElement: <ErrorBoundary />,
   loader: _app?.Loader,
};
const fallback = { path: '*', element: <NotFound /> };

export const router = createBrowserRouter([
   {
      ...app,
      children: [...lazyRoutes, fallback],
   },
]);
