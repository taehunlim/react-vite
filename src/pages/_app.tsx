import { Outlet } from 'react-router-dom';

export default function App() {
   return (
      <section style={{ margin: 24 }}>
         <header style={{ display: 'flex', gap: 24 }}></header>

         <main>
            <Outlet />
         </main>
      </section>
   );
}
