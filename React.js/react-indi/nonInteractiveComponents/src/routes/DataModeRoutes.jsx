import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Dashboard from "../pages/Dashboard";
import AuthLayout from "../layouts/AuthLayout";
import SignIn from '../pages/auth/SignIn'
import SignUp from '../pages/auth/SignUp'
import ForgotPassword from "../pages/auth/ForgotPassword";
import Exercies from "../pages/Exercies";
import ClassWork from "../pages/ClassWork";
import EcomApp from "../pages/EcomApp";

export const routes = createBrowserRouter(
    [
        {
            element:<RootLayout/>,
            children:[
                {path:"/", element:<Dashboard/>},
                {path:"/exercies", element:<Exercies/>},
                {path:"/classWork", element:<ClassWork/>},
                {path:"/ecomApp", element:<EcomApp/>},
            ]
        },
        {
            element:<AuthLayout/>,
            children:[
                {path:"/signin", element:<SignIn/>},
                {path:"/signUp", element:<SignUp/>},
                {path:"/forgotPassword", element:<ForgotPassword/>},
            ]
        }
    ]
)