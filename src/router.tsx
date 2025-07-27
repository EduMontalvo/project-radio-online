import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";
import Radios from "./views/Radios";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Radios/>
            }
        ]
    }
])
