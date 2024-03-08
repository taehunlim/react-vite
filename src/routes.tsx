import React, { Fragment } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

type ElementType = {
   [key: string]: () => JSX.Element;
};

const REQUIRED: Record<string, ElementType> = import.meta.glob(
   '/src/pages/404.tsx',
   { eager: true },
);
const ELEMENTS: Record<string, ElementType> = import.meta.glob(
   '/src/pages/**/[a-z[]*.tsx',
   { eager: true },
);

const requires: ElementType = Object.keys(REQUIRED).reduce((require, file) => {
   const key = file.replace(/\/src\/pages\/|\.tsx$/g, '');
   return { ...require, [key]: REQUIRED[file].default };
}, {});

const NotFound = requires?.['404'] || Fragment;

const elements: RouteObject[] = Object.entries(ELEMENTS).map(
   ([absolutePath, element]) => {
      const path = absolutePath
         .replace(/\/src\/pages|index|\.tsx$/g, '')
         .replace(/\[\.{3}.+\]/, '*')
         .replace(/\[(.+)\]/, ':$1');

      const Element = element.default;

      if (path === '/') {
         return { path, element: <Element />, errorElement: <NotFound /> };
      }

      return { path, element: <Element /> };
   },
);

export const routes = createBrowserRouter(elements);
