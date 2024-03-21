import { createBrowserRouter } from 'react-router-dom';
import { generateRoutes } from './core';

const ROUTES = import.meta.glob('/src/pages/**/[a-z[]*.tsx', { eager: true });

export const routes = generateRoutes(ROUTES);

export const router = createBrowserRouter(routes);
