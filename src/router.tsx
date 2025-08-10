import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";
import Radios from "./views/Radios";
import About from "./views/About";
import Contact from "./views/Contact";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Radios />
            },
            {
                path: ':name',
                element: <Radios />
            }
        ]
    },
    {
        path: "/about",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <About/>
            }
        ]
    },
    {
        path: "/contact",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Contact/>
            }
        ]
    }
])
