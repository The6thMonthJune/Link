import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SplashPage from "../pages/SplashPage";
import LogInPage from "../pages/LogInPage";
import TripItemPage from "../pages/trip/TripItemPage";

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
    }
]);

export default router;