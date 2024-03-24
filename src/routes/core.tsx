import { Fragment, Suspense } from 'react';
import { ActionFunction, LoaderFunction, RouteObject } from 'react-router-dom';

const patterns = {
   route: [/\/src\/pages\/|\.tsx$/g, ''],
   splat: [/\[\.{3}\w+\]/g, '*'],
   param: [/\[([^\]]+)\]/g, ':$1'],
   slash: [/^index$|\./g, '/'],
} as const;

type Element = () => JSX.Element;
export type Module = {
   default: Element;
   Loader?: LoaderFunction;
   Action?: ActionFunction;
   Catch?: Element;
   Pending?: Element;
};

type PreservedKey = '_app' | '404';

const generateRouteObject = (
   files: Record<string, Partial<Element>>,
   key: string,
): RouteObject => {
   const module: Partial<Module> = files[key];
   const index =
      /index\.tsx$/.test(key) && !key.includes('pages/index')
         ? { index: true }
         : {};

   const Element = module?.default || Fragment;
   const Page = () =>
      module?.Pending ? (
         <Suspense fallback={<module.Pending />} children={<Element />} />
      ) : (
         <Element />
      );

   return {
      ...index,
      id: key.replace(...patterns.route),
      element: <Page />,
      errorElement: module?.Catch ? <module.Catch /> : undefined,
      loader: module?.Loader,
      action: module?.Action,
   };
};

export const generatePreservedRoutes = (
   files: Record<string, Partial<Element>>,
): Partial<Record<PreservedKey, Omit<Module, 'Action'>>> => {
   return Object.keys(files).reduce((routes, key) => {
      const path = key.replace(...patterns.route);

      return { ...routes, [path]: files[key] };
   }, {});
};

export const generateRoutes = (
   files: Record<string, Partial<Module>>,
): RouteObject[] => {
   return Object.keys(files).reduce((routes, key) => {
      const route = generateRouteObject(files, key);

      const segments = key
         .replace(...patterns.route)
         .replace(...patterns.splat)
         .replace(...patterns.param)
         .split('/');

      segments.reduce((parent, segment, index) => {
         const path = segment.replace(...patterns.slash);

         const isRoot = index === 0;
         const isFile = index === segments.length - 1 && segments.length > 1;
         const isFolder = !isRoot && !isFile;
         const insert = /^\w|\//.test(path) ? 'unshift' : 'push';
         const layout = segment === 'layout';

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

         if (layout) {
            return Object.assign(parent, route);
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
