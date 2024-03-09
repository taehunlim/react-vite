import React from 'react';
import { Outlet } from 'react-router-dom';

function Sub(props) {
   return (
      <div>
         sub <Outlet />
      </div>
   );
}

export default Sub;
