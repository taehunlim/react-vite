import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

interface LayoutProps {
   children: ReactNode;
}

function Layout({ children }: LayoutProps) {
   return (
      <div>
         Layout
         {children}
         <Outlet />
      </div>
   );
}

export default Layout;
