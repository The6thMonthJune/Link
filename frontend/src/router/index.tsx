import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SplashPage from "../pages/SplashPage";
import LogInPage from "../pages/LogInPage";
import TripItemPage from "../pages/trip/TripItemPage";
import EnterFriendsSpacePage from "../pages/EnterFriendsSpacePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <SplashPage />
    },
    {
        path: "/home",
        element: <HomePage />
    },
    {
        path: "/login",
        element: <LogInPage />
    },
    {
        path: "/trips/:tripId/items/:category",
        element: <TripItemPage />
    },
    {
        path: "/enterspace",
        element: <EnterFriendsSpacePage/>
    }
]);

export default router;