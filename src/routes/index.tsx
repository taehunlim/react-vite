import { createBrowserRouter } from 'react-router-dom';

import { Module, generateRoutes } from './core';

const ROUTES: Record<string, Partial<Module>> = import.meta.glob(
   '/src/pages/**/[a-z[]*.tsx',
   { eager: true },
);

export const routes = generateRoutes(ROUTES);

export const router = createBrowserRouter(routes);

console.log(routes);
