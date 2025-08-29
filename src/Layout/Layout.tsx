import { Outlet } from "react-router-dom"
import Header from "../components/Header"
const Layout = () => {
  return (
    <>
      <div className="min-h-screen w-screen bg-black relative md:w-full">
        <Header />
        <Outlet />
      </div>
    </>
  )
}

export default Layout