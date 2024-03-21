import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { generateRoutes } from './core';

type ElementType = {
   [key: string]: () => JSX.Element;
};

const ROUTES: Record<string, ElementType> = import.meta.glob(
   '/src/pages/**/[a-z[]*.tsx',
   { eager: true },
);

export const routes: RouteObject[] = generateRoutes(ROUTES);

console.log(routes);
export const router = createBrowserRouter(routes);
