import { Fragment, Suspense } from 'react';
import { ActionFunction, LoaderFunction, RouteObject } from 'react-router-dom';

const patterns = {
   route: [/\/src\/pages\/|\.tsx$/g, ''],
   splat: [/\[\.{3}\w+\]/g, '*'],
   param: [/\[([^\]]+)\]/g, ':$1'],
   slash: [/^index$|\./g, '/'],
   lazy: [/lazy(\w+)/g, '$1'],
} as const;

type Element = () => JSX.Element;
export type Module = {
   default: Element;
   Loader?: LoaderFunction;
   Action?: ActionFunction;
   Catch?: Element;
   Pending?: Element;
};

type LazyFiles = Record<string, () => Promise<Partial<Module>>>;

const generateLazyRouteObject = (
   files: Record<string, () => Promise<Partial<Module>>>,
   key: string,
): RouteObject => {
   const module = files[key];
   const index =
      /index\.tsx$/.test(key) && !key.includes('pages/index')
         ? { index: true }
         : {};

   const path = key.replace(...patterns.route);
   const isLazy = path.split('/').some((p) => p.indexOf('lazy') === 0);

   console.log(path, isLazy);

   return {
      ...index,
      id: key.replace(...patterns.route),
      lazy: async () => {
         const Element = (await module())?.default || Fragment;

         const Pending = (await module())?.Pending;
         const ErrorElement = (await module())?.Catch;
         const Page = () =>
            Pending ? (
               <Suspense fallback={<Pending />} children={<Element />} />
            ) : (
               <Element />
            );

         return {
            Component: Page,
            errorElement: ErrorElement ? <ErrorElement /> : undefined,
            loader: (await module())?.Loader,
            action: (await module())?.Action,
         };
      },
   };
};

export const generateLazyRoutes = (files: LazyFiles): RouteObject[] => {
   return Object.keys(files).reduce((routes, key) => {
      const route = generateLazyRouteObject(files, key);

      const segments = key
         .replace(...patterns.route)
         .replace(...patterns.splat)
         .replace(...patterns.param)
         .split('/');

      segments.reduce((parent, segment, index) => {
         const path = segment.replace(...patterns.slash);
         const removedLazyPath = path
            .replace(...patterns.lazy)
            .toLocaleLowerCase();

         const isRoot = index === 0;
         const isFile = index === segments.length - 1 && segments.length > 1;
         const isFolder = !isRoot && !isFile;
         const insert = /^\w|\//.test(removedLazyPath) ? 'unshift' : 'push';
         const layout = segment === 'layout';

         if (isRoot) {
            const dynamic =
               removedLazyPath.startsWith(':') || removedLazyPath === '*';
            if (dynamic) return parent;

            const file = segments.length === 1;

            if (file) {
               routes.push({ path: removedLazyPath, ...route });
               return parent;
            }
         }

         if (isRoot || isFolder) {
            const routeObjects = isRoot ? routes : parent.children;
            const routeObject = routeObjects?.find(
               (route) => route.path === removedLazyPath,
            );

            if (routeObject) routeObject.children ??= [];
            else
               routeObjects?.[insert]({ path: removedLazyPath, children: [] });
            return (
               routeObject ||
               routeObjects?.[
                  insert === 'unshift' ? 0 : routeObjects.length - 1
               ]
            );
         }

         if (layout) {
            return Object.assign(parent, route);
         } else {
            parent?.children?.[insert]({
               path: removedLazyPath === '/' ? '' : removedLazyPath,
               ...route,
            });
         }

         return parent;
      }, {} as RouteObject);

      return routes;
   }, [] as RouteObject[]);
};
