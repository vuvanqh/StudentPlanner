import { createBrowserRouter } from "react-router-dom";
import IntroPage from "./pages/public/IntroPage";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import MainPage from "./pages/protected/MainPage";
import LoginPage from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";
import ApplicationLayout from "./pages/ApplicationLayout";

export const router = createBrowserRouter([{
    path: "/",
    element: <ApplicationLayout/>,
    children:[
        {
            path:"",
            element: <IntroPage/>,
            children: [
            {
                path: "login",
                element: <LoginPage/>
            },
            {
                path: "register",
                element: <RegisterPage/>
            }
        ]},
        {
            path: "main",
            element: <ProtectedRoute>
                <MainPage/>
            </ProtectedRoute>
        }
    ]
}])