import { Outlet } from "react-router-dom"
import Header from "../components/Header"
const Layout = () => {
  return (
    <>
      <div className="h-full w-screen bg-black relative ">
        <Header />
        <Outlet />
      </div>
    </>
  )
}

export default Layout