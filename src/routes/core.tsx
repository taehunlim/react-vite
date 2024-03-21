import React, { Fragment } from 'react';
import { RouteObject } from 'react-router-dom';

const patterns = {
   route: [/\/src\/pages|\.tsx$/g, ''],
   splat: [/\[\.{3}\w+\]/g, '*'],
   param: [/\[([^\]]+)\]/g, ':$1'],
   slash: [/^index$|\./g, '/'],
} as const;

type ElementType = {
   [key: string]: () => JSX.Element;
};

const REQUIRED: Record<string, ElementType> = import.meta.glob(
   '/src/pages/404.tsx',
   { eager: true },
);

const requires: ElementType = Object.keys(REQUIRED).reduce((require, file) => {
   const key = file.replace(/\/src\/pages\/|\.tsx$/g, '');
   return { ...require, [key]: REQUIRED[file].default };
}, {});

const NotFound = requires?.['404'] || Fragment;

export const generateRoutes = (files: Record<string, any>): RouteObject[] => {
   return Object.keys(files).reduce((routes, key) => {
      const Element = files[key].default;

      const originSegments = key.split('/');
      const folderSegments = originSegments.slice(0, originSegments.length - 1);
      const folder = folderSegments.join('/');
      const layout = folder ? `${folder}/layout.tsx` : `/layout.tsx`;

      const route: RouteObject = {
         id: key.replace(...patterns.route),
         element: <Element />,
         errorElement:
            key === '/src/pages/index.tsx' ? <NotFound /> : undefined,
      };

      const segments = key
         .replace(...patterns.route)
         .replace(...patterns.splat)
         .replace(...patterns.param)
         .split('/')
         .filter(Boolean);

      segments.reduce((parent, segment, index) => {
         const path = segment.replace(...patterns.slash);

         const isRoot = index === 0;
         const isFile = index === segments.length - 1 && segments.length > 1;
         const isFolder = !isRoot && !isFile;
         const insert = /^\w|\//.test(path) ? 'unshift' : 'push';

         if (isRoot) {
            const dynamic = path.startsWith(':') || path === '*';
            if (dynamic) return parent;

            const file = segments.length === 1;

            if (file) {
               routes.push({ path, ...route });
               return parent;
            }
         }

         if (isRoot || isFolder) {
            const routeObjects = isRoot ? routes : parent.children;
            const routeObject = routeObjects?.find(
               (route) => route.path === path,
            );

            if (routeObject) routeObject.children ??= [];
            else routeObjects?.[insert]({ path, children: [] });
            return (
               routeObject ||
               routeObjects?.[
                  insert === 'unshift' ? 0 : routeObjects.length - 1
               ]
            );
         }

         const hasLayout = !!files[layout];
         const isLayout = isFile && hasLayout && path === 'layout';

         if (isLayout) {
            parent['element'] = <Element />;
            parent['id'] = key.replace(...patterns.route);
         } else {
            parent?.children?.[insert]({
               path: path === '/' ? '' : path,
               ...route,
            });
         }

         return parent;
      }, {} as RouteObject);

      return routes;
   }, [] as RouteObject[]);
};
