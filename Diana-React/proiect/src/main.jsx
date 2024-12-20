import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext.jsx';

import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import MyProfiles from './components/MyProfiles.jsx';
import AddProducts from './components/AddProducts.jsx';
import CerceiMici from './components/CerceiMici.jsx';
import Home from './components/Home.jsx';
import CerceiMari from './components/CerceiMari.jsx';
import Colier from './components/Colier.jsx';
import AllUsers from './components/AllUsers.jsx';
import Bratari from './components/Bratari.jsx';
import OrderDetails from './components/OrderDetalis.jsx';
import ModificareProdus from './components/ModificareProdus.jsx';

const router = createBrowserRouter([
    {
    path:'/',
    element:<Home/>,
},
{
    path:'/login',
    element:<Login/>,
},
{
    path:'/register',
    element:<Register/>,
},
{
    path:'/my-profiles',
    element:<MyProfiles/>,
},
{
    path:'/add-products',
    element:<AddProducts/>,
},
{
    path:'/cercei-mici',
    element:<CerceiMici/>,
},
{
    path:'/cercei-mari',
    element:<CerceiMari/>,
},
{
    path:'/colier',
    element:<Colier/>,
},
{
    path:'/all-users',
    element:<AllUsers/>,
},
{
    path:'/bratari',
    element:<Bratari/>,
},
{
    path:'/order-detalis',
    element:<OrderDetails/>,
},
{
    path:'/modificare-produs',
    element:<ModificareProdus/>,
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
    
          <RouterProvider router={router} />
    </AuthProvider>
  
  )