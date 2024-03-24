import { Outlet, createBrowserRouter } from 'react-router-dom';

import { Module, generatePreservedRoutes, generateRoutes } from './core';
import { Fragment } from 'react';
import React from 'react';

const PRESERVED = import.meta.glob<Module>('/src/pages/(_app|404).tsx', {
   eager: true,
});
const ROUTES = import.meta.glob<Module>('/src/pages/**/[a-z[]*.tsx', {
   eager: true,
});

export const preservedRoutes = generatePreservedRoutes(PRESERVED);
export const routes = generateRoutes(ROUTES);

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
   { ...app, children: [...routes, fallback] },
]);
