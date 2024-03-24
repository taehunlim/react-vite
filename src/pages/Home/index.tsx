import React, { useState } from 'react';
// import { useRouteError, isRouteErrorResponse, json } from 'react-router-dom';
const SlowTab = React.lazy(() => import('components/SlowTab'));

// export const Loader = async () => {
//    // return true;
//    const response = await fetch('/home');

//    if (!response.ok) {
//       // throw new Response(JSON.stringify({ message: 'could not fetch' }), {
//       //    status: 500,
//       // });

//       throw json({ message: 'could not fetch' }, { status: 500 });
//    } else {
//       const resData = await response.json();
//       return resData;
//    }
// };

// export const Catch = () => {
//    const error = useRouteError();

//    let title = 'An error occurred!';
//    let message = 'Something went wrong';

//    if (isRouteErrorResponse(error)) {
//       if (error.status === 500) {
//          message = error.data.message;
//       }
//       if (error.status === 404) {
//          (title = '404 Not found!'),
//             (message = 'Could not find resource or page');
//       }
//    }

//    return (
//       <div>
//          {title}
//          <div>{message}</div>
//       </div>
//    );
// };

export const Pending = () => {
   return <h1>...pending</h1>;
};

function Home() {
   const [isShow, setIsShow] = useState(false);
   return (
      <div>
         <button onClick={() => setIsShow(true)}>버튼</button>

         {isShow && <SlowTab />}
      </div>
   );
}

export default Home;
