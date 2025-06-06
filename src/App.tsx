import { createBrowserRouter } from 'react-router';

import { Layout } from './components/layout';
import { Home } from './pages/home';
import { Detail } from './pages/detail';
import { Cart } from './pages/cart';
import { NotFound } from './pages/error';

const router = createBrowserRouter([
    {   
        element: <Layout/>,
        children:[
            {
                path: '/',
                element: <Home />,  
            },
            {
                path: '/detail/:id',
                element: <Detail />,  
            },
            {
                path: '/cart',
                element: <Cart />,  
            },
        ],        
    },
    {
        path: "*",
        element: <NotFound/>,
    }
]);

export { router };