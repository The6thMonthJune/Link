import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SplashPage from "../pages/SplashPage";
import LogInPage from "../pages/LogInPage";
import TripItemPage from "../pages/trip/TripItemPage";
import EnterFriendsSpacePage from "../pages/EnterFriendsSpacePage";
import Layout from "../components/common/Layout";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/home",
                element: <HomePage />
            },
            {
                path: "/trips/:tripId/items/:category",
                element: <TripItemPage />
            },
            {
                path: "/enterspace",
                element: <EnterFriendsSpacePage />
            }
        ]
    },
    {
        path: "/login",
        element: <LogInPage />
    },
    {
        path: "/",
        element: <SplashPage />
    },

]);

export default router;